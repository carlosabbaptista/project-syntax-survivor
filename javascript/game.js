// game initialization

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isGameRunning = true;
let score = 0;
let lives = 3;

const player = new Player(50, canvas.height / 2 - (238 / 4) / 2, 156 / 4, 238 / 4, 5);

const obstacles = [];

// function for random number generation

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function for creating the codeBlock obstacles

function createCodeBlocks() {
  const y = randomNumber(0, canvas.height - 20);
  const width = 300;
  const height = 30;
  const speed = 1;

  if (Math.random() < 0.5) {
    obstacles.push(new CodeBlock(canvas.width, y, width, height, speed, 'good', ctx));
  } else {
    obstacles.push(new CodeBlock(canvas.width, y, width, height, speed, 'bad', ctx));
  }

  setTimeout(createCodeBlocks, randomNumber(3000, 8000));
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

// game loop function

function gameLoop() {
  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    displayFinalScore();
  }
  
  player.update();
  player.draw(ctx);
}