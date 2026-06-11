import React, { useState, useCallback, useEffect } from 'react';
import Header     from './components/Header';
import CameraView from './components/CameraView';
import GameGrid   from './components/GameGrid';
import Keyboard   from './components/Keyboard';
import PlayerZone from './components/PlayerZone';
import PoseGuide  from './components/PoseGuide';
import Toast      from './components/Toast';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const [mode, setMode] = useState('pose');

  const {
    secretWord, guesses, currentGuess, gameStatus, keyboardState,
    message, shakeRow, players, currentRow,
    handlePlayerPose, handleKeyPress, resetGame,
  } = useGameState();

  const toggleMode = useCallback(() => setMode(m => m === 'pose' ? 'keyboard' : 'pose'), []);

  useEffect(() => {
    if (mode !== 'keyboard') return;
    const onKey = (e) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE') handleKeyPress(key);
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, handleKeyPress]);

  const activePlayer = players.findIndex(p => !p.locked);

  return (
    <div className="flex flex-col h-screen bg-oficina-bg overflow-hidden">
      <Header mode={mode} onToggleMode={toggleMode} onReset={resetGame} gameStatus={gameStatus} />
      <main className="flex flex-1 overflow-hidden">
        <section className="flex flex-col flex-1 p-3 gap-3 overflow-hidden">
          <div className="flex-1 min-h-0">
            <CameraView onPlayerPose={handlePlayerPose} players={players} enabled={mode === 'pose'} />
          </div>
          {mode === 'pose' && <PoseGuide />}
        </section>
        <div className="w-px bg-oficina-border my-3" />
        <section className="flex flex-col items-center gap-4 p-4 w-[420px] overflow-y-auto">
          <GameGrid guesses={guesses} currentGuess={currentGuess} players={players} mode={mode} shakeRow={shakeRow} />
          <div className="w-full h-px bg-oficina-border" />
          {mode === 'pose' && (
            <div className="w-full grid grid-cols-2 gap-2">
              {players.map((player, i) => (
                <PlayerZone key={i} index={i} player={player} isActive={i === activePlayer} />
              ))}
            </div>
          )}
          {mode === 'keyboard' && (
            <Keyboard keyboardState={keyboardState} onKey={handleKeyPress} disabled={gameStatus !== 'playing'} />
          )}
          {gameStatus !== 'playing' && (
            <div className="w-full flex flex-col items-center gap-3 mt-2">
              <div className={`text-center font-mono text-sm px-4 py-2 rounded-lg border ${gameStatus === 'won' ? 'bg-oficina-green/20 border-oficina-green text-oficina-green' : 'bg-red-900/20 border-red-600 text-red-400'}`}>
                {gameStatus === 'won' ? `🏆 Palavra certa em ${guesses.length} tentativa${guesses.length > 1 ? 's' : ''}!` : `💀 A palavra era: ${secretWord}`}
              </div>
              <button onClick={resetGame} className="bg-oficina-orange hover:bg-orange-500 text-white font-mono font-bold px-8 py-2.5 rounded-lg transition-colors duration-150 text-sm tracking-wider">
                🔧 NOVO JOGO
              </button>
            </div>
          )}
          {import.meta.env.DEV && (
            <div className="w-full mt-auto pt-2 border-t border-oficina-border">
              <p className="text-[10px] text-gray-600 font-mono text-center">
                DEV: palavra = <span className="text-oficina-orange">{secretWord}</span> | tentativas: {guesses.length}/6 | modo: {mode}
              </p>
            </div>
          )}
        </section>
      </main>
      <Toast message={message} />
    </div>
  );
}
