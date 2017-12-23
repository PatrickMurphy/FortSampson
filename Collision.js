class Collision {
	constructor(typeID, loc, sizes, parent) {
		this.location = loc;
		this.cellLocation = displayToVector(loc);
		this.type = typeID; // Type id, refer to comment above
		this.sizes = sizes; // the unique index count of this tile
		this.id = 0;
		this.parent = parent || undefined;
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
	}

	intersects(collider) {
		return collider.location.x < this.location.x + this.sizes.x &&
			collider.location.x + collider.sizes.x > this.location.x &&
			collider.location.y < this.location.y + this.sizes.y &&
			collider.sizes.y + collider.location.y > this.location.y;
	}

	display() {
		if (DEBUG === 'col') {
			fill(map(this.cellLocation.x, 0, cell_x_count, 0, 127.5) + map(this.cellLocation.y, 0, cell_y_count, 0, 127.5));
			rect(this.location.x, this.location.y, this.sizes.x, this.sizes.y);
		}
	}
}
