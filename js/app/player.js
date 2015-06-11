// vi: ts=4 sw=4 expandtab

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
    this.moveToStart();
    this.won = false;
    this.collided = false;
    this.winningTime = 0;
};

// The player can pause/resume the game with a hit on the space key
Player.pause = false;

Player.prototype.update = function(dt) {
    this.collided = this.collidedWithEnemy();
    if (this.collided) {
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
    timer.reset();
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode !== undefined && keyCode != 'space' && keyCode != '?') {
        Player.pause = false;
    }

    if (keyCode !== undefined && keyCode != '?') {
        helpScreen.hide();
    }

    // When the user presses a key while a score is shown
    // the score's timeout has to be cleared
    if (typeof score.timeoutID == "number") {
        score.show = false;
        window.clearTimeout(score.timeoutID);
        delete score.timeoutID;
    }

    switch (keyCode) {
        case 'left':
            if (this.col > 0) {
                this.col--;
            }
            break;

        case 'up':
            if (this.row > 0) {
                this.row--;
            }
            if (this.row === 0) { // goal reached, game won
                this.winningTime = timer.duration;
                this.won = true;
                this.moveToStart();
            }
            break;

        case 'right':
            if (this.col < 4) { 
                this.col++; 
            }          
            break;

        case 'down':
            if (this.row < 5) {
                this.row++;
            }
            break;

        case 'space':
            Player.pause = !Player.pause;
            break;

        case '?':
            Player.pause = true;
            helpScreen.show();
            break;

        default: // Nothing to do in other cases
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    console.log(e.keyCode);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        191: '?'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player();

