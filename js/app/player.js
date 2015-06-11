// vi: ts=4 sw=4 expandtab

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
    this.moveToStart();
};

// The player can pause/resume the game with a hit on the space key
Player.pause = false;

Player.prototype.update = function(dt) {
    if (this.collidedWithEnemy()) {
        this.moveToStart();
    }
};

// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.col * Tile.width, this.row * Tile.height);
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

Player.prototype.moveToStart = function() {
    this.row = 5; // rows range from 0 (top) to 5 (bottom)
    this.col = 2; // cols range from 0 (left) to 4 (right)
};

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            Player.pause = false;
            if (this.col > 0) {
                this.col--;
            }
            break;

        case 'up':
            Player.pause = false;
            if (this.row > 0) {
                this.row--;
            }
            if (this.row === 0) { // goal reached, game won
                // TODO: Increase score, Display winning message
                this.moveToStart();
            }
            break;

        case 'right':
            Player.pause = false;
            if (this.col < 4) { 
                this.col++; 
            }          
            break;

        case 'down':
            Player.pause = false;
            if (this.row < 5) {
                this.row++;
            }
            break;

        default: /* 'space' */
            Player.pause = !Player.pause;
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
        32:'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
