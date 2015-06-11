var Score = function() {
  this.score = 0;
  this.show = false;
};

Score.prototype.update = function() {
  if (player.won) {
      this.increaseForGameWon();
      player.won = false;
      this.show = true;
  } else if (player.collided) {
      this.decreaseBecauseOfCollision();
      player.collided = false;
      this.show = true;
  }
};

Score.prototype.render = function() {
  if (this.show) {
    Player.pause = true;
    writeLine(ctx,this.score,ctx.canvas.height/2);
    // TODO: Can I somehow reuse this functionality
    var hide = function(score) {
      return function() {
        score.show = false;
        Player.pause = false;
        delete score.timeoutID;
      };
    };
    if (this.timeoutID === undefined) {
      this.timeoutID = setTimeout(hide(this),2000);
      // console.log("timeout set: " + this.timeoutID);
    }
  }
};

Score.prototype.resetShowScore = function() {
  Player.pause = false;
};

Score.prototype.increaseForGameWon = function() {
  this.score += 10;
};

Score.prototype.decreaseBecauseOfCollision = function() {
  if (this.score>=30) {
    this.score -= 30;
  } else {
    this.score = 0;
  }
};
