class LevelManager {
	constructor(parent) {
		this.level_collection = {};
		this.current_level = undefined;
		this.current_title = undefined;
		this.parent = parent;
		//this.player_cat =
	}

	initializeLevel(level_property, reset, cat) {
		reset = reset || false;

		return new Level(level_property.type, this, level_property.title, cat);
	}

	addLevel(level, setCurrentBool) {
		level.id = Object.keys(this.level_collection).length;
		setCurrentBool = setCurrentBool || false;
		if (!this.level_collection.hasOwnProperty(level.title)) {
			// if it is not defined add the level
			this.level_collection[level.title] = level;
		} else {
			//console.log('add existing level');
			this.level_collection[this.current_title].player_cat.location = level_properties[this.current_title].playerStart.copy();
			//this.level_collection[level.title].player_cat.location = level_properties[level.title].playerStart.copy();
		}
		// if setting the level to current or if no current level set it
		if (!isDefined(this.current_title) || setCurrentBool) {
			console.log(this.current_title, level.title);
			this.current_level = level;
			this.current_title = level.title;
		}
		return level.title;
	}

	queueLevel(level) {
		this.addLevel(level, false);
	}

	setLevel(level_prop, cat) {
		var the_level = level_prop;
		if (!(the_level instanceof Level)) {
			// if no already a level make a level object
			the_level = this.initializeLevel(level_prop, false, cat);
		}
		this.current_level = the_level;
	}

	getLevels() {
		return this.level_collection;
	}

	getLevel(title) {
		return this.current_level;
	}

	removeLevel(title) {
		this.current_level = undefined;
	}

	display() {
		if (isDefined(this.current_level)) {
			this.current_level.display();
		}
	}
}
