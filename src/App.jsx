import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Game } from './page';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);

export default App;
