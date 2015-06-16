var HelpScreen = function() {
  this.help = [ 'Cross the street = 10 points + bonus',
    'Bonus: 0-50 points. Faster = more points.',
    'Get hit = -30 points',
    '',
    'space: pause game',
    '? display help',
    '',
    'Press any key to continue.'
  ];

  this.isShowing = false;
};

HelpScreen.prototype.show = function() {
  this.isShowing = true;
};

HelpScreen.prototype.hide = function() {
  this.isShowing = false;
};

HelpScreen.prototype.update = function() {
};


HelpScreen.prototype.render = function() {
  if (this.isShowing) {
    ctx.font = "20pt Impact";
    ctx.textAlign = "left";

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    var lineHeight = 30;
    for (var line=0; line<this.help.length; line++) {
      ctx.fillText(this.help[line], 20, 180+line*lineHeight);
      ctx.strokeText(this.help[line], 20, 180+line*lineHeight);
    }
    engine.togglePaused();
  }
};

module.exports = HelpScreen;
