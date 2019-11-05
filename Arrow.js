var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Arrow(xvel, yvel) {
  this.index = arrows.length;
  this.x = player.x + player.width / 2;
  this.y = player.y + player.height / 2.3;
  this.xvel = xvel;
  this.yvel = yvel;
  this.doesitbounce = false;
  this.floor = player.y + player.height * 0.66;
  this.grav_constant = 0.3;
  this.bounce_constant = -0;
  this.total_vel = player.total_vel;
  this.tip_color = "rgb(0, 0, 0)";
  this.is_active = true;
  this.draw = function() {
    // c.beginPath();
    // c.fillStyle = "rgb(175, 124, 13)";
    // c.arc(arrows[i].x, arrows[i].y, 20, 0, 2 * Math.PI);
    // c.fill();
    // c.stroke();
    c.fillStyle = "rgb(140, 100, 13)";
    c.fillRect(this.x, this.y, unit, unit / 12);
    c.fillStyle = this.tip_color;
    c.fillRect(this.x + unit, this.y, unit / 12, unit / 12);
    c.fillRect(
      this.x + (unit * 13) / 12,
      this.y + unit / 48,
      unit / 12,
      unit / 24
    );
  };
  // console.log(this.xvel)
  // console.log(this.yvel)
  this.detect_collision = function() {
    if (this.x > 920 || this.x < -50) {
      arrows.splice(i, 1);
      console.log("Arrow went to long");
    } else {
      for (m = 0; m < enemies.length; m++) {
        var e = enemies[m];

        if (this.is_active == true) {
          if (
            e.is_statue == false &&
            this.x + (unit * 7) / 6 >= e.x + unit &&
            this.x + (unit * 7) / 6 <= e.x + e.width &&
            this.y + unit / 12 >= e.y &&
            this.y + unit / 12 <= e.y + e.height / 4
          ) {
            enemies.splice(m, 1);
            this.xvel = 0;
            this.yvel = 0;
            this.tip_color = "rgb(140, 50, 30)";
            this.is_active = false;
            this.doesitbounce = true;
            score++;
          } else if (
            this.x + (unit * 7) / 6 >= e.x + unit &&
            this.x + (unit * 7) / 6 <= e.x + e.width &&
            this.y + unit / 12 >= e.y &&
            this.y + unit / 12 <= e.y + e.height
          ) {
            if (enemies[m].is_statue == false) {
              enemies[m].is_statue = true;
              enemies[m].image = "statue";
              enemies[m].xvel = 0;
              score++;
              console.log(score);
            }
            //arrows.splice(this.index, 1);
            this.xvel = 0;
            this.grav_constant = 0;
            this.yvel = 0;
            this.tip_color = "rgb(140, 50, 30)";
            this.is_active = false;
          }
        }
      }
    }
  };
}
