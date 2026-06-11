import React from 'react';
import { ALPHABET } from '../utils/poseUtils';

const PLAYER_COLORS = [
  { border: 'border-oficina-orange', text: 'text-oficina-orange', bg: 'bg-oficina-orange' },
  { border: 'border-blue-400',       text: 'text-blue-400',       bg: 'bg-blue-400'       },
  { border: 'border-oficina-yellow', text: 'text-oficina-yellow', bg: 'bg-oficina-yellow' },
  { border: 'border-purple-400',     text: 'text-purple-400',     bg: 'bg-purple-400'     },
];

const PLAYER_ICONS = ['🔧', '🔩', '⚙️', '🛠️'];

function AlphabetBar({ currentIndex, color }) {
  const pct = (currentIndex / (ALPHABET.length - 1)) * 100;
  return (
    <div className="w-full h-1.5 bg-oficina-border rounded-full overflow-hidden mt-1">
      <div className={`h-full rounded-full transition-all duration-100 ${color.bg}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function PlayerZone({ index, player, isActive }) {
  const color         = PLAYER_COLORS[index];
  const currentLetter = player.letter || ALPHABET[player.alphaIndex] || 'A';
  const prevLetter    = ALPHABET[(player.alphaIndex - 1 + 26) % 26];
  const nextLetter    = ALPHABET[(player.alphaIndex + 1) % 26];

  return (
    <div className={`flex flex-col items-center justify-between bg-oficina-panel rounded-xl p-3 border-2 transition-all duration-200 ${player.locked ? 'border-oficina-green shadow-[0_0_16px_rgba(83,141,78,0.5)]' : isActive ? `${color.border}` : 'border-oficina-border'}`}>
      <div className="flex items-center gap-2 w-full">
        <span className="text-lg">{PLAYER_ICONS[index]}</span>
        <span className={`font-display text-lg tracking-wider ${color.text}`}>P{index + 1}</span>
        {player.locked && <span className="ml-auto text-oficina-green text-xs font-mono">✓ BLOQUEADO</span>}
      </div>
      <div className="flex items-center gap-3 my-2">
        <span className="text-gray-600 font-display text-xl opacity-50">{player.locked ? '' : prevLetter}</span>
        <div className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 font-display text-4xl transition-all duration-100 ${player.locked ? 'border-oficina-green bg-oficina-green/20 text-white' : `${color.border} bg-oficina-bg ${color.text}`}`}>
          {currentLetter}
        </div>
        <span className="text-gray-600 font-display text-xl opacity-50">{player.locked ? '' : nextLetter}</span>
      </div>
      {!player.locked && <AlphabetBar currentIndex={player.alphaIndex} color={color} />}
      <div className="text-xs text-gray-500 font-mono mt-1 text-center">
        {player.locked ? `Letra confirmada: "${currentLetter}"` : isActive ? '↔ inclinar | ↓ agachar=confirmar' : 'Aguarda deteção...'}
      </div>
    </div>
  );
}
