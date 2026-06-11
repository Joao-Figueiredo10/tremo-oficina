import { useEffect, useRef, useCallback } from 'react';
import { getPlayerZones } from '../utils/poseUtils';

const PLAYER_COLORS = ['#e07b39', '#4a9eff', '#b59f3b', '#9b59b6'];

export function usePoseDetection(videoRef, canvasRef, onResults, enabled = true) {
  const poseRef   = useRef(null);
  const cameraRef = useRef(null);

  const handleResults = useCallback((results) => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const W      = canvas.width;
    const H      = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const zones = getPlayerZones(W);
    zones.forEach((zone, i) => {
      if (i > 0) {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(zone.start, 0);
        ctx.lineTo(zone.start, H);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = PLAYER_COLORS[i];
      ctx.font = 'bold 14px monospace';
      ctx.fillText('P' + (i + 1), zone.start + 8, 22);
    });
    const playerLandmarks = [null, null, null, null];
    if (results.poseLandmarks) {
      const lms   = results.poseLandmarks;
      const noseX = lms[0]?.x ?? 0.5;
      const zone  = Math.min(3, Math.floor(noseX * 4));
      playerLandmarks[zone] = lms;
      const color = PLAYER_COLORS[zone];
      if (window.drawConnectors && window.POSE_CONNECTIONS) {
        window.drawConnectors(ctx, lms, window.POSE_CONNECTIONS, { color, lineWidth: 2 });
      }
      if (window.drawLandmarks) {
        window.drawLandmarks(ctx, lms, { color: '#fff', fillColor: color, lineWidth: 1, radius: 3 });
      }
    }
    onResults(playerLandmarks);
  }, [canvasRef, videoRef, onResults]);

  useEffect(() => {
    if (!enabled || !videoRef.current) return;
    const waitForMediaPipe = setInterval(() => {
      if (!window.Pose || !window.Camera) return;
      clearInterval(waitForMediaPipe);
      const pose = new window.Pose({
        locateFile: (file) => 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/' + file,
      });
      pose.setOptions({
        modelComplexity: 1, smoothLandmarks: true,
        enableSegmentation: false, smoothSegmentation: false,
        minDetectionConfidence: 0.5, minTrackingConfidence: 0.5,
        selfieMode: true,
      });
      pose.onResults(handleResults);
      poseRef.current = pose;
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && poseRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 1280, height: 720,
      });
      camera.start().catch((err) => console.error('[Termo] Erro câmara:', err));
      cameraRef.current = camera;
    }, 200);
    return () => {
      clearInterval(waitForMediaPipe);
      if (cameraRef.current) cameraRef.current.stop();
      if (poseRef.current)   poseRef.current.close();
    };
  }, [enabled, videoRef, handleResults]);

  const resizeCanvas = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const { videoWidth, videoHeight } = videoRef.current;
    if (videoWidth > 0) {
      canvasRef.current.width  = videoWidth;
      canvasRef.current.height = videoHeight;
    }
  }, [videoRef, canvasRef]);

  return { resizeCanvas };
}
