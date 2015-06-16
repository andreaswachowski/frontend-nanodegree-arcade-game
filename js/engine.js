// vi: ts=4 sw=4 expandtab
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

require('./resources.js');
var HelpScreen = require('./app/helpscreen.js');
var State = require('./app/state.js');
var Enemy = require('./app/enemy.js');
var Timer = require('./app/timer.js');

var Score = require('./app/score.js');
var Player = require('./app/player.js');

// TODO: Declaring all those variables globally is a leftover from
// refactoring to using modules. In a future step, the modules should be
// decoupled by passing needed variables as parameters (thereby also
// increasing testability), in order to minimize the use of global
// variables scattered across modules.
(function(global) {
    global.helpScreen = new HelpScreen();
    global.score = new Score();
    global.timer = new Timer();
    global.player = new Player();
    global.allEnemies = [new Enemy(), new Enemy(), new Enemy() ];

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    //
    // Moved the event listener from player.js to engine.js because it
    // needs to access the player instance which is defined here.
    var self = this;
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

        self.player.handleInput(allowedKeys[e.keyCode]);
    });

})(global);

var Engine = function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d');

    this.win = global.window;
    this.state = State.playing;

    // After pausing, we want to revert back to whichever state we had
    // before pausing.  This might also (more elegantly) be achieved with a
    // stack of states, but will keep it simple here.
    this.previousState = undefined;

    this.startTime = 0;
    this.lastTime = 0;
    this.startedPauseAt = 0;
    this.PAUSE_TIMEOUT = 100;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

};

/* This function serves as the kickoff point for the game loop itself
 * and handles properly calling the update and render methods.
 */
Engine.prototype.main = function() {
    var self = this;
    if (this.state === State.pausing) {
        setTimeout( function() {
            self.main.call(self, self.time);
        }, this.PAUSE_TIMEOUT);
    } else {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var startTime = Date.now(),
            dt = (startTime - this.lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        this.update(dt);
        this.render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        this.lastTime = startTime;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        this.win.requestAnimationFrame(this.main.bind(this));
    }
};

/* This function does some initial setup that should only occur once,
 * particularly setting the lastTime variable that is required for the
 * game loop.
 */
Engine.prototype.init = function () {
    this.reset();
    this.lastTime = Date.now();
    this.main();
};

Engine.prototype.saveCurrentState = function () {
    this.previousState = this.state;
};

Engine.prototype.restorePreviousState = function () {
    this.state = this.previousState;
};

/* This function does nothing but it could have been a good place to
 * handle game reset states - maybe a new game menu or a game over screen
 * those sorts of things. It's only called once by the init() method.
 */
Engine.prototype.reset = function () {
    // Noop
};

// The approach of pausing in the gameloop, as well as this function,
// is taken from David Geary's "Core HTML 5 Canvas", section 9.1.1.1
Engine.prototype.togglePaused = function() {
    var now = Date.now();
    if (this.state === State.pausing) {
        this.restorePreviousState();
    } else {
        this.saveCurrentState();
        this.state = State.pausing;
    }

    if (this.state === State.pausing) {
        this.startedPauseAt = now;
    } else { // Not paused
        this.startTime = this.startTime + now - this.startedPauseAt;
        this.lastTime = now;
    }
};

/* This function is called by main (our game loop) and itself calls all
 * of the functions which may need to update entity's data. Based on how
 * you implement your collision detection (when two entities occupy the
 * same space, for instance when your character should die), you may find
 * the need to add an additional function call here. For now, we've left
 * it commented out - you may or may not want to implement this
 * functionality this way (you could just implement collision detection
 * on the entities themselves within your app.js file).
 */
Engine.prototype.update = function(dt) {
        this.updateEntities(dt);
        // checkCollisions();
};

/* This is called by the update function  and loops through all of the
 * objects within your allEnemies array as defined in app.js and calls
 * their update() methods. It will then call the update function for your
 * player object. These update methods should focus purely on updating
 * the data/properties related to  the object. Do your drawing in your
 * render methods.
 */
Engine.prototype.updateEntities = function(dt) {
    allEnemies.forEach(function(enemy) {
        enemy.update(dt);
    });
    timer.update(dt);
    // TODO: score and player depend on each other in a wrong way:
    //
    // On the one hand, score must be updated before player, because, in
    // case of the player winning/losing, WinningState#update, executed by
    // Player#update, resets the engine.state to "playing". But
    // Score#update checks for that winning/losing state and would never
    // reach such a case.
    //
    // On the other hand, this execution order contains a bug, too:
    // score.update() depends on player.winningTime, but that is not
    // initialized yet, and
    // a) the very first score will receive a timeBonus corresponding to
    //    whatever winningTime is initialized in the players constructor
    // b) every subsequent round won will receive the timeBonus from the
    //    *previous* round.
    score.update();
    player.update();
    helpScreen.update();
};

/* This function initially draws the "game level", it will then call
 * the renderEntities function. Remember, this function is called every
 * game tick (or loop of the game engine) because that's how games work -
 * they are flipbooks creating the illusion of animation but in reality
 * they are just drawing the entire screen over and over.
 */
Engine.prototype.render = function () {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Row 1 of 3 of stone
        'images/stone-block.png',   // Row 2 of 3 of stone
        'images/stone-block.png',   // Row 3 of 3 of stone
        'images/grass-block.png',   // Row 1 of 2 of grass
        'images/grass-block.png'    // Row 2 of 2 of grass
    ],
    numRows = 6,
    numCols = 5,
    row, col;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
    }


    this.renderEntities();
};

/* This function is called by the render function and is called on each game
 * tick. It's purpose is to then call the render functions you have defined
 * on your enemy and player entities within app.js
 */
Engine.prototype.renderEntities = function() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function(enemy) {
            enemy.render();
            });

    timer.render();
    score.render();
    player.render();
    helpScreen.render();
};


// TODO: Same as above for score, timer, etc. The engine variable is global
// and used across different modules. This should be decoupled.
(function(global) {
    // Use browserify's 'global' to pass in the window object
    // (using "this" here wouldn't work)
    // Note this is a different scope than the parameter named 'global'
    // in Engine's constructor. Specifically, that parameter will be assigned
    // the value of the global in the line below, which in turn was previously
    // assigned by browserify to "window".
    var engine = new Engine(global);
    global.engine = engine;
})(global);

(function() {
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(engine.init.bind(engine));
    // Resources.onReady(function() { engine.init(engine); } );
})();

module.exports = engine;
