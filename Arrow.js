var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Arrow() {
  this.x = characters[0].x + characters[0].width;
  this.y = characters[0].y + characters[0].height / 3;
  this.xvel = 16;
  this.yvel = -4;
}
