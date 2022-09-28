import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { logo, heroImg } from '../assets';
import { useGlobalContext } from '../context';

const battles = [
  {
    id: 'battle-1',
    address: '0x0dc2456fsg36656fsdg2467',
    battleName: 'battle-1',
  },
  {
    id: 'battle-2',
    address: '0x0dc2456fsg36656fsdg2467',
    battleName: 'battle-2',
  },
  {
    id: 'battle-3',
    address: '0x0dc2456fsg36656fsdg2467',
    battleName: 'battle-3',
  },
  {
    id: 'battle-4',
    address: '0x0dc2456fsg36656fsdg2467',
    battleName: 'battle-3',
  },
  {
    id: 'battle-5',
    address: '0x0dc2456fsg36656fsdg2467',
    battleName: 'battle-5',
  },
];

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract } = useGlobalContext();

  const handleClick = async (battleName) => {
    await contract.joinBattle(battleName);
  };

  useEffect(() => {
    const fetchBattles = async () => {
      if (contract) {
        const allBattles = await contract.battles;
        for (let i = 1; i < allBattles.length; i++) {
          const battle = allBattles[i];
          console.log(battle);
        }

        // Testing a battle I created 'Dex' for join functionality
        const fixBattle = await contract.getBattle('Dex');
        console.log(fixBattle);
      }
    };

    fetchBattles();
  }, [contract]);

  return (
    <div className="min-h-screen flex xl:flex-row flex-col">
      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img src={logo} alt="logo" className="w-[160px] h-[52px] object-contain" />

        <div className="flex-1 flex justify-center flex-col my-16">
          <div className="flex flex-row w-full">
            <div className="w-1 h-[120px] bg-siteViolet mr-3" />
            <h1 className={`${styles.headText} text-left`}>Join <br /> a Battle</h1>
          </div>

          <div className="my-10">
            <p className="font-rajdhani font-normal text-xl text-siteWhite">Join already existing battles</p>
          </div>

          <p className="font-rajdhani font-semibold text-2xl text-white mb-3">Available Battles:</p>

          <div className="flex flex-col gap-3">
            {battles.map((battle, index) => (
              <div key={battle.id} className="flex justify-between items-center">
                <p className="font-rajdhani font-normal text-xl text-white">{index + 1}. {battle.address}</p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold"
                  onClick={() => handleClick(battle.name)}
                >Join
                </button>
              </div>
            ))}
          </div>

          <p className="font-rajdhani font-medium text-lg text-siteViolet cursor-pointer mt-5"
            onClick={() => navigate('/create-battle')}
          >Or create a new battle
          </p>
        </div>

        <p className="font-rajdhani font-medium text-base text-white">Made with 💜 by JavaScript Mastery</p>
      </div>

      <div className="flex flex-1">
        <img src={heroImg} alt="hero-img" className="w-full xl:h-full h-[320px]" />
      </div>
    </div>
  );
};

export default JoinBattle;
