// vi: ts=4 sw=4 expandtab

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
// TODO: Make the numRows and numCols from Engine.render() available
// to allow dynamic positioning when the game size changes.
    this.moveToStart();
    this.winningTime = 0;
};

Player.prototype.update = function(dt) {
    if (this.collidedWithEnemy()) {
        engine.state = GameState.LOSING;
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
    switch (engine.state) {
        case GameState.PLAYING:
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
                    engine.state = GameState.WINNING;
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
                    engine.togglePaused();
                break;

                case '?':
                    helpScreen.show();
                break;

                default: // Nothing to do in other cases
            }
            break;
        case GameState.WINNING:
            break;
        case GameState.LOSING:
            break;
        case GameState.PAUSING:
            // In general, it shall be possible to resume the game with any
            // key, not only one of the allowedKeys. Therefore
            // engine.togglePaused() is called almost unconditionally. The
            // one exception that must be made in this implementation,
            // where we treat the help screen display as a special pause
            // mode, is the 'shift' key:

            if (helpScreen.isShowing) {
                if (keyCode != 'shift') {
                    helpScreen.hide();
                    engine.togglePaused();
                }
                // else don't do anything. Rationale: To type '?', one has
                // to type 'shift + /'. Afterwards, one releases first '/' and
                // then 'shift'. This second key release must not trigger
                // the disappearance of the help screen, otherwise it would
                // just be displayed for a split-second - or as long as the
                // user keeps holding down the shift-key.
            } else {
                engine.togglePaused();
            }
            break;
    }

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

