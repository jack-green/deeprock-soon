import React from 'react';

import Dwarf from './Dwarf';

import './Dwarves.css';

const dwarfNames = ['scout', 'gunner', 'engineer', 'driller'];

function Dwarves() {
  return (
    <div className="Dwarves">
      {dwarfNames.map((n) => <Dwarf key={n} name={n} />)}
    </div>
  );
}

export default Dwarves;
