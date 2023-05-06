const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Player(50, canvas.height / 2, 20, 5);


const obstacles = [];


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createCodeBlocks() {
  const y = randomNumber(0, canvas.height - 20);
  const width = 150;
  const height = 50;
  const speed = 1;

  if (Math.random() < 0.5) {
    obstacles.push(new CodeBlock(canvas.width, y, width, height, speed, 'good'));
  } else {
    obstacles.push(new CodeBlock(canvas.width, y, width, height, speed, 'bad'));
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
  gameLoop();
});

document.getElementById('restartGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  obstacles.length = 0;
  createCodeBlocks();
  gameLoop();
});

function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.update();
    obstacle.draw(ctx);
  }

  player.update();
  player.draw(ctx);
}
