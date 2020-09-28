import React from 'react';

import diceImage from '../../img/dice.png';

import './Dice.scss';

interface IProps {
    onClick: () => void,
};


const Dice = ({ onClick }:IProps) => (
    <button onClick={onClick} className="unstyled  dice">
        <img src={diceImage} />
    </button>
);

export default Dice;
