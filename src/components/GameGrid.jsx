import React from 'react';
import { LETTER_STATE } from '../utils/gameLogic';
import { ALPHABET }     from '../utils/poseUtils';

const STATE_CLASSES = {
  [LETTER_STATE.CORRECT]: 'bg-oficina-green  border-oficina-green  text-white',
  [LETTER_STATE.PRESENT]: 'bg-oficina-yellow border-oficina-yellow text-white',
  [LETTER_STATE.ABSENT]:  'bg-oficina-grey   border-oficina-grey   text-white',
  [LETTER_STATE.EMPTY]:   'bg-transparent    border-oficina-border text-white',
  [LETTER_STATE.TYPING]:  'bg-transparent    border-white          text-white',
};

function Tile({ letter, state, animDelay = 0 }) {
  const colorClass  = STATE_CLASSES[state] || STATE_CLASSES[LETTER_STATE.EMPTY];
  const isEvaluated = state !== LETTER_STATE.EMPTY && state !== LETTER_STATE.TYPING;
  return (
    <div className="tile-wrapper w-14 h-14 md:w-16 md:h-16">
      <div
        className={`w-full h-full flex items-center justify-center border-2 rounded font-display text-3xl tracking-widest select-none transition-colors duration-100 ${colorClass} ${isEvaluated ? 'tile-flip' : ''}`}
        style={{ animationDelay: isEvaluated ? `${animDelay * 0.15}s` : '0s' }}
      >
        {letter || ''}
      </div>
    </div>
  );
}

function GridRow({ tiles, shake }) {
  return (
    <div className={`flex gap-2 ${shake ? 'row-shake' : ''}`}>
      {tiles.map((tile, i) => <Tile key={i} letter={tile.letter} state={tile.state} animDelay={i} />)}
    </div>
  );
}

function buildCurrentRowTiles(currentGuess, players, mode) {
  return Array.from({ length: 4 }, (_, i) => {
    if (mode === 'pose') {
      const player = players[i];
      const letter = player.locked ? player.letter : (player.letter || ALPHABET[player.alphaIndex] || '');
      return { letter, state: player.locked ? LETTER_STATE.TYPING : LETTER_STATE.EMPTY };
    }
    const letter = currentGuess[i] || '';
    return { letter, state: letter ? LETTER_STATE.TYPING : LETTER_STATE.EMPTY };
  });
}

export default function GameGrid({ guesses, currentGuess, players, mode = 'keyboard', shakeRow }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {Array.from({ length: 6 }, (_, rowIndex) => {
        if (rowIndex < guesses.length) {
          return <GridRow key={rowIndex} tiles={guesses[rowIndex]} shake={false} />;
        }
        if (rowIndex === guesses.length) {
          return <GridRow key={rowIndex} tiles={buildCurrentRowTiles(currentGuess, players, mode)} shake={shakeRow} />;
        }
        return <GridRow key={rowIndex} tiles={Array(4).fill({ letter: '', state: LETTER_STATE.EMPTY })} shake={false} />;
      })}
    </div>
  );
}
