import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, metamaskAccount, gameData } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [waitBattle, setWaitBattle] = useState(false);
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: 'info',
    msg: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      await contract.getPlayerToken(metamaskAccount);

      if (await contract.isPlayerToken(metamaskAccount)) navigate('/create-battle');
    };

    if (contract) func();
  }, [contract]);

  const handleClick = async () => {
    setWaitBattle(true);
    if (playerName) {
      try {
        const registerPlayer = await contract.registerPlayer(playerName);

        if (registerPlayer?.from !== '') {
          setShowAlert({
            status: true,
            type: 'success',
            msg: `Player has been successfully registered: ${registerPlayer?.from}`,
          });

          //  todo this is a temporary solution
          const tokenCreatedTsx = await contract.createRandomGameToken((Math.random() + 1).toString(36).substring(7));
          if (tokenCreatedTsx?.from !== '') {
            setShowAlert({
              status: true,
              type: 'success',
              msg: 'Player game token has been successfully generated',
            });

            navigate('/create-battle');
          }
        }

        // todo figure out how to properly navigate after a player is registered and a token is created
      } catch (error) {
        const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;
        setShowAlert({
          status: true,
          type: 'failure',
          msg: error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1),
        });
      }
    }
  };

  useEffect(() => {
    if (showAlert.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', msg: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // useEffect(() => {
  //   if (waitBattle) {
  //     setTimeout(() => {
  //       setWaitBattle(false);

  //       const func = async () => {
  //         await contract.createRandomGameToken((Math.random() + 1).toString(36).substring(7));

  //         // todo figure out how to properly navigate after a player is registered and a token is created
  //         // navigate('/create-battle');
  //       };

  //       func();
  //     }, 20000);
  //   }
  // }, [waitBattle, gameData]);

  return (
    <div>
      {showAlert.status && <Alert type={showAlert.type} msg={showAlert.msg} />}
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
