export const LM = {
  NOSE:           0,
  SHOULDER_LEFT:  11,
  SHOULDER_RIGHT: 12,
  HIP_LEFT:       23,
  HIP_RIGHT:      24,
  KNEE_LEFT:      25,
  KNEE_RIGHT:     26,
  ANKLE_LEFT:     27,
  ANKLE_RIGHT:    28,
};

export function getTiltAngle(landmarks) {
  if (!landmarks || landmarks.length < 33) return 0;
  const ls = landmarks[LM.SHOULDER_LEFT];
  const rs = landmarks[LM.SHOULDER_RIGHT];
  if (!ls || !rs) return 0;
  const dy = ls.y - rs.y;
  const dx = ls.x - rs.x;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

export function getSquatDepth(landmarks) {
  if (!landmarks || landmarks.length < 33) return 0;
  const ls = landmarks[LM.SHOULDER_LEFT];
  const rs = landmarks[LM.SHOULDER_RIGHT];
  const lh = landmarks[LM.HIP_LEFT];
  const rh = landmarks[LM.HIP_RIGHT];
  const la = landmarks[LM.ANKLE_LEFT];
  const ra = landmarks[LM.ANKLE_RIGHT];
  if (!ls || !rs || !lh || !rh || !la || !ra) return 0;
  const shoulderY = (ls.y + rs.y) / 2;
  const hipY      = (lh.y + rh.y) / 2;
  const ankleY    = (la.y + ra.y) / 2;
  const totalHeight = ankleY - shoulderY;
  if (totalHeight <= 0) return 0;
  const hipRelative = (hipY - shoulderY) / totalHeight;
  return Math.max(0, Math.min(1, (0.52 - hipRelative) / 0.22));
}

export function interpretPose(landmarks) {
  const TILT_THRESHOLD  = 12;
  const SQUAT_THRESHOLD = 0.5;
  const tilt  = getTiltAngle(landmarks);
  const squat = getSquatDepth(landmarks);
  if (squat > SQUAT_THRESHOLD) {
    return { action: 'confirm' };
  }
  const absTilt = Math.abs(tilt);
  if (absTilt > TILT_THRESHOLD) {
    const speed = Math.floor(Math.min(3, (absTilt - TILT_THRESHOLD) / 10)) + 1;
    return { action: 'scroll', direction: tilt > 0 ? 1 : -1, speed };
  }
  return { action: 'none' };
}

export function getPlayerZones(totalWidth) {
  const zoneWidth = totalWidth / 4;
  return Array.from({ length: 4 }, (_, i) => ({
    start: Math.round(i * zoneWidth),
    end:   Math.round((i + 1) * zoneWidth),
  }));
}

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function scrollAlphabet(currentIndex, direction, steps = 1) {
  const len = ALPHABET.length;
  return ((currentIndex + direction * steps) % len + len) % len;
}
