var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var unit = width / 20;
var keys = [];
var cycle = 0;
var game_over = false;
var bow_state = "a";
var arrow_delay_counter = 0;
var spawning = true;
var score = 0;
var obstacles = [];
var arrows = [];
var enemies = [];
var arrowxvel = 0;
var arrowyvel = 0;
var shot_force = 0;
var player = {
      image: "player0",
      y: height - unit * 3,
      x: unit * 6,
      height: unit * 2,
      width: unit * 2,
      yvel: 0,
      xvel: 0,
      total_vel: 24
    }
function reDrawCanvas() {
  c.fillStyle = "grey";
  c.fillRect(0, 0, width, height / 2);
  c.fillStyle = "lightGrey";
  c.fillRect(0, height / 2, width, height / 2);
  c.font = "40px Arial";
  c.fillText("Score: " + String(score), unit * 2, unit * 2);
  if (game_over == true) {
    c.fillText("Game Over", (width * 2) / 5, height / 8);
  }
  var image = document.getElementById(player.image);
  c.drawImage(
    image,
    player.x,
    player.y,
    player.width,
    player.height
  );
  c.strokeRect(
    player.x + player.width/2.4,
    player.y - player.height/2,
    unit * 0.3,
    unit
  )
  c.fillStyle = "black"
  c.fillRect(
    player.x + player.width/2.4,
    player.y,
    unit * 0.3,
    shot_force
  )
  for (i = 0; i < arrows.length; i++) {
    arrows[i].draw();
  }
  for (i = 0; i < enemies.length; i++) {
    var image = document.getElementById(enemies[i].image);
    c.drawImage(
      image,
      enemies[i].x,
      enemies[i].y,
      enemies[i].width,
      enemies[i].height
    );
  }
}

function updateGame() {
  if (arrow_delay_counter > 0) {
    arrow_delay_counter = arrow_delay_counter - 1;
  } else {
    bow_state = "a";
  }
  if (spawning == true) {
    if (Math.random() > 0.992) {
      enemies[enemies.length] = new Enemy();
    }
  }
  if (player.xvel != 0 || player.yvel != 0) {
    if (cycle < 3) {
      cycle = cycle + 1;
    } else {
      cycle = 0;
    }
  } else {
    cycle = 0;
  }
  if (
    keys[87] == true &&
    keys[83] != true &&
    player.y > canvas.height / 2
  ) {
    player.yvel = -2;
  } else if (
    keys[83] == true &&
    keys[87] != true &&
    player.y < canvas.height - player.height
  ) {
    player.yvel = 2;
  } else {
    player.yvel = 0;
  }
  if (keys[65] == true && keys[68] != true && player.x > 0) {
    player.xvel = -3;
  } else if (
    keys[68] == true &&
    keys[65] != true &&
    player.x < canvas.width - player.width
  ) {
    player.xvel = 3;
  } else {
    player.xvel = 0;
  }
    player.x = player.x + player.xvel;
    player.y = player.y + player.yvel;
    player.image = "player" + String(cycle) + bow_state;
  for (i = 0; i < enemies.length; i++) {
    enemies[i].x = enemies[i].x + enemies[i].xvel;
    enemies[i].y = enemies[i].y + enemies[i].yvel;
    enemies[i].loss_check(); //+ String(cycle);
  }
  for (i = 0; i < arrows.length; i++) {
    if (arrows[i].doesitbounce == true)
      if (arrows[i].y >= arrows[i].floor) {
        arrows[i].yvel = arrows[i].yvel * arrows[i].bounce_constant;
        arrows[i].y = arrows[i].y + arrows[i].yvel;
      }
    arrows[i].x = arrows[i].x + arrows[i].xvel;
    arrows[i].y = arrows[i].y + arrows[i].yvel;
    arrows[i].yvel = arrows[i].yvel + arrows[i].grav_constant;
    arrows[i].detect_collision();
    try {
        if (arrows[i].stuck_in_enemy == true) {
            arrows[i].x = arrows[i].x + arrows[i].xvel;
        }
    } catch {
        console.log('arrow has been deleted')
    };
  }
  reDrawCanvas();
  if (game_over == false) {
    window.requestAnimationFrame(updateGame);
  }
}

updateGame();

// reDrawCanvas();

document.body.addEventListener("keydown", function(e) {
  if (e.keyCode == 70 && arrowxvel <= 30 && arrowyvel >= -9) {
    arrowxvel += 3;
    arrowyvel -= 0.85;
    shot_force -= 3;
  } if (e.keyCode == 66) {
    // console.log("order 66");
    if (spawning == true) {
      spawning = false;
    } else {
      spawning = true;
    }
  } else {
    keys[e.keyCode] = true;
  }
});  
document.body.addEventListener("keyup", function(e) {
if (e.keyCode == 70 && arrow_delay_counter == 0) {
      arrows[arrows.length] = new Arrow(arrowxvel, arrowyvel);
      bow_state = "b";
      arrow_delay_counter = 16;
      arrowyvel = 0;
      arrowxvel = 0;
      shot_force = 0;
  }
  keys[e.keyCode] = false; 
});

document.body.addEventListener("mousedown", function(e) {
  if (arrow_delay_counter == 0) {
    let rect = canvas.getBoundingClientRect();

    bow_state = "b";
    arrow_delay_counter = 16;
    var x_of_click = e.clientX - rect.left;

    var y_of_click = e.clientY - rect.top;
    //console.log("Coordinate x: " + x_of_click, "Coordinate y: " + y_of_click);
    arrows[arrows.length] = new Arrow();
    var arrow = arrows[arrows.length - 1];
    xdist = Math.abs(x_of_click - player.x + player.width / 3);
    // console.log(xdist);
    ydist = Math.abs(player.y - y_of_click - player.height / 2);
    // console.log(ydist);
    var x_to_y_ratio = ydist / (xdist + ydist);
    arrow.yvel =
      (-(arrow.total_vel * x_to_y_ratio) *
        (player.y + 43 - y_of_click)) /
      Math.abs(player.y + 43 - y_of_click);
    arrow.xvel =
      ((arrow.total_vel - Math.abs(arrow.yvel)) *
        Math.abs(x_of_click - player.x + 24)) /
      (x_of_click - player.x + 24);

    //
    //
  }
});
