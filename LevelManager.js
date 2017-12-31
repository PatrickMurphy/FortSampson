class LevelManager {
	constructor() {
		this.level_collection = [];
		this.current_id = undefined;
	}

	initializeLevel(level_property) {
		return new Level(level_property.type, this, level_property.title);
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
		var the_level = level;
		if (!(the_level instanceof Level)) {
			// if no already a level make a level object
			the_level = this.initializeLevel(level);
		}
		this.addLevel(the_level, true);
	}

	getLevels() {
		return this.level_collection;
	}

	getLevel(id) {
		id = id || this.current_id;
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
