import React from 'react';
import { LETTER_STATE } from '../utils/gameLogic';

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER', 'Z','X','C','V','B','N','M', 'BACKSPACE'],
];

const KEY_STATE_CLASSES = {
  [LETTER_STATE.CORRECT]: 'bg-oficina-green  text-white border-oficina-green',
  [LETTER_STATE.PRESENT]: 'bg-oficina-yellow text-white border-oficina-yellow',
  [LETTER_STATE.ABSENT]:  'bg-oficina-grey   text-gray-400 border-oficina-grey',
  default:                 'bg-oficina-panel  text-white border-oficina-border hover:bg-[#3a3a3a]',
};

function Key({ label, state, onClick }) {
  const isWide = label === 'ENTER' || label === 'BACKSPACE';
  const colorClass = KEY_STATE_CLASSES[state] || KEY_STATE_CLASSES.default;
  return (
    <button
      onClick={() => onClick(label)}
      className={`${isWide ? 'px-3 text-xs min-w-[56px]' : 'w-9 text-sm'} h-14 rounded border font-mono font-bold select-none cursor-pointer transition-all duration-150 active:scale-95 ${colorClass}`}
    >
      {label === 'BACKSPACE' ? '⌫' : label}
    </button>
  );
}

export default function Keyboard({ keyboardState, onKey, disabled }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-full max-w-lg">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1 justify-center">
          {row.map((key) => (
            <Key key={key} label={key} state={keyboardState[key]} onClick={(k) => { if (!disabled) onKey(k); }} />
          ))}
        </div>
      ))}
    </div>
  );
}
