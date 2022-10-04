import React from 'react';

import styles from '../styles';
import { player01, player02 } from '../assets';

const GameLoad = ({ waitingForOpponent }) => (
  <div className={`absolute z-10 w-full h-full ${styles.flexCenter} gameload flex-col`}>
    {waitingForOpponent ? (
      <>
        <h1 className="font-bold font-rajdhani text-white text-7xl text-center">You've made your move</h1>
        <p className="font-rajdhani text-siteWhite text-lg mt-5 text-center">It's your opponent's turn now. Please wait for them to make their move.</p>
      </>
    ) : (
      <>
        <h1 className="font-bold font-rajdhani text-white text-7xl text-center">Get Ready for the Battle</h1>
        <p className="font-rajdhani text-siteWhite text-lg mt-5 text-center">Please wait for your opponent to join the battle.</p>

        <div className="flex justify-evenly items-center mt-20">
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} className="w-36 h-36 object-contain rounded-full drop-shadow-lg" />
            <p className="mt-3 font-rajdhani text-white text-xl">0xhfse545vv4632cewt</p>
          </div>

          <h2 className="font-rajdhani font-extrabold text-siteViolet text-7xl mx-16"><span className="text-8xl">V</span>S</h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} className="w-36 h-36 object-contain rounded-full drop-shadow-lg" />
            <p className="mt-3 font-rajdhani text-white text-xl">0xhfse545vv4632cewt</p>
          </div>
        </div>
      </>
    )}
  </div>
);

export default GameLoad;
