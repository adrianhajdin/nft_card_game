import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGlobalContext } from './context';

import { Battleground, Game, Home } from './page';

const App = () => {
  const { connectToProvider } = useGlobalContext();

  useEffect(() => {
    connectToProvider();
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
