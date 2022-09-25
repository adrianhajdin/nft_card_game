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

  const createCharacter = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const newCharacter = await contract.createRandomGameToken('dex');
    console.log('New Character', newCharacter);
  };

  // const attach = async (name) => {
  //   const contractFactory = await ethers.getContractFactory(name);
  //   return contractFactory.attach(address);
  // };

  // const registerPlayer = async (playerName) => {
  //   const [P1, P2] = await ethers.getSigners();
  //   const AVAXGods = await attach('AVAXGods', address);

  //   const Reg1 = await AVAXGods.connect(P1).registerPlayer('P1');
  //   const Reg2 = await AVAXGods.connect(P2).registerPlayer('P2');

  //   console.log({ Reg1, Reg2 });
  // };

  return (
    <GlobalContext.Provider value={{
      battleGround,
      setBattleGround,
      connectToProvider,
      registerPlayer,
      createCharacter,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
