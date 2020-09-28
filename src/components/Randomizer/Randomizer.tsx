import React, { useState, useEffect, useCallback } from 'react';

import './Randomizer.scss';

interface IProps {
    show: boolean,
    onClose: () => void,
};

const playerData = [
    {
        name: 'Dr. Kral',
        class: 'Engineer',
        normalClass: 'Engineer',
    },
    {
        name: 'WockBuz',
        class: 'Gunner',
        normalClass: 'Gunner',
    },
    {
        name: 'lasser_rasserr',
        class: 'Scout',
        normalClass: 'Scout',
    },
    {
        name: 'Marmot Party',
        class: 'Driller',
        normalClass: 'Driller',
    },
];

const startSpeed = 1;
const endSpeed = 300;
const multiplier = 1.1;

const Randomizer = ({ show, onClose }:IProps) => {
    const [players, setPlayers] = useState(playerData);
    const [lastOffset, setLastOffset] = useState(0);
    const [delay, setDelay] = useState(100);
    const [busy, setBusy] = useState(false);
    const firstRun = React.useRef(true)

    const go = () => {
        if (busy) return;
        setBusy(true);
        setDelay(startSpeed);
    }

    const randomize = useCallback(() => {
        let offset = 0;
        do {
            offset = 1 + Math.floor(Math.random() * 3);
        } while (offset === lastOffset);
        const newPlayers = [...players];
        newPlayers.forEach((player, i) => {
            let classSource = i + offset;
            if ( classSource >= newPlayers.length) classSource -= newPlayers.length;
            player.class = newPlayers[classSource].normalClass;
        });
        setLastOffset(offset);
        setPlayers(newPlayers);
    }, [lastOffset, players]);

    const updateTimer = () => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        const timer = setTimeout(() => {
            randomize();
            const newDelay = delay * multiplier;
            if (delay < endSpeed) {
                console.log(Math.round(delay));
                setDelay(newDelay);
            } else {
                console.log('doneski');
                setBusy(false);
                clearTimeout(timer);
            }
        }, delay);
        return () => clearTimeout(timer);
    }

    useEffect(updateTimer, [delay]);

    return (
        <div className={`randomizer__overlay  ${show ? 'visible' : ''}`}>
            <div className="randomizer__popup">
                <button className="unstyled  randomizer__close" onClick={onClose}>
                    &times;
                </button>
                <h3 className="randomizer__title">Class Randomizer</h3>
                <div className="randomizer__peeps">
                    {players.map((player) => (
                        <div key={player.name} className={`randomizer__peep  randomizer__peep--${player.class}`}>
                            <div className="randomizer__name">{player.name}</div>
                            <div className="randomizer__icon" />
                            <div className="randomizer__class">{player.class}</div>
                        </div>
                    ))}
                </div>
                <button className="unstyled  randomizer__go" onClick={go} disabled={busy}>
                    Mix It Up
                </button>
            </div>
        </div>
    );
}

export default Randomizer;
