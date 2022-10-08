import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, metamaskAccount, gameData, playerCreated, setPlayerCreated, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(metamaskAccount);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({ status: true, type: 'info', message: `${playerName} is being summoned!` });
      } else {
        setPlayerCreated(true);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(metamaskAccount);
      const playerTokenExists = await contract.isPlayerToken(metamaskAccount);

      if ((playerCreated || playerExists) && playerTokenExists) {
        navigate('/create-battle');
      }
    };

    if (contract) createPlayerToken();
  }, [contract, playerCreated]);

  useEffect(() => {
    if (gameData.playerActiveBattle) {
      navigate(`/battle/${gameData.playerActiveBattle.name}`);
    }
  }, [gameData]);

  return (
    <div>
      {metamaskAccount && (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Name</label>
            <input
              type="text"
              placeholder="Enter your player name"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              value={playerName}
              onChange={(e) => {
                const regex = /^[A-Za-z]+$/;
                if (e.target.value === '' || regex.test(e.target.value)) {
                  setPlayerName(e.target.value);
                }
              }}
              className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full"
            />
          </div>
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
