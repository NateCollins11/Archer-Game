var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Enemy() {
  this.x = canvas.width;
  this.y = (Math.random() * canvas.height) / 2 + canvas.height / 2 - unit * 2;
  this.xvel = -1.5;
  this.yvel = 0;
  this.image = "enemy";
  this.height = Math.random() > 0.5 ? unit * 2 : unit * 3;
  this.width = this.height == unit * 2 ? unit * 2 : unit * 3;
  this.is_statue = false;
  this.loss_check = function() {
    if (this.x + this.width / 2 < 0) {
      game_over = true;
    }
  };
}
