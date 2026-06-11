import React, { useRef, useEffect, useCallback } from 'react';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { interpretPose }    from '../utils/poseUtils';

const ZONE_LABELS = ['JOGADOR 1', 'JOGADOR 2', 'JOGADOR 3', 'JOGADOR 4'];
const ZONE_COLORS = ['#e07b39', '#4a9eff', '#b59f3b', '#9b59b6'];

export default function CameraView({ onPlayerPose, players, enabled }) {
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);

  const handlePoseResults = useCallback((playerLandmarks) => {
    playerLandmarks.forEach((lms, playerIndex) => {
      if (!lms) return;
      const action = interpretPose(lms);
      if (action.action !== 'none') onPlayerPose(playerIndex, action);
    });
  }, [onPlayerPose]);

  const { resizeCanvas } = usePoseDetection(videoRef, canvasRef, handlePoseResults, enabled);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => resizeCanvas();
    video.addEventListener('loadedmetadata', onLoaded);
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, [resizeCanvas]);

  if (!enabled) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-oficina-panel rounded-xl border border-oficina-border">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📷</div>
          <div className="font-mono text-sm">Câmara desativada</div>
          <div className="font-mono text-xs mt-1">Usa o teclado para jogar</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-oficina-border bg-black">
      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />
      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: 4 }, (_, i) => {
          const isLocked = players[i]?.locked;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col justify-between p-2"
              style={{
                borderLeft: i > 0 ? '1px dashed rgba(255,255,255,0.1)' : 'none',
                boxShadow:  isLocked ? 'inset 0 0 0 2px rgba(83,141,78,0.6)' : 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              <div className="text-xs font-mono font-bold px-1 py-0.5 rounded" style={{ color: ZONE_COLORS[i], backgroundColor: 'rgba(0,0,0,0.5)', alignSelf: 'flex-start' }}>
                {ZONE_LABELS[i]}
              </div>
              <div className="text-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 6, padding: '2px 4px' }}>
                {isLocked
                  ? <span className="text-oficina-green font-display text-3xl">{players[i].letter} ✓</span>
                  : <span className="font-display text-3xl" style={{ color: ZONE_COLORS[i] }}>{players[i]?.letter || '?'}</span>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
