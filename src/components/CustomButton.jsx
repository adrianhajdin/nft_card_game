import React from 'react';

const CustomButton = ({ title, handleClick, restStyles }) => (
  <button
    type="button"
    className={`px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold ${restStyles}`}
    onClick={handleClick}
  >
    {title}
  </button>
);

export default CustomButton;
