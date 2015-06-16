// For the state pattern, I drew a lot from
// http://gameprogrammingpatterns.com/state.html

var State = function() {
};

// See end of file for assignment of the State properties

var PlayingState = function() {
};

PlayingState.prototype.handleInput = function(player,keyCode) {
    switch (keyCode) {
        case 'left':
        case 'right':
        case 'down':
            player.move(keyCode);
            // no change in state
        break;

        case 'up':
            player.move('up');
            if (player.hasReachedGoal()) {
                engine.state = State.winning;
            }
            break;

        case 'space':
            engine.state = State.pausing;
        break;

        case '?':
            helpScreen.show();
        break;

        default: // Nothing to do in other cases
    }
};

PlayingState.prototype.update = function(player) {
    if (player.collidedWithEnemy()) {
        engine.state = State.losing;
    }
};

// ------------------------------------------------------------------------
var WinningState = function() {
};

WinningState.prototype.handleInput = function(player,keyCode) {
    // Nothing to be done.
};

WinningState.prototype.update = function(player) {
    player.winningTime = timer.duration;
    player.moveToStart();
    engine.state = State.playing;
};

// ------------------------------------------------------------------------
var CollidingState = function() {
};

CollidingState.prototype.handleInput = function(player,keyCode) {
    // Nothing to be done.
};

CollidingState.prototype.update = function(player) {
    player.moveToStart();
    engine.state = State.playing;
};

// ------------------------------------------------------------------------
var PausingState = function() {
};

PausingState.prototype.handleInput = function(player,keyCode) {
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
            engine.state = State.playing;
        }
        // else don't do anything. Rationale: To type '?', one has
        // to type 'shift + /'. Afterwards, one releases first '/' and
        // then 'shift'. This second key release must not trigger
        // the disappearance of the help screen, otherwise it would
        // just be displayed for a split-second - or as long as the
        // user keeps holding down the shift-key.
    } else {
        engine.togglePaused();
        engine.state = State.playing;
    }
};

PausingState.prototype.update = function(player) {
};

// Use "static" states to avoid reallocating and reinitializing them on
// every state change
State.playing = new PlayingState();
State.pausing = new PausingState();
State.winning = new WinningState();
State.losing = new CollidingState();
