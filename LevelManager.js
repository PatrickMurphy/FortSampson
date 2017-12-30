class LevelManager {
	constructor() {
		this.level_collection = [];
		this.current_id = undefined;
	}

	addLevel(level, setCurrentBool) {
		level.id = this.level_collection.length;
		setCurrentBool = setCurrentBool || false;
		this.level_collection.push(level);
		if (!isDefined(this.current_id) || setCurrentBool) {
			this.current_id = level.id;
		}
		return level.id;
	}

	queueLevel(level) {
		this.addLevel(level, false);
	}

	setLevel(level) {
		this.addLevel(level, true);
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

	display() {
		if (isDefined(this.current_id)) {
			this.level_collection[this.current_id].display();
		}
	}
}
