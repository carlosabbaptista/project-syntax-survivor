let goodCodeImage = new Image();
goodCodeImage.src = 'images/good.png';

let badCodeImage = new Image();
badCodeImage.src = 'images/bad.png';

class CodeBlock {
  constructor() {
		this.goodImagesArray = []
		this.badImagesArray = []
  }

  for (let i = 0; i < this.maxGoodImages; i++) {
    this.goodImagesArray.push(`images/good_code${i}.png`)
  }

  update() {

  }

  draw(ctx) {
    ctx.drawImage();
  }
}


