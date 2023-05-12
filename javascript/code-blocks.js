class CodeBlock {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.collided = false;

    let codeSamples;
    if (this.type === 'good') {
      codeSamples = goodCode;
    } else {
      codeSamples = badCode;
    }
    this.text = codeSamples[Math.floor(Math.random() * codeSamples.length)];
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    if (this.collided) {
      if (this.type === 'good') {
        ctx.fillStyle = 'green';
      } else {
        ctx.fillStyle = 'red';
      }
    } else {
      ctx.fillStyle = 'grey';
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'white';
    ctx.font = '16px Courier Prime';
    ctx.fillText(this.text, this.x + 10, this.y + 20);
    const textWidth = ctx.measureText(this.text).width;
    this.width = textWidth + 20;
  }
}


const goodCode = [
  // HTML [0 - 4]
  '<h1>Extra!</h1>',
  '<img src="image.jpg" alt="Description">',
  '<strong>Bold</strong>',
  '<input type="checkbox" id="checkbox">',
  '<a href="www.cnn.uk">Link</a>',
  // CSS [5 - 9]
  'color: red;',
  'background-color: gray;',
  'font-size: 24px;',
  'text-align: center;',
  'border: 1px solid black;',
  // JavaScript [10 - 14]
  'const name = "John";',
  'let array = [1, 2, 3];',
  'console.log(`The cost is ${num}`);',
  'let myAge = 30;',
  'if (age >= 18){console.log("You are an adult.")};'
];

const badCode = [
  // HTML [0 - 4]
  '<a herf="www.cnn.uk">Link</a>',
  '<button>Click me</buttom>',
  '<text arearows="4" areacols="50"></textarea>',
  '<img scr="image.jpg" alt="Description">',
  '<ul><li>item<li></ul>',
  // CSS [5 - 9]
  'color: redish',
  'padding: 10',
  'fomt-size: 14px',
  'display: nonepx',
  'padding: 10px 5px 15',
  // JavaScript [10 - 14]
  'Const userName',
  'console.log("The cost is ${num}")',
  'let lastName = Doe',
  'const person = ["name": "John", "age": 30]',
  'let char = Ironman"'
];

