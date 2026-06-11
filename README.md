# 🔧 Termo na Oficina

Jogo estilo Wordle/Termo para 4 jogadores em simultâneo, controlado por **movimentos corporais** via webcam usando **MediaPipe Pose**.

---

## 🚀 Instalação no GitHub Codespaces

### 1. Cria o projeto com Vite (se ainda não o fizeste)

```bash
# No terminal do Codespaces
npm create vite@latest termo-na-oficina -- --template react
cd termo-na-oficina
```

### 2. Copia todos os ficheiros deste projeto para a pasta criada
Substitui os ficheiros gerados pelo Vite com os deste repositório.

### 3. Instala as dependências

```bash
npm install
```

### 4. Instala as dependências do MediaPipe separadamente (se necessário)

```bash
npm install @mediapipe/pose @mediapipe/camera_utils @mediapipe/drawing_utils
```

### 5. Instala o Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 6. Arranca o servidor de desenvolvimento

```bash
npm run dev
```

O servidor arranca em `http://localhost:5173`.
No Codespaces, o VS Code abrirá automaticamente o port forwarding.
Acede ao URL público que o Codespaces fornecer (ex: `https://xxx-5173.app.github.dev`).

> ⚠️ **Importante para HTTPS**: A câmara (`getUserMedia`) só funciona em contexto seguro (HTTPS ou localhost). O Codespaces usa HTTPS automaticamente no URL público.

---

## 📁 Estrutura de Ficheiros

```
termo-na-oficina/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── wrench.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx        ← Cabeçalho + controlos
    │   ├── CameraView.jsx    ← Feed câmara + overlay esqueleto
    │   ├── GameGrid.jsx      ← Grelha 6×4 (tiles com cores)
    │   ├── Keyboard.jsx      ← Teclado virtual (modo fallback)
    │   ├── PlayerZone.jsx    ← Painel individual de cada jogador
    │   ├── PoseGuide.jsx     ← Guia de movimentos (colapsável)
    │   └── Toast.jsx         ← Mensagens de feedback temporárias
    ├── hooks/
    │   ├── usePoseDetection.js  ← Hook MediaPipe Pose + câmara
    │   └── useGameState.js      ← Estado completo do jogo
    └── utils/
        ├── dictionary.js     ← 40 palavras PT-PT + lógica de validação
        ├── gameLogic.js      ← Avaliação de tentativas (verde/amarelo/cinzento)
        └── poseUtils.js      ← Interpretação de ângulos e poses
```

---

## 🕹️ Como Jogar com o Corpo

### Configuração física
- 4 jogadores ficam de pé, **frente à câmara**, cada um na sua zona:
  - **P1** → zona esquerda
  - **P2** → segunda zona da esquerda
  - **P3** → terceira zona
  - **P4** → zona direita
- Distância mínima recomendada: **2 metros** da câmara
- O corpo inteiro deve ser visível (cabeça a tornozelos)

### Movimentos

| Movimento | Ação |
|-----------|------|
| ↔ **Inclinar o tronco para a esquerda** | Recua no alfabeto (Z←A) |
| ↔ **Inclinar o tronco para a direita** | Avança no alfabeto (A→Z) |
| ⬇ **Agachar (Squat)** | Confirma e bloqueia a letra atual |

### Fluxo de jogo
1. Cada jogador navega pelas letras inclinando o corpo
2. Quando chegar à letra desejada, **agacha** para bloquear
3. A sua zona fica **verde** e a letra fica confirmada
4. Quando os **4 jogadores bloquearem**, a palavra é submetida automaticamente
5. A grelha mostra o feedback (verde/amarelo/cinzento)
6. Repetem até 6 tentativas

### Dicas de postura
- Inclina o **tronco inteiro** (não apenas os braços)
- O agachamento precisa de ser suficientemente profundo (~50% do caminho)
- Mantém a cabeça visível para que o MediaPipe te detete corretamente

---

## ⌨️ Modo Teclado (Fallback)

Clica em **"⌨️ Teclado"** no cabeçalho para jogar sem câmara.
- Usa o **teclado físico** ou o **teclado virtual** no ecrã
- A palavra é submetida ao carregar **ENTER**
- **BACKSPACE** apaga a última letra

---

## 🔧 Dicionário

O jogo contém **40 palavras de 4 letras** com tema de mecânica/oficina:

```
RODA  OLEO  CABO  FURO  VELA  EIXO  CAPO  TUBO  PNEU
JIPE  TACO  LIMA  PINO  VIGA  MOLA  FITA  CAVA  LONA
BOIA  ARCO  CAME  MACA  POTE  TORX  SOCA  VARO  PECA
BOCA  DUTO  GATO  FOLE  BICA  PULA  FAXA  RACA  ...
```

---

## 🐛 Resolução de Problemas

**Câmara não abre:**
- Verifica se o browser tem permissão de câmara
- No Codespaces, usa o URL HTTPS público (não `localhost`)
- Tenta noutro browser (Chrome recomendado)

**MediaPipe não carrega:**
- Verifica a ligação à internet (os modelos são descarregados de CDN)
- Aguarda alguns segundos na primeira carga

**Jogador não é detetado na zona certa:**
- Certifica-te que estás centrado na tua zona vertical
- O nariz (ponto 0 do MediaPipe) determina a tua zona

---

## 🛠️ Tecnologias

- **React 18** + **Vite 5**
- **MediaPipe Pose** — Estimativa de pose corporal em tempo real
- **Tailwind CSS** — Estilização
- **PT-PT** — Dicionário exclusivamente em Português de Portugal
