var Score = function() {
  this.score = 0;
  this.show = false;
};

Score.prototype.update = function() {
  if (player.won) {
      this.increaseForGameWon();
      player.won = false;
      this.show = true;
  }
};

Score.prototype.render = function() {
  if (this.show) {
    Player.pause = true;
    writeLine(ctx,this.score,ctx.canvas.height/2);
    var resetDisplay = function(score) {
      return function() {
        score.show = false;
        Player.pause = false;
      };
    };
    setTimeout(resetDisplay(this),2000);
  }
};

Score.prototype.resetShowScore = function() {
  Player.pause = false;
};

Score.prototype.increaseForGameWon = function() {
  this.score += 10;
};
