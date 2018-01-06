class Item extends Entity {
	constructor(type, loc, collision_man, properties) {
		super(loc);
		this.collision_man = collision_man;
		this.type = type; // Type id, refer to comment above
		this.collected = false;
		this.properties = properties || {};
		this.collision_id = this.collision_man.addCollision(new Collision(this.type.string_id, collision_types.item, this.location, createVector(this.type.image.width, this.type.image.height), this.collision_man, this.properties));
	}

	display() {
		if (!this.collected)
			image(this.type.image, this.location.x, this.location.y + sin((millis() / 100 % 25))) // display the rolling rock can
	}
}
