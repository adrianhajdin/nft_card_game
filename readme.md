# NFT Card Game - AvaxGods

## Todo
[] check if the game from which we got the assets from is still inactive
[] animations / indications that will let the players know what move did the opponent make
[] fix bug if battles include special characters like ' in the name -> limit only to letters?
[] there can be a floating circular button at one edge of the screen. Clicking it opens a battleground selection screen/modal.
  [] selecting the battleground updates the context and the changes are reflected on the battle page
[] fix the homescreen image aspect ratio
[] remove mana numbers from cards
[] game load component is currently not centered, it appears a bit off.
[] add an exit button somewhere on the battle page 

## Instructions on setting up the Web3 part of the project
1. `npx hardhat` → typescript → enter → enter
2. `npm install @openzeppelin/contracts dotenv @nomiclabs/hardhat-ethers` + Hardhat packages
3. Install [Core](https://chrome.google.com/webstore/detail/core/agoakfejjabomempkjlepdflaleeobhb), a Metamask smart wallet alternative built for Avalanche dApps
  1. Turn on the testnet mode by: opening up the Core extension -> click the hamburger menu on the top left -> go to advanced -> turn on the testnet mode
4. Fund your wallet from the [Avax Faucet](https://faucet.avax.network/)
5. Create a `.env` file and specify a PRIVATE_KEY variable.
6. To get to the private key, do the following steps:
  1. Open up the Core extension -> click the hamburger menu on the top left -> go to security and privacy -> click show recovery phase -> enter your password -> copy the phrase -> go to [wallet.avax.network](https://wallet.avax.network/) -> click access wallet -> choose mnemonic key phrase -> paste what the words we’ve copied from Core -> on the sidebar click manage keys -> view c-chain private key -> copy -> paste it in the .env file
7. Copy the `hardhat.config.ts` file from the GitHub gist down in the description
8. Copy the `deploy.ts` script from the GitHub gist down in the description
9. Copy the `AvaxGods.sol` smart contract code from the GitHub gist down in the description
10. Compile the contract by running the `npx hardhat compile` command
  1. Move the `/artifacts/contracts/AVAXGods.json` file to the `/contract` folder on the frontend
11. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command
  1. Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application

### Notes
- It is only possible to request Avax from the faucet once every 24 hours
  - To test the functionality of creating multiple players, using Metamask, send Avax from the wallet that has the coins to other wallets