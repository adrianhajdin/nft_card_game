import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

import { abi } from '../abi';

const GlobalContext = createContext();

// // This can be an address or an ENS name
const address = '0xac1256b9c2c8315716c8d047edd86b13de7ff7c9';
const provider = ethers.getDefaultProvider('https://api.avax-test.network/ext/bc/C/rpc');
console.log('Provider', provider);

export const GlobalContextProvider = ({ children }) => {
  const [battleGround, setBattleGround] = useState('bg-astral');

  // // Read-Only; By connecting to a Provider, allows:
  // // - Any constant function
  // // - Querying Filters
  // // - Populating Unsigned Transactions for non-constant methods
  // // - Estimating Gas for non-constant (as an anonymous sender)
  // // - Static Calling non-constant methods (as anonymous sender)
  const contract = new ethers.Contract(address, abi, provider);
  const connectToProvider = async () => {
    console.log(await contract.FIREBIRD());
  };

  // // Read-Write; By connecting to a Signer, allows:
  // // - Everything from Read-Only (except as Signer, not anonymous)
  // // - Sending transactions for non-constant functions
  // const erc20_rw = new ethers.Contract(address, abi, signer);

  return (
    <GlobalContext.Provider value={{
      battleGround,
      setBattleGround,
      connectToProvider,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
