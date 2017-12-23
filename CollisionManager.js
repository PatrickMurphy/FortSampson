class CollisionManager {
	constructor(type, loc) {
		this.collision_collection = [];
	}

	// Collision Functions: Todo add collisions
	addCollision(c) {
		this.collision_collection.push(c);
		return this.collision_collection.length - 1;
	}

	getCollisions() {
		return this.collision_collection;
	}

	getCollision(id) {
		return this.collision_collection[id];
	}

	removeCollection(id) {
		delete this.collision_collection[id];
	}

	display() {
		for (var i = 0; i < this.collision_collection.length; i++) {
			this.collision_collection[i].display();
		}
	}

}
