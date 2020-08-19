import './app.scss';

const $timer = document.getElementById('timer');

const nextGame = new Date();
nextGame.setDate(nextGame.getDate() + (4+(7-nextGame.getDay())) % 7);
nextGame.setHours(20, 30, 0);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function tick() {
  const now = new Date();
  let milliseconds = nextGame.getTime() - now.getTime();
  const days = Math.floor(milliseconds / day);
  milliseconds = milliseconds % day;
  const hours = Math.floor(milliseconds / hour);
  milliseconds = milliseconds % hour;
  const minutes = Math.floor(milliseconds / minute);
  milliseconds = milliseconds % minute;
  const seconds = Math.floor(milliseconds / second);
  milliseconds = milliseconds % second;


  const formatted = days.toString().padStart(2, '0') + ':' + hours.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  $timer.innerHTML = formatted;
  console.log('tick');
}

console.log($timer);


setInterval(tick, 1000);
tick();
