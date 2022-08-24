import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Battleground, Game, Home } from './page';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/battleground" element={<Battleground />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);

export default App;
