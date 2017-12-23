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

class Collision {
	constructor(typeID, loc, sizes) {
		this.location = loc;
		this.cellLocation = displayToVector(loc);
		this.type = typeID; // Type id, refer to comment above
		this.sizes = sizes; // the unique index count of this tile
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
	}

	intersects(collider) {
		return this.location.x < this.location.x + this.sizes.x &&
			this.location.x + this.sizes.x > this.location.x &&
			this.location.y < this.location.y + this.sizes.y &&
			this.sizes.y + this.location.y > this.location.y;
	}

	display() {
		if (DEBUG === 'col') {
			fill(map(this.cellLocation.x, 0, cell_x_count, 0, 127.5) + map(this.cellLocation.y, 0, cell_y_count, 0, 127.5));
			rect(this.location.x, this.location.y, this.sizes.x, this.sizes.y);
		}
	}
}
