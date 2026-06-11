import React from 'react';

export default function Header({ mode, onToggleMode, onReset, gameStatus }) {
  return (
    <header className="flex items-center justify-between border-b border-oficina-border px-4 py-3 bg-oficina-bg">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔧</span>
        <div>
          <h1 className="font-display text-2xl tracking-widest text-white leading-none">
            TERMO NA OFICINA
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-wider">
            ADIVINHE A PALAVRA DE 4 LETRAS
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMode}
          className="flex items-center gap-1.5 bg-oficina-panel border border-oficina-border text-gray-300 hover:text-white hover:border-oficina-orange px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-150"
        >
          {mode === 'pose' ? '⌨️ Teclado' : '📷 Câmara'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 bg-oficina-panel border border-oficina-border text-gray-300 hover:text-white hover:border-oficina-orange px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-150"
        >
          🔄 Novo
        </button>
        {gameStatus !== 'playing' && (
          <div className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border ${gameStatus === 'won' ? 'bg-oficina-green/20 border-oficina-green text-oficina-green' : 'bg-red-900/20 border-red-600 text-red-400'}`}>
            {gameStatus === 'won' ? '🏆 GANHOU!' : '💀 FIM'}
          </div>
        )}
      </div>
    </header>
  );
}
