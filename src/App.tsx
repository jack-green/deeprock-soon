import React from 'react';
import Countdown from './components/Countdown';
import Dwarves from './components/Dwarves/Dwarves';
import Audio from './components/Audio/Audio';

import './App.css';

function App() {
  return (
    <div className="App">
      <Countdown />
      <Dwarves />
      <Audio />
    </div>
  );
}

export default App;
