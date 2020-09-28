import React, { useState } from 'react';
import Countdown from './components/Countdown';
import Dwarves from './components/Dwarves/Dwarves';
import Audio from './components/Audio/Audio';
import Dice from "./components/Randomizer/Dice";
import Randomizer from "./components/Randomizer/Randomizer";


import './App.css';

function App() {
    const [showRandomizer, setShowRandomizer] = useState(false);
    React.useEffect(() => {
        console.log('Show', showRandomizer);
    }, [showRandomizer]);
  return (
    <div className="App">
      <Countdown />
      <Dwarves />
      <Dice onClick={() => setShowRandomizer(true)} />
      <Randomizer show={showRandomizer} onClose={() => setShowRandomizer(false)} />
      <Audio />
    </div>
  );
}

export default App;
