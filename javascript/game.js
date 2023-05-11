// game initialization

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isGameRunning = true;
let score = 0;
let lives = 3;
const goodCollisionSound = new Audio('sounds/good-collision.wav');
const badCollisionSound = new Audio('sounds/bad-collision.wav');
badCollisionSound.volume = 1.0;
const gameOverSound = new Audio('sounds/game-over.wav');
const backgroundMusic = new Audio('sounds/background-music-1.wav');
backgroundMusic.volume = 0.25;
const audioOnButton = document.getElementById('audio-on');
const audioOffButton = document.getElementById('audio-off');
const player = new Player(50, canvas.height / 2 - (238 / 4) / 2, 156 / 4, 238 / 4, 5);
const obstacles = [];
let canvasSections = [0, 1, 2, 3, 4];

// function for random number generation

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function for creating the codeBlock obstacles

function createCodeBlocks() {
  const height = 30;
  const speed = 1;
  const numberOfSections = 5;

  const sectionHeight = canvas.height / numberOfSections;

  const randomIndex = Math.floor(Math.random() * canvasSections.length);
  const sectionNumber = canvasSections[randomIndex];
  canvasSections.splice(randomIndex, 1)
  let y = sectionNumber * sectionHeight;

  if (Math.random() < 0.5) {
    obstacles.push(new CodeBlock(canvas.width, y, 0, height, speed, 'good', ctx));
  } else {
    obstacles.push(new CodeBlock(canvas.width, y, 0, height, speed, 'bad', ctx));
  }

  if (canvasSections.length === 0) {
    canvasSections = [0, 1, 2, 3, 4];
  }

  setTimeout(createCodeBlocks, randomNumber(5000, 8000));
}

// function for screen selection

function showScreen(id) {
  const screens = document.querySelectorAll('section');
  screens.forEach(function (screen) {
    if (screen.id === id) {
      screen.style.display = 'block';
    } else {
      screen.style.display = 'none';
    }
  });
}

// making sure start-screen is first screen when game starts

showScreen('start-screen');

// function for collision detection

function detectCollision(player, obstacle) {
  if (
    obstacle.collided === false &&
    obstacle.type === 'good' &&
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    console.log('good collision');
    obstacle.collided = true;
    addScore();
    goodCollisionSound.play();
  }
  else if (
    obstacle.collided === false &&
    obstacle.type === 'bad' &&
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    console.log('bad collision');
    obstacle.collided = true;
    loseLife();
    badCollisionSound.play();
  }
}

// function for adding the player's score

function addScore() {
  score += 10;
  updateScore();
}

// function for making the player lose a life

function loseLife() {
  lives --;
  updateLives();
}

// function displaying score

function updateScore() {
  const displayScore = document.getElementById('displayScore');
  displayScore.textContent = `Score: ${score}`;
}

// function displaying lives

function updateLives() {
  const displayLives = document.getElementById('displayLives');
  displayLives.textContent = `Lives: ${lives}`;
}

// function displaying final score

function displayFinalScore() {
  const finalScore = document.getElementById('finalScore');
  finalScore.textContent = `Score: ${score}`;
}

// event listeners for player movement

window.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      player.dy = -player.speed;
      break;
    case 'ArrowDown':
      player.dy = player.speed;
      break;
  }
});

window.addEventListener('keyup', function(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
      player.dy = 0;
      break;
  }
});

// event listeners for start game button

document.getElementById('startGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  createCodeBlocks();
  isGameRunning = true;
  gameLoop();
});

// event listeners for play agin button

document.getElementById('restartGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  obstacles.length = 0;
  createCodeBlocks();
  isGameRunning = true;
  lives = 3;
  updateLives();
  score = 0;
  updateScore();
  gameLoop();
});

// event listeners for audio on/off buttons

audioOnButton.addEventListener('click', function() {
  badCollisionSound.muted = false;
  goodCollisionSound.muted = false;
  backgroundMusic.muted = false;
  audioOnButton.style.display = 'none';
  audioOffButton.style.display = 'block';
});

audioOffButton.addEventListener('click', function() {
  badCollisionSound.muted = true;
  goodCollisionSound.muted = true;
  backgroundMusic.muted = true;
  audioOffButton.style.display = 'none';
  audioOnButton.style.display = 'block';
});

// game loop function

function gameLoop() {
  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  backgroundMusic.play();

  obstacles.forEach(obstacle => {
    obstacle.update();
    obstacle.draw(ctx);
    detectCollision(player, obstacle);
  });

  if (lives === 0) {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameScreen = document.getElementById('game-screen');
    gameOverScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    isGameRunning = false;
    backgroundMusic.muted = true;
    displayFinalScore();
    gameOverSound.play();
    obstacles.length = 0;
  }
  
  player.update();
  player.draw(ctx);
}