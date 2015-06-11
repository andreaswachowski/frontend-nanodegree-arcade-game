var Timer = function() {
  this.duration = 0;
};

Timer.prototype.reset = function() {
  this.duration = 0;
};

Timer.prototype.update = function(dt) {
  if (!Player.pause) {
      this.duration += dt;
  }
};

Timer.prototype.render = function() {
  ctx.font = "14pt Impact";
  ctx.textAlign = "right";

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  var text = this.duration.toFixed(1);
  ctx.fillText(text, ctx.canvas.width-20, 80);
  ctx.strokeText(text, ctx.canvas.width-20, 80);
};

var timer = new Timer();
