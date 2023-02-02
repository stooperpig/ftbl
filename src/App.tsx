import React from 'react';
import './App.css';
import { Game } from './components/game/game';
import { OpeningKickoffModal } from './components/modal/opening-kickoff/opening-kickoff';

function App() {
  return (
    <div className="App">
      <Game/>
      <OpeningKickoffModal/>
    </div>
  );
}

export default App;
