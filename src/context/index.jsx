import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { abi } from '../abi';

const GlobalContext = createContext();

// // This can be an address or an ENS name
const address = '0xac1256b9c2c8315716c8d047edd86b13de7ff7c9';
const mainprovider = ethers.getDefaultProvider('https://api.avax-test.network/ext/bc/C/rpc');
console.log('Provider', mainprovider);

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');

  const fetchContract = (signerOrProvider) => new ethers.Contract(address, abi, signerOrProvider);

  const connectToProvider = async () => {
    const contract = fetchContract(mainprovider);
    console.log(await contract.FIREBIRD());
  };

  const registerPlayer = async (playerName) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const newPlayer = await contract.registerPlayer(playerName);
    console.log('New Player', newPlayer);
  };

  return (
    <GlobalContext.Provider value={{
      battleGround,
      setBattleGround,
      connectToProvider,
      registerPlayer,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
