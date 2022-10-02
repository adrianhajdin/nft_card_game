import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import { GlobalContextProvider } from './context';
import { Battleground, CreateBattle, Game, Home, JoinBattle } from './page';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battleground" element={<Battleground />} />
          <Route path="/game/:battleName" element={<Game />} />
          <Route path="/create-battle" element={<CreateBattle />} />
          <Route path="/join-battle" element={<JoinBattle />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>;
  </React.StrictMode>,
);
