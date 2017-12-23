class Item {
	constructor(type, loc) {
		this.location = loc;
		this.cellLocation = displayToVector(loc);
		this.type = type; // Type id, refer to comment above
		//this.sizes = sizes; // the unique index count of this tile
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
		addCollision(new Collision(this.type.string_id, this.location, createVector(this.type.image.width, this.type.image.height)));
	}

	display() {
		image(this.type.image, this.location.x, this.location.y) // display the rolling rock can
	}
}
