import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [battles, setBattles] = useState([]);
  const [players, setPlayers] = useState([]);
  const [gameTokens, setGameTokens] = useState([]);

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

  useEffect(() => {
    const setDataAndEventListeners = async () => {
      if (contract) {
        setGameTokens(await contract.getAllPlayerTokens());
        setPlayers(await contract.getAllPlayers());
        setBattles(await contract.getAllBattles());

        const NewBattleEvent = contract.filters.NewBattle();
        const NewPlayerEvent = contract.filters.NewPlayer();
        // BattleEnded(string,address)
        // BattleStarted(bytes32,address,address)
        // NewBattle(bytes32,address,address)
        // NewGameToken(address,uint256,uint256,uint256)
        // NewPlayer(address,string)
        // RoundEnded(string,string,string,uint256,uint256,uint256,uint256)

        // only indexed parameters (check the smart contract) become indexed inside of topics
        provider.on(NewBattleEvent, ({ topics }) => {
          console.log('NewBattleEvent: Battle started');
          console.log('Player 1:', topics[1]);
          console.log('Player 2:', topics[2]);
        });

        // only indexed parameters (check the smart contract) become indexed inside of topics
        provider.on(NewPlayerEvent, ({ topics }) => {
          console.log('NewPlayerEvent: New player joined');
          console.log('topics:', topics);
          console.log('Player Address:', topics[1]);
        });
      }
    };

    setDataAndEventListeners();
  }, [contract]);

  return (
    <GlobalContext.Provider value={{ battleGround, setBattleGround, contract, battles, players, gameTokens }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
