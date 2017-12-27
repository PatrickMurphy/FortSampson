class CollisionManager {
	constructor() {
		this.collision_collection = [];
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
			if (typeof this.collision_collection[i] !== 'undefined')
				this.collision_collection[i].display();
		}
	}

}
