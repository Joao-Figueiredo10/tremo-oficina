import { useState, useCallback, useRef } from 'react';
import { getRandomWord, isValidWord }     from '../utils/dictionary';
import { evaluateGuess, buildKeyboardState, getGameStatus, LETTER_STATE } from '../utils/gameLogic';
import { ALPHABET, scrollAlphabet }       from '../utils/poseUtils';

function makeInitialPlayerState() {
  return { alphaIndex: 0, locked: false, letter: '' };
}

export function useGameState() {
  const [secretWord,    setSecretWord]    = useState(() => getRandomWord());
  const [guesses,       setGuesses]       = useState([]);
  const [currentGuess,  setCurrentGuess]  = useState('');
  const [gameStatus,    setGameStatus]    = useState('playing');
  const [keyboardState, setKeyboardState] = useState({});
  const [message,       setMessage]       = useState('');
  const [shakeRow,      setShakeRow]      = useState(false);
  const [players,       setPlayers]       = useState([
    makeInitialPlayerState(),
    makeInitialPlayerState(),
    makeInitialPlayerState(),
    makeInitialPlayerState(),
  ]);

  const scrollCooldownRef  = useRef([0, 0, 0, 0]);
  const confirmCooldownRef = useRef([0, 0, 0, 0]);
  const SCROLL_COOLDOWN_MS  = 180;
  const CONFIRM_COOLDOWN_MS = 1200;

  const showMessage = useCallback((msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }, []);

  const resetGame = useCallback(() => {
    setSecretWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setKeyboardState({});
    setMessage('');
    setShakeRow(false);
    setPlayers([makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState()]);
    scrollCooldownRef.current  = [0, 0, 0, 0];
    confirmCooldownRef.current = [0, 0, 0, 0];
  }, []);

  const submitWord = useCallback((word) => {
    if (gameStatus !== 'playing') return;
    if (word.length !== 4) return;
    if (!isValidWord(word)) {
      showMessage('Palavra não encontrada! 🔧');
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      setPlayers([makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState()]);
      return;
    }
    const evaluated  = evaluateGuess(word, secretWord);
    const newGuesses = [...guesses, evaluated];
    setGuesses(newGuesses);
    setKeyboardState(buildKeyboardState(newGuesses));
    const status = getGameStatus(newGuesses, secretWord);
    setGameStatus(status);
    if (status === 'won')  showMessage('EXCELENTE! Palavra certa! 🏆', 4000);
    if (status === 'lost') showMessage('Fim de jogo! A palavra era: ' + secretWord, 5000);
    setPlayers([makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState(), makeInitialPlayerState()]);
  }, [gameStatus, guesses, secretWord, showMessage]);

  const handlePlayerPose = useCallback((playerIndex, poseAction) => {
    if (gameStatus !== 'playing') return;
    const now = Date.now();
    setPlayers(prev => {
      const updated = [...prev];
      const player  = { ...updated[playerIndex] };
      if (player.locked) return prev;
      if (poseAction.action === 'scroll') {
        if (now - scrollCooldownRef.current[playerIndex] < SCROLL_COOLDOWN_MS) return prev;
        scrollCooldownRef.current[playerIndex] = now;
        player.alphaIndex = scrollAlphabet(player.alphaIndex, poseAction.direction, poseAction.speed || 1);
        player.letter = ALPHABET[player.alphaIndex];
        updated[playerIndex] = player;
        return updated;
      }
      if (poseAction.action === 'confirm') {
        if (now - confirmCooldownRef.current[playerIndex] < CONFIRM_COOLDOWN_MS) return prev;
        confirmCooldownRef.current[playerIndex] = now;
        if (player.letter === '') player.letter = ALPHABET[player.alphaIndex];
        player.locked = true;
        updated[playerIndex] = player;
        const allLocked = updated.every(p => p.locked);
        if (allLocked) {
          const word = updated.map(p => p.letter).join('');
          setTimeout(() => submitWord(word), 50);
        }
        return updated;
      }
      return prev;
    });
  }, [gameStatus, submitWord]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'playing') return;
    if (key === 'ENTER') {
      if (currentGuess.length === 4) { submitWord(currentGuess); setCurrentGuess(''); }
      else { showMessage('A palavra precisa de 4 letras!'); setShakeRow(true); setTimeout(() => setShakeRow(false), 500); }
      return;
    }
    if (key === 'BACKSPACE') { setCurrentGuess(prev => prev.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && currentGuess.length < 4) setCurrentGuess(prev => prev + key);
  }, [gameStatus, currentGuess, submitWord, showMessage]);

  return {
    secretWord, guesses, currentGuess, gameStatus, keyboardState,
    message, shakeRow, players, currentRow: guesses.length,
    handlePlayerPose, handleKeyPress, resetGame,
  };
}
