import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { player01, player02 } from '../assets';

const GameLoad = () => {
  const navigate = useNavigate();
  const { metamaskAccount } = useGlobalContext();

  return (
    <div className="absolute inset-0 z-10 w-full h-full flex justify-between items-center gameload flex-col">
      <div className="w-full flex justify-end px-8">
        <CustomButton
          title="Choose Battleground"
          handleClick={() => navigate('/battleground')}
          restStyles="mt-6"
        />
      </div>

      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className="font-bold font-rajdhani text-white text-6xl text-center">Waiting for a worthy opponent...</h1>
        <p className="font-rajdhani text-siteWhite text-2xl mt-5 text-center">Protip: while you're waiting, choose your preferred battleground</p>

        <div className="flex justify-evenly items-center mt-20">
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} className="w-36 h-36 object-contain rounded-full drop-shadow-lg" />
            <p className="mt-3 font-rajdhani text-white text-xl">{metamaskAccount.slice(0, 30)}</p>
          </div>

          <h2 className="font-rajdhani font-extrabold text-siteViolet text-7xl mx-16">
            <span className="text-8xl">VS</span>
          </h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} className="w-36 h-36 object-contain rounded-full drop-shadow-lg" />
            <p className="mt-3 font-rajdhani text-white text-xl">???</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GameLoad;
