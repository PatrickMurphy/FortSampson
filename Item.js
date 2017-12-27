class Item {
	constructor(type, loc) {
		this.location = loc;
		this.cellLocation = displayToVector(loc);
		this.type = type; // Type id, refer to comment above
		this.collected = false;
		//this.sizes = sizes; // the unique index count of this tile
		this.collision_id = collision_manager.addCollision(new Collision(this.type.string_id, collision_types.item, this.location, createVector(this.type.image.width, this.type.image.height), this));
	}

	display() {
		if (!this.collected)
			image(this.type.image, this.location.x, this.location.y + sin((millis() / 100 % 25))) // display the rolling rock can
	}
}
