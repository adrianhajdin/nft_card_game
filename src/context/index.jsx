import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [gameData, setGameData] = useState({ gameTokens: [], players: [], pendingBattles: [], playerHasMetamaskAccount: false, playerActiveBattle: null });
  const [metamaskAccount, setMetamaskAccount] = useState('');
  const [playerCreated, setPlayerCreated] = useState(false);
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', msg: '' });
  const [battleName, setBattleName] = useState('');

  const navigate = useNavigate();

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

      provider.on(NewPlayerEvent, () => {
        console.log('NewPlayerCreated');

        setShowAlert({
          status: true,
          type: 'success',
          msg: 'Player has been successfully registered',
        });

        setPlayerCreated(true);
      });

      provider.on(NewGameTokenEvent, () => {
        console.log('NewGameTokenEvent');

        setShowAlert({
          status: true,
          type: 'success',
          msg: 'Player game token has been successfully generated',
        });

        navigate('/create-battle');
      });

      provider.on(NewBattleEvent, ({ topics }) => {
        console.log('NewBattleEvent: Battle started');
        console.log('Player 1: ', topics[1]);
        console.log('Player 2: ', topics[2]);

        setShowAlert({
          status: true,
          type: 'success',
          msg: 'Joining the battle...',
        });

        navigate(`/game/${battleName}`);
      });

      provider.on(BattleStartedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);
      });

      provider.on(BattleEndedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);
      });

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
          if (battle.players.find((player) => player.toLowerCase() === metamaskAccount.toLowerCase())) {
            if (battle.winner.startsWith('0x00')) {
              playerActiveBattle = battle;
            }
          }
        });

        const playerHasMetamaskAccount = await contract.isPlayer(metamaskAccount);

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

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', msg: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider value={{ battleGround, setBattleGround, contract, gameData, metamaskAccount, playerCreated, showAlert, setShowAlert, battleName, setBattleName }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
