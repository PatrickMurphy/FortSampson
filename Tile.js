/*
-------------------
Tile ID Reference
-------------------

Tile #      Collisions	Objects		Name				Description
	0		No			Yes			Air                 The basic blank tile. TODO: should these be objects? or default to background
	1		Yes			Yes			Grass Platform 1    The basic platform, dirt with grass, flat, can float or be the lowest ground.
	2		Yes			Yes			Grass Platform RR   This is #1, with a floating rolling rock. TODO: Pass an array of object options if accepts objects instead of repetitive tiles

-----------------
Tile Class
-----------------
This class is the element of each map piece
*/

class Tile {
	constructor(loc, typeID, i) {
		this.location = loc; // this is the x,y position in the tile map, not the display coordinates
		this.displayVector = vectorToDisplay(this.location);
		this.type = typeID; // Type id, refer to comment above
		this.index = i; // the unique index count of this tile
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
	}

	display() {
		if (this.type == '0') { // TODO: Why is this a string?
			noFill(); // air TODO: temp fix, just exit the function at this point?
		} else if (this.type == 1 || this.type == 2) {
			if (this.type == 2) { // add rolling rock
				image(t4, this.displayVector.x + 30, this.displayVector.y) // display the rolling rock can
			}
			image(t1, cell_size * (this.location.x), this.location.y * cell_size); // display cell background
		}


		if (DEBUG === true) {
			fill(map(this.location.x, 0, cell_x_count, 0, 127.5) + map(this.location.y, 0, cell_y_count, 0, 127.5));
			rect(cell_size * (this.location.x), this.location.y * cell_size, cell_size, cell_size);
			fill(color(255, 0, 0));
			text(vectorToIndex(this.location.x, this.location.y) + "," + this.index, (this.displayVector.x) + cell_size / 2, (this.location.y * cell_size) + cell_size / 2);
		}
	}
}
