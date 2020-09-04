import React from 'react';

const samples = [
  {
    name: 'yell1',
    caption: 'For Karl!',
    file: require('./for_karl.ogg'),
  },
  {
    name: 'yell2',
    caption: 'Rock And Stone!',
    file: require('./rock_and_stone.ogg'),
  },
  {
    name: 'yell3',
    caption: 'Leave No Dwarf Behind!',
    file: require('./leave_no_dwarf_behind.ogg'),
  },
];

const Audio = () => (
  <>
    {samples.map((s) => (
      <audio id={s.name} key={s.name} data-caption={s.caption}>
        <source src={s.file} type="audio/ogg" />
      </audio>
    ))}
  </>
);

export default Audio;