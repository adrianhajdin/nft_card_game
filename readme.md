# NFT Card Game - DearthStone

## Questions
1. What is the difference between `https://api.avax-test.network:443/ext/bc/C/rpc` and `https://api.avax-test.network/ext/bc/C/rpc`?
2. What is the difference between `ethers.getDefaultProvider()` and `ethers.providers.Web3Provider()`? Which one should we use?
3. What is a provider? 
  - This Web3 provider allows your application to communicate with an Ethereum or Blockchain Node. Providers take JSON-RPC requests and return the response. 

## Compiling and deploying the contract
0. Set up Metamask
1. Go to the Avax Faucet (https://faucet.avax.network)
  - Select Network Fuji (C-Chain), Select Token AVAX
  - Request 2 AVAX
  - Add Subnet to Metamask
1. Get the Private Key (PK) of you wallet
  - Open up the Metamask extension
  - Click the three dots on the top right
  - Click account details
  - Click export private key
  - Enter your password and copy the key
2. Paste the key into the .env file of the Web3 folder as PK
3. Develop the AVAXGods.sol smart contract
4. Compile the contract by running the `npx hardhat compile --network local` command
  - Move the `/artifacts/contracts/AVAXGods.json` file to the `/abi` folder on the frontend
5. Deploy the smart contract on the Fuji test network by running the `npx hardhat run --network fuji scripts/1-deploy.ts` command
  - Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application