import React from 'react';

const CustomInput = ({ label, placeHolder, value, handleValueChange }) => (
  <>
    <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">{label}</label>
    <input
      type="text"
      placeholder={placeHolder}
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
      value={value}
      onChange={(e) => {
        const regex = /^[A-Za-z0-9 ]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
          handleValueChange(e.target.value);
        }
      }}
      className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full"
    />
  </>
);

export default CustomInput;
