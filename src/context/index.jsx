import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [gameData, setGameData] = useState({ gameTokens: [], players: [], pendingBattles: [], playerHasMetamaskAccount: false, playerActiveBattleHash: '' });
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
      const NewBattleEvent = contract.filters.NewBattle();
      const NewPlayerEvent = contract.filters.NewPlayer();
      const BattleEndedEvent = contract.filters.BattleEnded();
      const NewGameTokenEvent = contract.filters.NewGameToken();
      const RoundEndedEvent = contract.filters.RoundEnded();

      // only indexed parameters (check the smart contract) show in topics
      provider.on(BattleEndedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);
      });
      provider.on(NewGameTokenEvent, ({ topics }) => {
        console.log('NewGameTokenEvent');
        console.log('Topics: ', topics);
      });
      provider.on(RoundEndedEvent, ({ topics }) => {
        console.log('RoundEndedEvent');
        console.log('Topics: ', topics);
      });
      provider.on(NewBattleEvent, ({ topics }) => {
        console.log('NewBattleEvent: Battle started');
        console.log('Player 1: ', topics[1]);
        console.log('Player 2: ', topics[2]);
      });
      provider.on(NewPlayerEvent, ({ topics }) => {
        console.log('NewPlayerEvent: New player joined');
        console.log('Topics: ', topics);
        console.log('Player Address: ', topics[1]);
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
        let playerActiveBattleHash = '';

        const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);

        pendingBattles.forEach((battle) => {
          if (battle.players.find((player) => player.toLowerCase() === metamaskAccount)) {
            playerActiveBattleHash = battle.battleHash;
          }
        });

        const playerHasMetamaskAccount = fetchedPlayers.find((player) => player[0].toLowerCase() === metamaskAccount);

        setGameData({
          gameTokens: fetchedGameTokens.slice(1),
          players: fetchedPlayers.slice(1),
          pendingBattles: pendingBattles.slice(1),
          playerHasMetamaskAccount,
          playerActiveBattleHash,
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
