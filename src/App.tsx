import React from 'react';
import './App.css';
import { Game } from './components/game/game';
import { CoinTossModal } from './components/modal/coin-toss/coin-toss';

function App() {
  return (
    <div className="App">
      <Game/>
      <CoinTossModal/>
    </div>
  );
}

export default App;
