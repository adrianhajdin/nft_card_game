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
  const [errorMessage, setErrorMessage] = useState('');
  const [updateGameData, setUpdateGameData] = useState(0);
  const [waitBattle, setWaitBattle] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);

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
      const BattleMoveEvent = contract.filters.BattleMove();

      provider.on(NewPlayerEvent, ({ topics }) => {
        console.log('NewPlayerCreated');

        if (metamaskAccount.slice(2) === topics[1].slice(26)) {
          setShowAlert({
            status: true,
            type: 'success',
            msg: 'Player has been successfully registered',
          });

          setPlayerCreated(true);
        }
      });

      provider.on(NewGameTokenEvent, ({ topics }) => {
        console.log('NewGameTokenEvent');

        if (metamaskAccount.slice(2).toLowerCase() === topics[1].slice(26).toLowerCase()) {
          setShowAlert({
            status: true,
            type: 'success',
            msg: 'Player game token has been successfully generated',
          });

          navigate('/create-battle');
        }
      });

      provider.on(NewBattleEvent, ({ topics }) => {
        console.log('NewBattleEvent');
        console.log(topics);
        if (metamaskAccount.toLowerCase() === topics[1].toLowerCase() || metamaskAccount.toLowerCase() === topics[2].toLowerCase()) {
          navigate(`/battle/${battleName}`);
        }

        setUpdateGameData(1);
      });

      provider.on(BattleStartedEvent, ({ topics }) => {
        console.log('BattleStartedEvent');
        console.log('Topics: ', topics);

        if (metamaskAccount.toLowerCase() == topics[1] || metamaskAccount.toLowerCase() == topics[2].toLowerCase()) {
          navigate(`/battle/${battleName}`);
        }

        setWaitBattle(false);
      });

      provider.on(BattleEndedEvent, ({ topics }) => {
        console.log('BattleEndedEvent');
        console.log('Topics: ', topics);

        if (topics[1].toLowerCase() === metamaskAccount.toLowerCase()) {
          setShowAlert({ status: true, type: 'success', msg: 'You won!' });
        } else {
          setShowAlert({ status: true, type: 'failure', msg: 'You lost!' });
        }
      });

      provider.on(RoundEndedEvent, () => {
        console.log('RoundEndedEvent');

        setUpdateGameData(2);
      });

      provider.on(BattleMoveEvent, ({ topics }) => {
        console.log('BattleMoveEvent');
        console.log('battle: ', topics[1]);
        console.log('isFirstMove: ', topics[2]);

        const value = parseInt(topics[2], 16);
        console.log({ value });
        if (topics[1] === battleName) {
          console.log('BattleMoveEvent');
          console.log('isFirstMove: ', topics[2]);

          if (topics[2]) {
            setIsWaitingForOpponent(true);
          }
        }
      });
    }
  }, [contract, battleName]);

  //* Set the game data to the state
  useEffect(() => {
    const fetchGameData = async () => {
      if (contract) {
        const fetchedGameTokens = await contract.getAllPlayerTokens();
        const fetchedPlayers = await contract.getAllPlayers();
        const fetchedBattles = await contract.getAllBattles();
        let playerActiveBattle = null;

        console.log(fetchedGameTokens);

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
  }, [contract, updateGameData]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', msg: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason?.slice('execution reverted: '.length).slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: 'failure',
          msg: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider value={{ battleGround, setBattleGround, contract, gameData, metamaskAccount, playerCreated, showAlert, setShowAlert, battleName, setBattleName, errorMessage, setErrorMessage, setPlayerCreated, waitBattle, setWaitBattle, isWaitingForOpponent, setIsWaitingForOpponent }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
