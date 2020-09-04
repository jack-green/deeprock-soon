import React, { useState, useEffect } from 'react';

import './Countdown.css';

const second: number = 1000;
const minute: number = second * 60;
const hour: number = minute * 60;
const day: number = hour * 24;
const gameLength: number = hour * 2.5; // let's just say we play for two and a half hours
let nextGame: Date = new Date();

function getNextGame() {
  nextGame = new Date();
  //  next thursday
  nextGame.setDate(nextGame.getDate() + (4+(7-nextGame.getDay())) % 7);
  // 8:30pm
  nextGame.setHours(20, 30, 0);
}

function Countdown() {
  const [timer, setTimer] = useState<number[]>([0, 0, 0, 0]);

  const tick = () => {
    const now = new Date();
    let milliseconds = nextGame.getTime() - now.getTime();

    if (milliseconds < -gameLength) {
      // we're done playing, restart the timer for the next game
      getNextGame();
      return;
    }
    else if (milliseconds < 0) {
      // we're in the middle of playing, display 00:00
      milliseconds = 0;
    }

    const days = Math.floor(milliseconds / day);
    milliseconds = milliseconds % day;
    const hours = Math.floor(milliseconds / hour);
    milliseconds = milliseconds % hour;
    const minutes = Math.floor(milliseconds / minute);
    milliseconds = milliseconds % minute;
    const seconds = Math.floor(milliseconds / second);
    milliseconds = milliseconds % second;
    setTimer([days, hours, minutes, seconds]);
  };

  useEffect(() => {
    getNextGame();
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Countdown">
      <div className="Countdown__icon"></div>
      <div className="Countdown__content">
        <div className="Countdown__title">Countdown to Mission</div>
        <div className="Countdown__timer">
          {timer.map((v, i) => <span key={`count-${i+0}`}>{v.toString().padStart(2, '0')}</span>)}
        </div>
      </div>
    </div>
  );
}

export default Countdown;
