
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var unit = width / 20;
var keys = [];
var cycle = 0;
var arrows = [];
var characters = [
  (player = {
    image: "player0",
    y: height - unit * 3,
    x: unit * 6,
    height: unit * 2,
    width: unit * 2,
    yvel: 0,
    xvel: 0,
    health: 10
  }),
  (enemy1 = {
      image: "player0",
      y: height - unit * (Math.random() * 4 + 1.1),
      x: width - unit * 2,
      height: unit * 2,
      width: unit * 2,
      yvel: 0,
      xvel: 0
  }),
//   ({}),
//   ({}),
//   (enemy2 = {
//     image: "player1",
//     y: height - unit * Math.floor(Math.random() * Math.floor(6)),
//     x: width - unit * 2,
//     height: unit * 2,
//     width: unit * 2,
//     yvel: 0,
//     xvel: 0
//   })
];
function reDrawCanvas() {
  c.fillStyle = "grey";
  c.fillRect(0, 0, width, height / 2);
  c.fillStyle = "lightGrey";
  c.fillRect(0, height / 2, width, height / 2);
  for (i = 0; i < characters.length; i++) {
    var image = document.getElementById(characters[i].image);
    c.drawImage(
      image,
      characters[i].x,
      characters[i].y,
      characters[i].width,
      characters[i].height
    );
  }
  for (i = 0; i < arrows.length; i++) {
    c.fillStyle = "black";
    c.fillRect(arrows[i].x, arrows[i].y, unit, unit / 8);
  }
}

function updateGame() {
  console.log(characters[1].x)  
  if (characters[1].x < 0){
    console.log('redrawing')
    var image = document.getElementById(characters[1].image);  
    c.drawImage(
        image,
        700,
        300,
        characters[1].width,
        characters[1].height
      ); 
  }
  if (characters[0].health == 0) {
      c.fillStyle = 'lightGrey';
      c.fillRect(characters[0].x + characters[0].x/2, characters[0].y + characters[0].y/2, characters[0].x - characters[0].x/2, characters[0].y - characters[0].y/2)
  }
  if (characters[0].xvel != 0 || characters[0].yvel != 0) {
    if (cycle < 12) {
      cycle = cycle + 1;
    } else {
      cycle = 0;
    }
  } else {
    cycle = 0;
  }
  if (
    keys[38] == true &&
    keys[40] != true &&
    characters[0].y > canvas.height / 2
  ) {
    characters[0].yvel = -2;
  } else if (
    keys[40] == true &&
    keys[38] != true &&
    characters[0].y < canvas.height - characters[0].height
  ) {
    characters[0].yvel = 2;
  } else {
    characters[0].yvel = 0;
  }
  if (keys[37] == true && keys[39] != true && characters[0].x > 0) {
    characters[0].xvel = -3;
  } else if (
    keys[39] == true &&
    keys[37] != true &&
    characters[0].x < canvas.width - characters[0].width
  ) {
    characters[0].xvel = 3;
  } else {
    characters[0].xvel = 0;
  }
  if (characters[1].x > - 100) {
      characters[1].xvel = -3;
  }
  else {
      characters[1].xvel = 0;
  }
  if (characters[1].x == characters[0].x && (characters[1].y + characters[1].height >= characters[0].y 
    || characters[0].y - characters[1].height <= characters[0].y)) {
        characters[0].health -= 1;
        console.log(characters[0].health)
    }
  for (i = 0; i < characters.length; i++) {
    characters[i].x = characters[i].x + characters[i].xvel;
    characters[i].y = characters[i].y + characters[i].yvel;
    characters[i].image = "player" + String(cycle);
  }
  for (i = 0; i < arrows.length; i++) {
    arrows[i].x = arrows[i].x + arrows[i].xvel;
    arrows[i].y = arrows[i].y + arrows[i].yvel;
    arrows[i].yvel = arrows[i].yvel + 0.2;
    if (arrows[i].x > 920) {
      arrows.splice(i, 1);
      console.log("Arrow went to long");
    }
  }
  reDrawCanvas();
  window.requestAnimationFrame(updateGame);
}

// reDrawCanvas()

updateGame();

document.body.addEventListener("keydown", function(e) {
  if (e.keyCode == 70) {
    arrows[arrows.length] = new Arrow();
  } else {
    keys[e.keyCode] = true;
  }
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});
