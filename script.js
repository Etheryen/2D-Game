let screen = document.getElementById('screen');
let counter = document.getElementById('czas');
let container = document.getElementsByClassName('container');
let high = document.getElementById('highscore');
let restart = document.getElementById('restart');

let gameStart = false;
let gameEnd = false;
var highscore = 0;

const bg = '-';
const pl = '#';
const pt = '*';

getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var sekundy = 0;
var score = 0;

const gridY = 9;
const gridX = 21;

var y = Math.floor((gridY-1)/2);
var x = Math.floor((gridX-1)/2);
var newX = x;
var newY = y;

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

start = () => {
  high.innerHTML = '';
  restart.innerHTML = '';
  sekundy = 15;
  score = 0;

  y = Math.floor((gridY-1)/2);
  x = Math.floor((gridX-1)/2);
  newX = x;
  newY = y;

  matrix = [];
  grid = '';
  for(let i = 0; i < gridY; i++) {
    matrix.push([]);
    for(let j = 0; j < gridX; j++) {
      matrix[i].push([bg]);
    }
  }
  matrix[y][x] = pl;
  
  pointY = y;
  pointX = x;

  while (pointY == newY && pointX == newX) {
    pointY = getRandomInt(0, gridY-1);
    pointX = getRandomInt(0, gridX-1);
    matrix[pointY][pointX] = pt;
  }
  
  gameStart = true;
  gameEnd = false;
  console.log('test');
  frame();
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
  grid +=(`Score: ${score} pts`)
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
  if(gameStart == false) {
    if(event.key == ' ') {
      start();
      var czas = setInterval(() => {
        if(sekundy <= 0.01) {
          gameEnd = true;
          gameStart = false;
          if(score > highscore) {
            highscore = score;
          }
          screen.innerHTML = `GAME OVER<br>Score: ${score} pts<br>`;
          high.innerHTML = `Highscore: ${highscore} pts`
          restart.innerHTML = '<br>Press SPACE to restart'
          counter.innerHTML = '';
          this.clearInterval(czas);
          return;
        }
        counter.innerHTML = `Time: ${sekundy}s`
        sekundy = parseFloat(sekundy) - 0.01;
        sekundy = (Math.round(sekundy * 100) / 100).toFixed(2);
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
  }
});

//Spawn multiple stars
//R to restart mid-game