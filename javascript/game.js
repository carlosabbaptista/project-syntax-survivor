const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isGameRunning = true;

const player = new Player(50, canvas.height / 2 - (238 / 4) / 2, 156 / 4, 238 / 4, 5);

const obstacles = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

showScreen('start-screen');


function detectCollision(player, obstacle) {
  if (
    obstacle.type === 'good' &&
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    console.log('good collision');
  }
  else if (
    obstacle.type === 'bad' &&
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameScreen = document.getElementById('game-screen')
    gameOverScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    isGameRunning = false;
    console.log('bad collision');
  }
}


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

document.getElementById('startGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  createCodeBlocks();
  isGameRunning = true;
  gameLoop();
});

document.getElementById('restartGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  obstacles.length = 0;
  createCodeBlocks();
  isGameRunning = true;
  gameLoop();
});

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
  
  player.update();
  player.draw(ctx);
}

