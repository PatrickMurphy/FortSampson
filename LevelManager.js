class LevelManager {
	constructor(typeID, parent) {
		this.type = typeID; // Type id, refer to comment above
		this.parent = parent || undefined;
		this.level_collection = [];
	}

	copy(type) {
		return new LevelManager(this.type, this.parent);
	}

	addLevel(level) {
		level.id = this.level_collection.length;
		this.level_collection.push(level);
		return level.id;
	}

	getLevels() {
		return this.level_collection;
	}

	getLevel(id) {
		return this.level_collection[id];
	}

	removeLevel(id) {
		delete this.level_collection[id];
	}
}
