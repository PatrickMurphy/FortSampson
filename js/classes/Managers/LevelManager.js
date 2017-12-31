class LevelManager {
	constructor(parent) {
		this.level_collection = {};
		this.current_title = undefined;
		this.parent = parent;
	}

	initializeLevel(level_property, reset) {
		reset = reset || false;
		if (this.level_collection.hasOwnProperty(level_property.title) && !reset) {
			// if already exists and not requested to reset return current level
			return this.level_collection[level_property.title];
		}
		// or create a new one
		return new Level(level_property.type, this, level_property.title);
	}

	addLevel(level, setCurrentBool) {
		level.id = Object.keys(this.level_collection).length;
		setCurrentBool = setCurrentBool || false;
		if (!this.level_collection.hasOwnProperty(level.title)) {
			// if it is not defined add the level
			this.level_collection[level.title] = level;
		}
		// if setting the level to current or if no current level set it
		if (!isDefined(this.current_title) || setCurrentBool) {
			this.current_title = level.title;
		}
		return level.title;
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

	getLevel(title) {
		title = title || this.current_title;
		return this.level_collection[title];
	}

	removeLevel(title) {
		delete this.level_collection[title];
	}

	display() {
		if (isDefined(this.current_title)) {
			this.level_collection[this.current_title].display();
		}
	}
}
