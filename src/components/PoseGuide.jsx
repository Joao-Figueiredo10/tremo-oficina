import React, { useState } from 'react';

const MOVES = [
  { icon: '↔️', title: 'Inclinar o tronco', desc: 'Inclina o corpo para a ESQUERDA ou DIREITA para navegar no alfabeto. Quanto mais inclinares, mais rápido avança.' },
  { icon: '⬇️', title: 'Agachar (Squat)',   desc: 'Faz um agachamento para CONFIRMAR e BLOQUEAR a letra. A tua zona fica verde.' },
  { icon: '🔡', title: 'Submissão automática', desc: 'Quando os 4 jogadores bloquearem a sua letra, a palavra é submetida automaticamente.' },
  { icon: '📍', title: 'Posição no ecrã',   desc: 'P1 (esq), P2, P3, P4 (dir). O nariz detetado pela câmara determina a tua zona.' },
];

export default function PoseGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-oficina-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-oficina-panel hover:bg-[#2e2e2e] font-mono text-xs text-gray-400 transition-colors"
      >
        <span className="flex items-center gap-2"><span>🕹️</span><span>COMO JOGAR COM O CORPO</span></span>
        <span className="text-oficina-orange">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="bg-oficina-bg px-4 py-3 grid grid-cols-2 gap-3">
          {MOVES.map((move, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-2xl mt-0.5">{move.icon}</span>
              <div>
                <div className="font-mono text-xs font-bold text-oficina-orange mb-0.5">{move.title}</div>
                <div className="font-mono text-[11px] text-gray-400 leading-relaxed">{move.desc}</div>
              </div>
            </div>
          ))}
          <div className="col-span-2 border-t border-oficina-border pt-2 mt-1">
            <p className="font-mono text-[11px] text-gray-500 text-center">
              💡 Mantém pelo menos 2 metros de distância da câmara para que o corpo inteiro seja visível.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
