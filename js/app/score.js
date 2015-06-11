var Score = function() {
  this.score = 0; // total score in the game
  this.delta = 0; // change in score when winning/losing
  this.show = false; // true when the score shall be displayed
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
    var fillStyle = (this.delta < 0) ? "red" : "lightgreen";
    var deltaPrefix = (this.delta < 0) ? "" : "+";
    writeLine(ctx,deltaPrefix+this.delta,ctx.canvas.height/2-60, 36, fillStyle);
    writeLine(ctx,this.score,ctx.canvas.height/2, 48);
    // TODO: Can I somehow reuse this functionality
    var hide = function(score) {
      return function() {
        score.show = false;
        Player.pause = false;
        delete score.timeoutID;
      };
    };
    if (this.timeoutID === undefined) {
      this.timeoutID = setTimeout(hide(this),750);
      // console.log("timeout set: " + this.timeoutID);
    }
  }
};

Score.prototype.resetShowScore = function() {
  Player.pause = false;
};

Score.prototype.timeBonus = function() {
  var bonus=0;
  switch (Math.round(player.winningTime)) {
    case 0: bonus = 50; break;
    case 1: bonus = 30; break;
    case 2: bonus = 20; break;
    case 3: bonus = 15; break;
    case 2: bonus = 10; break;
    default: bonus = 0;
  }
  return bonus;
};

Score.prototype.increaseForGameWon = function() {
  this.delta = 10 + this.timeBonus();
  this.score += this.delta;
};

Score.prototype.decreaseBecauseOfCollision = function() {
  this.delta = -30;
  if (this.score>=30) {
    this.score += this.delta;
  } else {
    this.score = 0;
  }
};

var score = new Score();
