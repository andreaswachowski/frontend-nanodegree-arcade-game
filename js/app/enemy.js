// vi: ts=4 sw=4 expandtab

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
    this.y = this.aRandomStoneRow();
};

Enemy.prototype.aRandomStoneRow = function() {
    return getRandomInt(1,4)*Tile.height-20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!Player.pause) {
        this.x = this.x+this.speed*dt;
        if (this.x > ctx.canvas.width) {
            this.moveToStart();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
