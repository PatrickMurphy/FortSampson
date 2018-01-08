class CollisionManager {
	constructor(parent) {
		this.collision_collection = [];
		this.parent = parent || undefined;
	}

	// Collision Functions: Todo add collisions
	addCollision(c) {
		c.id = this.collision_collection.length;
		this.collision_collection.push(c);
		return c.id;
	}

	getCollisions() {
		return this.collision_collection;
	}

	getCollision(id) {
		return this.collision_collection[id];
	}

	removeCollision(id) {
		delete this.collision_collection[id];
	}

	display() {
		for (var i = 0; i < this.collision_collection.length; i++) {
			if (isDefined(this.collision_collection[i])) {
				if (this.collision_collection[i].collision_type !== collision_types.item) {
					this.collision_collection[i].display();
				}
			}
		}
	}

}
