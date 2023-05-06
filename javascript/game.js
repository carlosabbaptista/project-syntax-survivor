const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Player(50, canvas.height / 2, 20, 5);

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
  animate();
});

document.getElementById('restartGameButton').addEventListener('click', function() {
  showScreen('game-screen');
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Need to add the good / bad code actions
  
  player.update();
  player.draw(ctx);
}
