// vi: ts=4 sw=4 expandtab

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

function Tile() {
}

Tile.height = 83;
Tile.Width = 101;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setSpeed();
    this.moveToStart();
};

Enemy.prototype.setSpeed = function() {
    this.speed = 100+getRandomInt(0,200);
};

Enemy.prototype.moveToStart = function() {
    this.x = -100;
    this.y = getRandomInt(1,4)*Tile.height;
};

Enemy.prototype.placeOnRandomStoneRow = function() {
    this.y = getRandomInt(1,4)*Tile.height;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+this.speed*dt;
    if (this.x > ctx.canvas.width) {
        this.moveToStart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
    this.moveToStart();
};

Player.prototype.update = function(dt) {
};

// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.col * Tile.Width, this.row * Tile.height);
};

Player.prototype.moveToStart = function() {
    this.row = 5; // rows range from 0 (top) to 5 (bottom)
    this.col = 2; // cols range from 0 (left) to 4 (right)
};

Player.prototype.handleInput = function(keyCode) {
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
                // TODO: Increase score, Display winning message
                this.moveToStart();
            }
            break;

        case 'right':
            if (this.col < 4) { 
                this.col++; 
            }          
            break;

        default: /* 'down' */
            if (this.row < 5) {
                this.row++;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy() ];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
