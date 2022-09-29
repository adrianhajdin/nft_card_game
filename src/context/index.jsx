import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { abi } from '../abi';

const GlobalContext = createContext();

// Compiling and deploying the contract
// 0. Fill our env with the PK -> MetaMask Wallet
// 0.1 fILL UP THE AVAX https://faucet.avax.network/ -> add subnet to metamask
// npx hardhat compile --network local
// 2. Compiled ABI -> move to the frontend
// 1. npx hardhat run --network fuji scripts/1-deploy.ts
// address of the deployed contract  -> move to the frontend

// // This can be an address or an ENS name
const address = '0x9AD889ACa8183c44229831d150C3229f073E9B61';
const mainprovider = ethers.getDefaultProvider('https://api.avax-test.network/ext/bc/C/rpc');
console.log('Provider', mainprovider);

// I think he means to create two constants: Provider and Signer on website load
// No need to call them again and again

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');
  // const [providerAndSigner, setProviderAndSigner] = useState({ provider: '', signer: '' });
  const [contract, setContract] = useState(null);

  const createProviderAndSigner = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const newContract = new ethers.Contract(address, abi, signer);
    console.log(newContract);

    setContract(newContract);
  };

  return (
    <GlobalContext.Provider value={{
      battleGround,
      setBattleGround,
      createProviderAndSigner,
      contract,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
