import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { logo, heroImg } from '../assets';
import { useGlobalContext } from '../context';
import { GameLoad } from '../components';

const CreateBattle = () => {
  const navigate = useNavigate();
  const { contract } = useGlobalContext();

  const [battleName, setBattleName] = useState('');
  const [waitBattle, setWaitBattle] = useState(false);

  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;

    // const battle = await contract.createBattle(battleName);
    // console.log('Battle created', battle);
    setWaitBattle(true);
  };

  useEffect(() => {
    if (waitBattle) {
      setTimeout(() => {
        setWaitBattle(false);
      }, 5000);
    }
  });

  return (
    <div className="min-h-screen flex xl:flex-row flex-col relative">
      <GameLoad />

      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img src={logo} alt="logo" className="w-[160px] h-[52px] object-contain" />

        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <div className="w-1 h-[120px] bg-siteViolet mr-3" />
            <h1 className={`${styles.headText} text-left`}>Create <br /> a new Battle</h1>
          </div>

          <div className="my-10">
            <p className="font-rajdhani font-normal text-xl text-siteWhite">Create your own battle and wait for other players to join you</p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Battle</label>
              <input
                type="text"
                placeholder="Enter name of battle"
                disabled={waitBattle}
                value={battleName}
                onChange={(e) => setBattleName(e.target.value)}
                className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet disabled:text-gray-500 p-4 rounded-md sm:max-w-[50%] max-w-full"
              />
            </div>
            <button
              type="button"
              className="mt-6 px-4 py-2 rounded-lg bg-siteViolet disabled:bg-gray-500 w-fit text-white font-rajdhani font-bold"
              disabled={waitBattle}
              onClick={handleClick}
            >Create Battle
            </button>
          </div>

          {waitBattle ? (
            <div className="mt-5">
              <p className="font-rajdhani font-medium text-lg text-siteViolet">Waiting for other player to join...</p>
            </div>
          ) : (
            <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5"
              onClick={() => navigate('/join-battle')}
            >Or join already existing battles
            </p>
          )}

        </div>

        <p className="font-rajdhani font-medium text-base text-white">Made with 💜 by JavaScript Mastery</p>
      </div>

      <div className="flex flex-1">
        <img src={heroImg} alt="hero-img" className="w-full xl:h-full h-[320px]" />
      </div>
    </div>
  );
};

export default CreateBattle;
