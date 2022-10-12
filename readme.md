# NFT Card Game - AvaxGods

## Todo
[] Sidebar text is barely visible on some battlegrounds
[] Make the modal more informative, and add some buttons there. For example:
  Download MM: Add link to metamask download page
  Connect Account: Button to show connect account popup
  Add/Switch Network: Button to Add/Switch network
  Grab coins: Add link to Faucet page.
[] Homepage image is not in the correct aspect ratio
[] Explosion animation after battle resolve is not working
[] Fix a bug that happens if a player creates a game and then reloads the page,
  Currently they're brought to the game page even though no one joined
    They should instead remain on the wait page 
[] Redirect players to create-battle page once the game finishes
[] Fix the bug where the winning player gets the "you lost" alert

[] exit battle functionality on the smart contract
[] attributes not changing
  P1 ATT: 2 P1 DEF: 8
  P2 ATT: 3 P2 DEF: 7
  RoundEndedEvent

  P1 ATT: 2 P1 DEF: 8
  P2 ATT: 7 P2 DEF: 3
  RoundEndedEvent

  P1 ATT: 2 P1 DEF: 8
  P2 ATT: 6 P2 DEF: 4
  RoundEndedEvent

  P1 ATT: 2 P1 DEF: 8
  P2 ATT: 5 P2 DEF: 5 
  RoundEndedEvent

  P1 ATT: 6 P1 DEF: 4
  P2 ATT: 5 P2 DEF: 5
  BattleEndedEvent

  P1 got 2ATT-8DEFF four times in a row, which is statistically improbable. 
  Most likely a bug in the smart contract code

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