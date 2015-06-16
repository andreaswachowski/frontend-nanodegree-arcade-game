// vi: ts=4 sw=4 expandtab

var Tile = require('./tile.js');

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.moveToStart();
    this.winningTime = undefined;
};

Player.prototype.collidedWithEnemy = function() {
    var collided = false;
    var numEnemies = allEnemies.length;
    for (var i=0; i<numEnemies; i++) {
        var enemy=allEnemies[i];
        if ((Math.round(enemy.x/Tile.width) === this.col) &&
            (Math.round(enemy.y/Tile.height) === this.row)) {
            collided = true;
            break;
        }
    }
    return collided;
};

Player.prototype.update = function(dt) {
    var self=this;
    engine.state.update(self);
};

Player.prototype.hasReachedGoal = function(dt) {
    return (this.row === 0);
};

Player.prototype.move = function(direction) {
    switch (direction) {
        case 'up':
            if (this.row > 0) {
                this.row--;
            }
            break;
        case 'down':
            if (this.row < 5) {
                this.row++;
            }
            break;
        case 'left':
            if (this.col > 0) {
                this.col--;
            }
            break;
        case 'right':
            if (this.col < 4) {
                this.col++;
            }
            break;
        default:
            console.log('Warning: Ignoring unknown direction ' + direction + ' in Player.move');
            break;
    }
};

// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.col * Tile.width, this.row * Tile.height);
};

Player.prototype.moveToStart = function() {
    this.row = 5; // rows range from 0 (top) to 5 (bottom)
    this.col = 2; // cols range from 0 (left) to 4 (right)
    timer.reset();
};

Player.prototype.handleInput = function(keyCode) {
    var self = this;
    engine.state.handleInput(self,keyCode);

    // When the user presses a key while a score is shown
    // the score's timeout has to be cleared
    if (typeof score.timeoutID == "number") {
        score.isShowing = false;
        window.clearTimeout(score.timeoutID);
        delete score.timeoutID;
    }
};

module.exports = Player;
