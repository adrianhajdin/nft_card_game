import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Battleground, CreateBattle, Game, Home, JoinBattle } from './page';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/battleground" element={<Battleground />} />
      <Route path="/game/:battleHash" element={<Game />} />
      <Route path="/create-battle" element={<CreateBattle />} />
      <Route path="/join-battle" element={<JoinBattle />} />
    </Routes>
  </BrowserRouter>
);

export default App;
