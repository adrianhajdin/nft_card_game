import React from 'react';
import { ace, jadeMonk } from '../assets';
import Card from './Card';

const home = () => (
  <div className="relative w-screen h-screen">
    <div className="bg-img" />

    <div className="absolute inset-0 flex justify-center items-center flex-wrap">
      <Card cardImg={ace} title="Opponent" />
      <Card cardImg={jadeMonk} title="You" restStyles="ml-10" />
    </div>
  </div>
);

export default home;
