import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGlobalContext } from './context';

import { Battleground, Game, Home } from './page';

const App = () => {
  const { createProviderAndSigner } = useGlobalContext();

  useEffect(() => {
    createProviderAndSigner();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battleground" element={<Battleground />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
