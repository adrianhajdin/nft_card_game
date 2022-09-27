/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { heroImg, logo } from '../assets';
import { useGlobalContext } from '../context';
import styles from '../styles';

// raj
// tuesday/wednesday
// late respond thurdsay -> friday
// not available next monday -> wednesday

const Home = () => {
  const navigate = useNavigate();
  const { contract } = useGlobalContext();

  const [userAccount, setUserAccount] = useState('');
  const [playerName, setPlayerName] = useState('');

  async function handleConnection(accounts) {
    if (accounts.length === 0) {
      const reqaccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return reqaccounts;
    }
    return accounts;
  }

  const requestAccount = async () => {
    let account = 0x0;
    let accounts = await window.ethereum.request({ method: 'eth_accounts' });
    accounts = await handleConnection(accounts);
    account = accounts[0];

    window.ethereum.on('accountsChanged', async () => {
      const chagedAccounts = await window.ethereum.enable();
      account = chagedAccounts[0];
    });

    setUserAccount(account);
  };

  useEffect(() => {
    requestAccount();
  }, []);

  const handleClick = async () => {
    if (playerName === '' || playerName.trim() === '') return null;

    requestAccount();
    await contract.registerPlayer(playerName);
    navigate('/create-battle');
  };

  return (
    <div className="min-h-screen flex xl:flex-row flex-col">
      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img src={logo} alt="logo" className="w-[160px] h-[52px] object-contain" />

        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <div className="w-1 h-[120px] bg-siteViolet mr-3" />
            <h1 className={`${styles.headText} text-left`}>Welcome to the <br /> AVAXQuest Web3.0 Game</h1>
          </div>

          <div className="my-10">
            <p className="font-rajdhani font-normal text-xl text-siteWhite">Join others to play the ultimate <br /> Web3 Battle Cards Game</p>
          </div>

          {userAccount ? (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Name</label>
                <input
                  type="text"
                  placeholder="Enter your battle name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full"
                />
              </div>
              <button type="button" className="mt-6 px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold" onClick={handleClick}>Register</button>
            </div>
          ) : (
            <button type="button" className="px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold" onClick={handleClick}>Connect</button>
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

export default Home;
