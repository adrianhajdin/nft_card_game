/* eslint-disable prefer-destructuring */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { sparcle } from '../utils';
import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [gameData, setGameData] = useState({ gameTokens: [], players: [], pendingBattles: [], playerHasMetamaskAccount: false, playerActiveBattle: null });
  const [metamaskAccount, setMetamaskAccount] = useState('');
  const [playerCreated, setPlayerCreated] = useState(false);
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
  const [battleName, setBattleName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateGameData, setUpdateGameData] = useState(0);
  const [waitBattle, setWaitBattle] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [playerOneCurrentHealth, setPlayerOneCurrentHealth] = useState(0);
  const [playerTwoCurrentHealth, setPlayerTwoCurrentHealth] = useState(0);

  const player1Ref = useRef();
  const player2Ref = useRef();

  const navigate = useNavigate();

  // get battle card coords
  const getCoords = (cardRef) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const el = {
      pageX: left + width / 2,
      pageY: top + height / 2.25,
    };

    return el;
  };

  //* Set the Metamask account to the state
  useEffect(() => {
    const updateCurrentMetamaskAccount = async () => {
      const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });

      if (accounts) {
        setMetamaskAccount(accounts[0]);
      }
    };

    updateCurrentMetamaskAccount();

    window?.ethereum?.on('accountsChanged', updateCurrentMetamaskAccount);
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
            message: 'Player has been successfully registered',
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
            message: 'Player game token has been successfully generated',
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

        setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
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
          setShowAlert({ status: true, type: 'success', message: 'You won!' });
        } else {
          setShowAlert({ status: true, type: 'failure', message: 'You lost!' });
        }
      });

      provider.on(RoundEndedEvent, () => {
        console.log('RoundEndedEvent');

        let player01Address = null;
        let player02Address = null;

        const func = async () => {
          if (gameData.playerActiveBattle.players[0].toLowerCase() === metamaskAccount.toLowerCase()) {
            player01Address = gameData.playerActiveBattle.players[0];
            player02Address = gameData.playerActiveBattle.players[1];
          } else {
            player01Address = gameData.playerActiveBattle.players[1];
            player02Address = gameData.playerActiveBattle.players[0];
          }

          const player01 = await contract.getPlayer(player01Address);
          const player02 = await contract.getPlayer(player02Address);
          const p1H = player01.playerHealth.toNumber();
          const p2H = player02.playerHealth.toNumber();

          console.log({ playerOneCurrentHealth, p1H });
          console.log({ playerTwoCurrentHealth, p2H });

          if (playerOneCurrentHealth && playerOneCurrentHealth !== p1H) {
            // EXPLODE FIRST PLAYER
            sparcle(getCoords(player1Ref));
            console.log('EXPLODE FIRST PLAYER');
          }

          if (playerTwoCurrentHealth && playerTwoCurrentHealth !== p2H) {
            // EXPLODE SECOND PLAYER
            sparcle(getCoords(player2Ref));
            console.log('EXPLODE SECOND PLAYER');
          }
        };

        if (gameData.playerActiveBattle) func();

        // setIsWaitingForOpponent(false);
        setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
      });

      provider.on(BattleMoveEvent, ({ topics }) => {
        // console.log('BattleMoveEvent');
        // console.log('battle: ', topics[1]);
        // console.log('isFirstMove: ', topics[2]);

        // const value = parseInt(topics[2], 16);
        // console.log({ value });
        // if (topics[1] === battleName) {
        //   console.log('BattleMoveEvent');
        //   console.log('isFirstMove: ', topics[2]);

        //   if (topics[2]) {
        //     setIsWaitingForOpponent(true);
        //   }
        // }
      });
    }
  }, [contract, battleName, gameData, playerOneCurrentHealth, playerTwoCurrentHealth]);

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
  }, [contract, updateGameData]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
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
          message: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider value={{
      getCoords,
      player1Ref,
      player2Ref,
      battleGround,
      setBattleGround,
      contract,
      gameData,
      metamaskAccount,
      playerCreated,
      showAlert,
      setShowAlert,
      battleName,
      setBattleName,
      errorMessage,
      setErrorMessage,
      setPlayerCreated,
      waitBattle,
      setWaitBattle,
      isWaitingForOpponent,
      setIsWaitingForOpponent,
      playerOneCurrentHealth,
      setPlayerOneCurrentHealth,
      playerTwoCurrentHealth,
      setPlayerTwoCurrentHealth }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
