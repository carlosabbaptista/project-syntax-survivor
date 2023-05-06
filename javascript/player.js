class Player {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.dy = 0;
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
      this.dy = 0;
    }

    this.y += this.dy;
  }

  draw(ctx) {
    ctx.drawImage(playerImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

let playerImage = new Image();
playerImage.src = 'images/player-image.png';
