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

Score.prototype.timeBonus = function() {
  // In general: The faster, the more points. 
  // But being really fast brings really a lot of points,
  // the bonus wears out the longer one takes.
  // > 6 seconds: 0
  // > 6 seconds: 0
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
  this.score += 10 + this.timeBonus();
};

Score.prototype.decreaseBecauseOfCollision = function() {
  if (this.score>=30) {
    this.score -= 30;
  } else {
    this.score = 0;
  }
};

var score = new Score();
