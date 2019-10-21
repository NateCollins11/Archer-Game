var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var test = document.getElementById("player0");
console.log(test);
var unit = width / 20;
var keys = [];
var cycle = 0;
var characters = [
  (player = {
    image: "player0",
    y: height - unit * 3,
    x: unit * 6,
    height: unit * 2,
    width: unit * 2,
    yvel: 0,
    xvel: 0
  })
];
var projectiles = [];
function reDrawCanvas() {
  c.fillStyle = "grey";
  c.fillRect(0, 0, width, height / 2);
  c.fillStyle = "lightGrey";
  c.fillRect(0, height / 2, width, height / 2);
  for (i = 0; i < characters.length; i++) {
    var image = document.getElementById(characters[i].image);
    console.log(image);
    c.drawImage(
      image,
      characters[i].x,
      characters[i].y,
      characters[i].width,
      characters[i].height
    );
  }
}

function updateGame() {
  if (characters[0].xvel != 0 || characters[0].yvel != 0) {
    if (cycle < 12) {
      cycle = cycle + 1;
    } else {
      cycle = 0;
    }
  } else {
    cycle = 0;
  }
  if (keys[38] == true && characters[0].y > canvas.height / 2) {
    characters[0].yvel = -2;
  } else if (
    keys[40] == true &&
    characters[0].y < canvas.height - characters[0].height
  ) {
    characters[0].yvel = 2;
  } else {
    characters[0].yvel = 0;
  }
  if (keys[37] == true && characters[0].x > 0) {
    characters[0].xvel = -2;
  } else if (
    keys[39] == true &&
    characters[0].x < canvas.width - characters[0].width
  ) {
    characters[0].xvel = 2;
  } else {
    characters[0].xvel = 0;
  }
  for (i = 0; i < characters.length; i++) {
    characters[i].x = characters[i].x + characters[i].xvel;
    characters[i].y = characters[i].y + characters[i].yvel;
    characters[i].image = "player" + String(cycle);
    console.log();
  }
  reDrawCanvas();
  window.requestAnimationFrame(updateGame);
}

// reDrawCanvas()

updateGame();

document.body.addEventListener("keydown", function(e) {
  console.log(e.keyCode);
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});
