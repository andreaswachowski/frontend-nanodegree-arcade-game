frontend-nanodegree-arcade-game
===============================

About
-----
This is a simple browser-based game, similar to [frogger](https://en.wikipedia.org/wiki/Frogger).

<img src="https://github.com/andreaswachowski/frontend-nanodegree-arcade-game/blob/master/screenshot.png" height="auto" width="400" >

The character at the bottom is the player. The goal is to cross the screen to the top without getting hit by any of the bugs crossing the stones from left to right, at various speeds.

A score is awarded once the game is won. At minimum those are 10 points, but there is a time bonus which increases the faster the game is finished.

When the player is hit by an enemy, it returns to the starting position, and 30 points are subtracted from the score. 

Shortcuts:
* Cursor keys for navigation.
* Space key to pause and resume
* '?' to open a help screen

Installation
------------
* Clone the git repository to a local directory
* The hackish way (on Linux or Mac OS X):
  1. Change to the project's root directory
  2. Execute ```cat js/app/* >> js/app.js```
* The recommended (future-proof) way, using [grunt](http://gruntjs.com/getting-started) (assumes grunt-cli is already installed):
  1. Change to the project's root directory
  2. Run ```npm install```
  3. Run Grunt with ```grunt```

That will create ```js/app.js``` which is required from ```index.html```.

Running the game
----------------
Simply load ```index.html``` in a browser and have fun!

Feedback
--------
Feedback is welcome! For feature requests, bug reports, or even refactoring suggestions or general JavaScript tips (I am new to JavaScript), please open an issue on this project in Github. Thanks!
