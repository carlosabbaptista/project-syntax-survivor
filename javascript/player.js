let playerImage = new Image();
playerImage.src = 'images/player-image.png';

class Player {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.dy = 0;
  }

  update() {
    if (this.y + this.height + this.dy > canvas.height || this.y + this.dy < 0) {
      this.dy = 0;
    }
    else {
      this.y += this.dy;
    }
  }
  
  draw(ctx) {
    ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
  }

}