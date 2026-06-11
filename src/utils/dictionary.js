export const DICTIONARY = [
  "RODA", "OLEO", "CABO", "FURO", "VELA", "EIXO", "CAPO", "TUBO",
  "PNEU", "JIPE", "TACO", "LIMA", "PINO", "VIGA", "MOLA", "FITA",
  "CAVA", "LONA", "BOIA", "ARCO", "CAME", "MACA", "POTE", "TORX",
  "SOCA", "VARO", "PECA", "BOCA", "DUTO", "GATO",
];

export const VALID_WORDS = new Set([
  ...DICTIONARY,
  "AMOR", "ANOS", "ARMA", "ARTE", "AZUL", "BALA", "BATE", "BELO",
  "BOLA", "BOLO", "BOTA", "CARA", "CARO", "CASA", "CENA", "CIMA",
  "COLA", "COMO", "COPA", "COPO", "CORA", "CORO", "COTA", "DATA",
  "DEDO", "DEUS", "DICA", "DONO", "DONA", "DOSE", "DURO", "ERVA",
  "ESTA", "ESTE", "FADO", "FALA", "FASE", "FATO", "FAVA", "FEIA",
  "FINO", "FOCO", "FOGO", "FOME", "FORA", "FOTO", "GELO", "GIRO",
  "GOLA", "GOTA", "GUIA", "HORA", "ILHA", "JOGO", "JOIA", "JURO",
  "LADO", "LAGO", "LAMA", "LATA", "LAVA", "LEMA", "LEVE", "LIGA",
  "LOJA", "LOTE", "LUVA", "LUXO", "MALA", "MAPA", "MATA", "MATE",
  "MEIA", "MEIO", "MESA", "META", "MINA", "MODO", "MORA", "MOTE",
  "MUDA", "MUDO", "MURO", "NADA", "NEVE", "NOME", "NORA", "NOTA",
  "NOVA", "NOVO", "OBRA", "OLHO", "ONDA", "OURO", "PAGA", "PELA",
  "PELO", "PENA", "PESO", "PICA", "PICO", "PIPA", "PISO", "PODE",
  "POLO", "POVO", "RABO", "RAIO", "RAMO", "RATA", "RATO", "REAL",
  "REDE", "REMO", "RETO", "RICA", "RICO", "RISO", "ROLO", "ROTA",
  "RUGA", "RUMO", "SAGA", "SAIA", "SALA", "SECA", "SECO", "SEDE",
  "SELO", "SEXO", "SINO", "SOFA", "SOLO", "SOMA", "SONO", "SOPA",
  "TELA", "TEMA", "TESE", "TETO", "TIPO", "TIRA", "TIRO", "TOMA",
  "TOPO", "TORA", "TUDO", "VARA", "VASO", "VEIA", "VELO", "VERA",
  "VIDA", "VILA", "VIRA", "VIVA", "VIVE", "VIVO", "ZONA",
]);

export function getRandomWord() {
  return DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
}

export function isValidWord(word) {
  return VALID_WORDS.has(word.toUpperCase());
}
