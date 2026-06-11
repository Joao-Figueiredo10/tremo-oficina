export const LETTER_STATE = {
  CORRECT: 'correct',
  PRESENT: 'present',
  ABSENT:  'absent',
  EMPTY:   'empty',
  TYPING:  'typing',
};

export function evaluateGuess(guess, secret) {
  const result = Array(4).fill(null).map((_, i) => ({
    letter: guess[i],
    state:  LETTER_STATE.ABSENT,
  }));

  const secretLetterCount = {};
  for (const ch of secret) {
    secretLetterCount[ch] = (secretLetterCount[ch] || 0) + 1;
  }

  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      result[i].state = LETTER_STATE.CORRECT;
      secretLetterCount[guess[i]]--;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (result[i].state === LETTER_STATE.CORRECT) continue;
    const ch = guess[i];
    if (secretLetterCount[ch] && secretLetterCount[ch] > 0) {
      result[i].state = LETTER_STATE.PRESENT;
      secretLetterCount[ch]--;
    }
  }

  return result;
}

export function buildKeyboardState(evaluatedGuesses) {
  const priority = {
    [LETTER_STATE.CORRECT]: 3,
    [LETTER_STATE.PRESENT]: 2,
    [LETTER_STATE.ABSENT]:  1,
    [LETTER_STATE.EMPTY]:   0,
  };

  const map = {};
  for (const row of evaluatedGuesses) {
    for (const { letter, state } of row) {
      const current = map[letter];
      if (!current || priority[state] > priority[current]) {
        map[letter] = state;
      }
    }
  }
  return map;
}

export function getGameStatus(evaluatedGuesses, secret) {
  const lastGuess = evaluatedGuesses[evaluatedGuesses.length - 1];
  if (lastGuess && lastGuess.every(l => l.state === LETTER_STATE.CORRECT)) {
    return 'won';
  }
  if (evaluatedGuesses.length >= 6) {
    return 'lost';
  }
  return 'playing';
}
