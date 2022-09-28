import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { player01, player02 } from '../assets';

const GameLoad = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!timeLeft) return navigate('/');

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    (
      <div className={`absolute w-full h-full ${styles.flexCenter} gameload flex-col`}>
        <h1 className="font-bold font-rajdhani text-white text-7xl text-center">Get Ready <br /> for the Battle</h1>

        <p className="font-rajdhani text-siteWhite text-lg mt-5 text-center">You are all set to play battle. <br /> Stay active. You're being redirected to battle page in <span className="font-bold text-xl text-white">{timeLeft} </span>sec.</p>

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
      </div>
    )
  );
};

export default GameLoad;
