import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './Dwarf.css';

const minDuration = 10;
const maxDuration = 15;
const minBob = 0.05;
const maxBob = 0.2;

interface IDwarf {
  name: string,
};

function makeSpeed() {
  return Math.random();
}

function makeEnd(left: boolean) {
  if (left) return `${-(Math.round(Math.random() * 300))}px`;
  return `calc(100vw + ${Math.round(Math.random() * 300)}px)`;
}

const Dwarf = ({ name }:IDwarf) => {
  const [direction, setDirection] = useState<string>('left');
  const [speed, setSpeed] = useState<number>(0);
  const [startX, setStartX] = useState<string>(''); 
  const [endX, setEndX] = useState<string>('');
  const [yell, setYell] = useState<string|null>(null)

  const turn = () => {
    setStartX(endX === '' ? makeEnd(true) : endX);
    setEndX(makeEnd(direction === 'right'));
    setSpeed(makeSpeed());
    setDirection(direction === 'right' ? 'left' : 'right');
  }

  const doYell = (reset: boolean = false) => {
    if (!reset && yell) return;
    if (reset) {
      setYell(null);
      return;
    }
    // play sound
    const yellNumber = 1 + Math.floor(Math.random() * 3);
    const sample = document.getElementById(`yell${yellNumber}`);

    if (sample) {
      (sample as HTMLAudioElement).play();
      const caption = sample.dataset.caption as string;
      setYell(caption);
    }
  }

  useEffect(turn, []);

  if (speed === 0) return null;

  return (
    <motion.div
      className={`Dwarf  Dwarf--${name}  Dwarf--${direction}`}
      style={{
        animationDuration: `${minBob + ((1 - speed) * (maxBob - minBob))}s`,
        scaleX: direction === 'left' ? 1 : -1
      }}
      initial={{ left: startX }}
      animate={{ left: endX }}
      transition={{
        ease: 'linear',
        duration: minDuration + (speed * (maxDuration - minDuration))
      }}
      onAnimationComplete={turn}
      onClick={() => doYell(false)}
    >
      <div className="Dwarf__image" />
      {yell && (
        <motion.div
          className="Dwarf__yell"
          animate={{ opacity: 0 }}
          transition={{ duration: 5 }}
          onAnimationComplete={() => doYell(true)}
        >
          {yell}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Dwarf;
