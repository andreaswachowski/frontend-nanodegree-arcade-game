// vi: ts=4 sw=4 expandtab

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.moveToStart();
    this.winningTime = 0;
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
            if (player.row < 5) {
                player.row++;
            }
            break;
        case 'left':
            if (this.col > 0) {
                this.col--;
            }
            break;
        case 'right':
            if (player.col < 4) {
                player.col++;
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        191: '?',
        16: 'shift' // needed to explicitly handle '?'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player();

