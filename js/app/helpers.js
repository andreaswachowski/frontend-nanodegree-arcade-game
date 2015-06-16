// vi: ts=4 sw=4 expandtab

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

function writeLine(ctx,text,y, textSize, fillStyle) {
  ctx.font = textSize.toString() + "pt Impact";
  ctx.textAlign = "center";

  if (fillStyle === undefined) {
      fillStyle = "white";
  }
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;

  ctx.fillText(text, ctx.canvas.width/2, y);
  ctx.strokeText(text, ctx.canvas.width/2, y);
}

exports.getRandomInt = getRandomInt;
exports.writeLine = writeLine;
