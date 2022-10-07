import React from 'react';

import { battlegrounds } from '../assets';
import { useGlobalContext } from '../context';
import styles from '../styles';

const Battleground = () => {
  const { setBattleGround } = useGlobalContext();

  return (
    <div className={`${styles.flexCenter} min-h-screen bg-landing flex-col py-12 px-4`}>
      <h1 className={`${styles.headText} text-center`}>Choose your <span className="text-siteViolet">Battle</span> Ground</h1>

      <div className={`${styles.flexCenter} flex-wrap mt-10 max-w-[1200px]`}>
        {battlegrounds.map((ground) => (
          <div key={ground.id} className={`${styles.flexCenter} sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card`} onClick={() => setBattleGround(ground.id)}>
            <img src={ground.image} alt="saiman" className="w-full h-full object-cover rounded-md" />

            <div className="info absolute">
              <p className="font-rajdhani font-semibold text-2xl text-white">{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Battleground;
