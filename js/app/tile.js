// vi: ts=4 sw=4 expandtab

function Tile() {
}

// Because the height- and width-properties are the same on all objects, I
// wanted to model them as Java-like static class variables and therefore
// attach them directly to Tile, as opposed to writing them inside the
// constructor as this.height and this.width
Tile.height = 83;
Tile.width = 101;
