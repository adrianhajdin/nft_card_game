import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalContextProvider } from './context';
import { Battleground, Game, Home } from './page';

const App = () => (
  <GlobalContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battleground" element={<Battleground />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </GlobalContextProvider>
);

export default App;
