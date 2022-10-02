# NFT Card Game - DearthStone

## Questions
1. What is the difference between `https://api.avax-test.network:443/ext/bc/C/rpc` and `https://api.avax-test.network/ext/bc/C/rpc`?
2. What is the difference between `ethers.getDefaultProvider()` and `ethers.providers.Web3Provider()`? Which one should we use?
3. What is a provider? 
  - This Web3 provider allows your application to communicate with an Ethereum or Blockchain Node. Providers take JSON-RPC requests and return the response. 
4. It is possible to create a player with the same name from two different metamask accounts? (It works in the code.)

## Notes
- It is only possible to request Avax from the faucet once every 24 hours
  - To test the functionality of creating multiple players, using Metamask, send Avax from the wallet that has the coins to other wallets

## Todo
- [x] Should JoinBattle, Home, and CreateBattle be different pages? They can all be one page, and we can change the different forms as we would change steps within a modal. (Created a page HOC that wraps over these components. It looks more clean so maybe we can go with different routes)
- [ ] todo bring back the battlleground selection screen navigate('/battleground');
  - [ ] maybe make that a loading screen for when a game is being created
- [ ] fix the homescreen image aspect ratio
- [] remove mana numbers from cards
- [x] change the favicon
- [x] avax quest logo should be removed as the name is now Avax Gods

## Need from Raj
  1. One Metamask account can only create one Player
    - We need a function that checks whether the account has already created a Player or not
      - this will allow us to skip the Player page and go straight to the Create Battle page

## Gameplay
describe('Generate player and battle card instances', function () {
  it('Should retrieve Player information ', async function () {
  it('Should generate a character with random attributes', async function () {
  it('Should create and join a Battle; Read all Battle data', async function () {
  it('Should test battle mechanics: Attack', async function () {
  it('Should test battle mechanics: Defend', async function () {
  it('Should test battle mechanics: P1Attack vs P2Defend', async function () {
  it('Should test battle mechanics: P2Attack vs P1Defend', async function () {
  it('Should test battle mechanics: Potion', async function () {

## Unused Smart contract functions 
function isPlayer(address addr)
function getPlayer(address addr)
function isPlayerToken(address addr)
function getPlayerToken(address addr)
function getAllPlayerTokens()
function isBattle(string memory _name)
function getBattle(string memory _name)
function updateBattle(string memory _name, Battle memory _newBattle)
function createRandomGameToken(string memory _name)
function getBattleMoves(string memory _battleName)

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