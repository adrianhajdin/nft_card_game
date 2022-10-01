import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { logo, heroImg } from '../assets';

const PageHOC = (Component, title, description) => () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex xl:flex-row flex-col relative">

      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img src={logo} alt="logo" className="w-[160px] h-[52px] object-contain" onClick={() => navigate('/')} />

        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} text-left head-text`}>{title}</h1>
          </div>

          <div className="my-10">
            <p className="font-rajdhani font-normal text-[24px] text-siteWhite">{description}</p>
          </div>

          <Component />
        </div>

        <p className="font-rajdhani font-medium text-base text-white">Made with 💜 by JavaScript Mastery</p>
      </div>

      <div className="flex flex-1">
        <img src={heroImg} alt="hero-img" className="w-full xl:h-full" />
      </div>
    </div>
  );
};

export default PageHOC;
