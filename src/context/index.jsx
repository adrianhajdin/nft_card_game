/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { sparcle } from '../utils';
import { GetParams } from '../utils/Onboard';
import { ABI, ADDRESS } from '../contract';
import { AddNewEvent } from './EventListener';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [metamaskAccount, setMetamaskAccount] = useState('');

  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [gameData, setGameData] = useState({ gameTokens: [], players: [], pendingBattles: [], playerHasMetamaskAccount: false, playerActiveBattle: null });
  const [playerCreated, setPlayerCreated] = useState(false);
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
  const [battleName, setBattleName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateGameData, setUpdateGameData] = useState(0);
  const [waitBattle, setWaitBattle] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [playerOneCurrentHealth, setPlayerOneCurrentHealth] = useState(0);
  const [playerTwoCurrentHealth, setPlayerTwoCurrentHealth] = useState(0);

  // set battleground to localstorgae
  useEffect(() => {
    const isBattleground = localStorage.getItem('battleground');

    if (isBattleground) setBattleGround(isBattleground);
    else localStorage.setItem('battleground', battleGround);

    console.log('Battleground', battleGround);
  }, []);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
  }

  useEffect(() => {
    resetParams();
    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });
    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

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

  function createListeners() {
    // New Player event listener
    const NewPlayerEventFilter = contract.filters.NewPlayer();
    AddNewEvent(NewPlayerEventFilter, provider, (topics) => {
      console.log('NewPlayerEvent', topics[1], metamaskAccount?.slice(2));

      if (metamaskAccount.slice(2) === topics[1].slice(26)) {
        setShowAlert({
          status: true,
          type: 'success',
          message: 'Player has been successfully registered',
        });

        setPlayerCreated(true);
      }
    });

    // New Battle event listener
    const NewBattleEventFilter = contract.filters.NewBattle();
    AddNewEvent(NewBattleEventFilter, provider, (topics) => {
      console.log('NewBattleEvent');
      console.log(topics);
      if (metamaskAccount.toLowerCase() === topics[1].toLowerCase() || metamaskAccount.toLowerCase() === topics[2].toLowerCase()) {
        navigate(`/battle/${battleName}`);
      }

      setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
    });

    // New Game Token event listener
    const NewGameTokenEvent = contract.filters.NewGameToken();
    AddNewEvent(NewGameTokenEvent, provider, (topics) => {
      console.log('NewGameTokenEvent', topics[1], metamaskAccount?.slice(2));

      if (metamaskAccount.slice(2).toLowerCase() === topics[1].slice(26).toLowerCase()) {
        setShowAlert({
          status: true,
          type: 'success',
          message: 'Player game token has been successfully generated',
        });

        navigate('/create-battle');
      }
    });

    // Battle Started event listener
    const BattleStartedEvent = contract.filters.BattleStarted();
    AddNewEvent(BattleStartedEvent, provider, (topics) => {
      console.log('BattleStartedEvent');
      console.log('Topics: ', topics);

      if (metamaskAccount.toLowerCase() == topics[1] || metamaskAccount.toLowerCase() == topics[2].toLowerCase()) {
        navigate(`/battle/${battleName}`);
      }

      setWaitBattle(false);
    });

    // Battle Move event listener
    const BattleMoveEvent = contract.filters.BattleMove();
    AddNewEvent(BattleMoveEvent, provider, (topics) => {
      console.log('Battle move event', topics);
    });

    // Round ended event listener
    const RoundEndedEvent = contract.filters.RoundEnded();
    AddNewEvent(RoundEndedEvent, provider, (topics) => {
      console.log('RoundEndedEvent', topics, { gameData, metamaskAccount });

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

    // Battle Ended event listener
    const BattleEndedEvent = contract.filters.BattleEnded();
    AddNewEvent(BattleEndedEvent, provider, (topics) => {
      console.log('BattleEndedEvent');
      console.log('Topics: ', topics);

      if (topics[1].toLowerCase() === metamaskAccount.toLowerCase()) {
        setShowAlert({ status: true, type: 'success', message: 'You won!' });
      } else {
        setShowAlert({ status: true, type: 'failure', message: 'You lost!' });
      }
    });
  }

  //* Activate event listeners for the smart contract
  useEffect(() => {
    if (step === -1 && contract) {
      createListeners();
    }
  }, [step]);

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
      setPlayerTwoCurrentHealth,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
