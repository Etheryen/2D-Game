let screen = document.getElementById('screen');
let licznik = document.getElementById('czas');

let gameStart = false;
let gameEnd = false;

const bg = '-';
const pl = '#';
const pt = '*';

var sekundy = 0;
var score = 0;

const gridY = 9;
const gridX = 21;

var y = Math.floor((gridY-1)/2);
var x = Math.floor((gridX-1)/2);
var newX = x;
var newY = y;

getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var matrix = [];
var grid = '';
for(let i = 0; i < gridY; i++) {
  matrix.push([]);
  for(let j = 0; j < gridX; j++) {
    matrix[i].push([bg]);
  }
}

matrix[y][x] = pl;

var pointY = y;
var pointX = x;

while (pointY == newY && pointX == newX) {
  pointY = getRandomInt(0, gridY-1);
  pointX = getRandomInt(0, gridX-1);
  matrix[pointY][pointX] = pt;
}

borderCheck = () => {
  if(y < 0) {
    y = gridY - 1;
    newY = y;
  }
  if(x < 0) {
    x = gridX - 1;
    newX = x;
  }
  if(y > gridY - 1) {
    y = 0;
    newY = y;
  }
  if(x > gridX - 1) {
    x = 0;
    newX = x;
  }
}

update = () => {
  matrix[y][x] = bg;
  y = newY;
  x = newX;
  borderCheck(matrix);
  matrix[y][x] = pl;
}

write = () => {
  grid += ('Movement: WASD<br>');
  for (let i = 0; i < gridY; i++) {
    for (let j = 0; j < gridX; j++) {
      grid += matrix[i][j];
    }
    grid += '<br>';
  }
  grid +=(`Score = ${score} pts`)
  screen.innerHTML = grid;
}

pointUpdate = () => {
  if (pointY == newY && pointX == newX) {
    score += 1;
    while (pointY == newY && pointX == newX) {
      pointY = getRandomInt(0, gridY-1);
      pointX = getRandomInt(0, gridX-1);
      matrix[pointY][pointX] = pt;
    }
  }
}

frame = () => {
  update();
  pointUpdate();
  write();
  grid = '';
}


window.addEventListener("keydown", function (event) {
  if(gameStart == false && gameEnd == false) {
    if(event.key == ' ') {
      gameStart = true;
      frame();
      var czas = setInterval(() => {
        licznik.innerHTML = `Time: ${sekundy}s`
        console.log(sekundy);
        sekundy = parseFloat(sekundy) + 0.01;
        sekundy = (Math.round(sekundy * 100) / 100).toFixed(2);
        console.log(sekundy);
      }, 10);
    }
  }
  if(gameStart == true && gameEnd == false) {
    switch (event.key) {
      case 'd':
        newX += 1;
        frame();
        break;
      case 's':
        newY += 1
        frame()
        break;
      case 'a':
        newX -= 1
        frame()
        break;
      case 'w':
        newY -= 1
        frame()
        break;
      default:
        return;
    }
    if(sekundy > 10) {
      gameEnd = true;
    }
  }
});




//Spawn multiple stars