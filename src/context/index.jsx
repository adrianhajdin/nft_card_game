import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { abi } from '../abi';

const GlobalContext = createContext();

// // This can be an address or an ENS name
const address = '0xac1256b9c2c8315716c8d047edd86b13de7ff7c9';
const mainprovider = ethers.getDefaultProvider('https://api.avax-test.network/ext/bc/C/rpc');
console.log('Provider', mainprovider);

// I think he means to create two constants: Provider and Signer on website load
// No need to call them again and again

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  // const [providerAndSigner, setProviderAndSigner] = useState({ provider: '', signer: '' });
  const [contract, setContract] = useState({});

  const createProviderAndSigner = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // setProviderAndSigner({ provider, signer });
    setContract(new ethers.Contract(address, abi, signer));
  };

  const createCharacter = async () => {
    await contract.createRandomGameToken('dex');
  };

  const createBattle = async (battleName) => {
    await contract.createBattle(battleName);
  };

  return (
    <GlobalContext.Provider value={{
      battleGround,
      setBattleGround,
      createProviderAndSigner,
      createCharacter,
      createBattle,
      contract,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
