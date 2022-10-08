import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { Alert } from '../components';
import { battlegrounds } from '../assets';
import { useGlobalContext } from '../context';

const Battleground = () => {
  const navigate = useNavigate();
  const { setBattleGround, setShowAlert, showAlert } = useGlobalContext();

  const handleBattleChoice = (ground) => {
    setBattleGround(ground.id);
    setShowAlert({ status: true, type: 'info', message: `${ground.name} is battle ready!` });

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <div className={`${styles.flexCenter} min-h-screen bg-landing flex-col py-12 px-4`}>
      {showAlert.status && <Alert type={showAlert.type} message={showAlert.message} />}

      <h1 className={`${styles.headText} text-center`}>Choose your <span className="text-siteViolet">Battle</span> Ground</h1>

      <div className={`${styles.flexCenter} flex-wrap mt-10 max-w-[1200px]`}>
        {battlegrounds.map((ground) => (
          <div key={ground.id} className={`${styles.flexCenter} sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card`} onClick={() => handleBattleChoice(ground)}>
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
