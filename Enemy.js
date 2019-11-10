var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Enemy() {
  this.x = canvas.width;
  this.y = (Math.random() * canvas.height) / 2 + canvas.height / 2 - unit * 2;
  this.xvel = -1;
  this.yvel = 0;
  this.image = "enemy0";
  this.height = Math.random() > 0.5 ? unit * 2 : unit * 3;
  this.width = this.height == unit * 2 ? unit * 2 : unit * 3;
  this.health = this.height == unit * 2 ? 1 : 2;
  this.cycle = true;
  this.cyclefwd = 0;
  this.cycleback = 0;
  this.loss_check = function() {
    if (this.x + this.width / 2 < 0) {
      game_over = true;
    }
    // console.log(game_over)
  };
}
