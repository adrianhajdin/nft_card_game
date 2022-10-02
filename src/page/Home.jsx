import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const alertError = (error, setShowAlert) => {
  const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

  setShowAlert({
    status: true,
    type: 'failure',
    msg: error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1),
  });
};

const Home = () => {
  const { contract, metamaskAccount, gameData, playerCreated, showAlert, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(metamaskAccount);

      if (!playerExists) {
        console.log('Initiating a register player transaction');
        const registerPlayerTsx = await contract.registerPlayer(playerName);
        console.log({ registerPlayerTsx });

        // initiate an info (blue) loader alert that happens until the next alert is triggered
      }
    } catch (error) {
      alertError(error, setShowAlert);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(metamaskAccount);
      const playerTokenExists = await contract.isPlayerToken(metamaskAccount);

      if ((playerCreated || playerExists) && !playerTokenExists) {
        try {
          console.log('Initiating a create player token transaction');

          const createRandomGameTokenTsx = await contract.createRandomGameToken((Math.random() + 1).toString(36).substring(7));
          console.log({ createRandomGameTokenTsx }); // sometimes it takes a lot of time for this transaction to be mined
          // initiate an info (blue) loader alert that happens until the next alert is triggered
        } catch (error) {
          console.log(error);
          alertError(error, setShowAlert);
        }
      }
    };

    if (contract) createPlayerToken();
  }, [contract, playerCreated]);

  useEffect(() => {
    if (gameData.playerActiveBattle) {
      navigate(`/game/${gameData.playerActiveBattle.name}`);
    }
  }, [gameData]);

  return (
    <div>
      {showAlert?.status && <Alert type={showAlert.type} msg={showAlert.msg} />}
      {metamaskAccount && (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Name</label>
            <input
              type="text"
              placeholder="Enter your player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full"
            />
          </div>
          {/* {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>} */}
          <button type="button" className="mt-6 px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold" onClick={handleClick}>Register</button>
        </div>
      )}
    </div>
  );
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your Metamask wallet to start playing <br /> the ultimate Web3 Battle Card Game</>,
);
