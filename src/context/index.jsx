import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [gameData, setGameData] = useState({ gameTokens: [], players: [], pendingBattles: [], playerHasMetamaskAccount: false, playerActiveBattle: null });
  const [metamaskAccount, setMetamaskAccount] = useState('');

  //* Set the Metamask account to the state
  useEffect(() => {
    const updateCurrentMetamaskAccount = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      setMetamaskAccount(accounts[0]);
    };

    updateCurrentMetamaskAccount();

    window.ethereum.on('accountsChanged', updateCurrentMetamaskAccount);
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  //* Activate event listeners for the smart contract
  useEffect(() => {
    if (contract) {
      const NewPlayerEvent = contract.filters.NewPlayer();
      const NewBattleEvent = contract.filters.NewBattle();
      const BattleStartedEvent = contract.filters.BattleStarted();
      const BattleEndedEvent = contract.filters.BattleEnded();
      const NewGameTokenEvent = contract.filters.NewGameToken();
      const RoundEndedEvent = contract.filters.RoundEnded();

      // event NewPlayer(address indexed owner, string name);
      provider.on(NewPlayerEvent, ({ topics }) => {
        console.log('NewPlayerEvent: New player joined a battle');
        console.log('Player Address: ', topics[1]);
      });
      // event NewBattle(bytes32 battleHash, address indexed player1, address indexed player2);
      provider.on(NewBattleEvent, ({ topics }) => {
        console.log('NewBattleEvent: Battle started');
        console.log('Player 1: ', topics[1]);
        console.log('Player 2: ', topics[2]);
      });
      // event BattleStarted(bytes32 battleHash, address indexed player1, address indexed player2);
      provider.on(BattleStartedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);
      });
      // event BattleEnded(string battleName, address indexed winner);
      provider.on(BattleEndedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);
      });
      // event NewGameToken(address indexed owner, uint256 id, uint256 attackStrength, uint256 defenseStrength);
      provider.on(NewGameTokenEvent, ({ topics }) => {
        console.log('NewGameTokenEvent');
        console.log('Topics: ', topics);
      });
      // event RoundEnded(string battleName, string indexed player1, string indexed player2, uint256 player1Mana, uint256 player2Mana, uint256 player1Health, uint256 player2Health);
      provider.on(RoundEndedEvent, ({ topics }) => {
        console.log('RoundEndedEvent');
        console.log('Topics: ', topics);
      });
    }
  }, [contract]);

  //* Set the game data to the state
  useEffect(() => {
    const fetchGameData = async () => {
      if (contract) {
        const fetchedGameTokens = await contract.getAllPlayerTokens();
        const fetchedPlayers = await contract.getAllPlayers();
        const fetchedBattles = await contract.getAllBattles();
        let playerActiveBattle = null;

        const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);

        fetchedBattles.forEach((battle) => {
          if (battle.players.find((player) => player.toLowerCase() === metamaskAccount)) {
            playerActiveBattle = battle;
          }
        });

        const playerHasMetamaskAccount = fetchedPlayers.find((player) => player[0].toLowerCase() === metamaskAccount);

        const isPlayer = await contract.isPlayer(metamaskAccount);
        const getPlayer = await contract.getPlayer(metamaskAccount);
        const isPlayerToken = await contract.isPlayerToken(metamaskAccount);
        const getAllPlayerTokens = await contract.getAllPlayerTokens();
        // const createRandomGameToken = await contract.createRandomGameToken('My token?');

        const isBattle = await contract.isBattle("JSM's Battleground");
        const getBattle = await contract.getBattle("JSM's Battleground");
        const getBattleMoves = await contract.getBattleMoves("JSM's Battleground");

        console.log({
          isPlayer,
          getPlayer,
          isPlayerToken,
          // createRandomGameToken,
          // getPlayerToken,
          getAllPlayerTokens,
          isBattle,
          getBattle,
          getBattleMoves,
        });

        // const updateBattle = updateBattle(string memory _name, Battle memory _newBattle)
        // const getPlayerToken = await contract.getPlayerToken(metamaskAccount);

        setGameData({
          gameTokens: fetchedGameTokens.slice(1),
          players: fetchedPlayers.slice(1),
          pendingBattles: pendingBattles.slice(1),
          playerHasMetamaskAccount,
          playerActiveBattle,
        });
      }
    };

    fetchGameData();
  }, [contract]);

  return (
    <GlobalContext.Provider value={{ battleGround, setBattleGround, contract, gameData, metamaskAccount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
