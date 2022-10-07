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
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({ status: true, message: `${playerName} is being summoned!` });
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

  // function removeParticle(e) {
  //   e.srcElement.effect.target.remove();
  // }

  // const handleMarioClick = (e) => {
  //   const amount = 30;
  //   for (let i = 0; i < amount; i++) {
  //     const particle = document.createElement('particle');
  //     document.body.appendChild(particle);
  //     const width = Math.floor(Math.random() * 30 + 8);
  //     const height = width;
  //     const destinationX = (Math.random() - 0.5) * 300;
  //     const destinationY = (Math.random() - 0.5) * 300;
  //     const rotation = Math.random() * 520;
  //     const delay = Math.random() * 200;

  //     const x = e.clientX;
  //     const y = e.clientY + window.scrollY;

  //     particle.style.backgroundImage = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mario-face.png)';
  //     particle.style.width = `${width}px`;
  //     particle.style.height = `${height}px`;
  //     const animation = particle.animate([
  //       {
  //         transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
  //         opacity: 1,
  //       },
  //       {
  //         transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
  //         opacity: 0,
  //       },
  //     ], {
  //       duration: Math.random() * 1000 + 5000,
  //       easing: 'cubic-bezier(0, .9, .57, 1)',
  //       delay,
  //     });

  //     animation.onfinish = removeParticle;
  //   }
  // };

  return (
    <div>
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
          <button type="button" className="mt-6 px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold" onClick={handleClick}>Register</button>
        </div>
      )}

      {/* <button type="button" className="p-[20px] m-[10px] self-center bg-red-500" onClick={handleMarioClick}>Mario</button> */}
    </div>
  );
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your Metamask wallet to start playing <br /> the ultimate Web3 Battle Card Game</>,
);
