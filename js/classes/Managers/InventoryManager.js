class InventoryManager extends ObjectManager {
	constructor() {
		super();
	}

	increment(key, value) {
		value = value || 1;
		if (this.isSet(key)) {
			this.set(key, this.get(key) + value);
		} else {
			this.set(key, value);
		}
	}

	display() {
		var the_string = 'Inv:';
		for (var key in this.getAll()) {
			the_string += key + ': ' + this.get(key);
		}
		fill(color(0, 0, 255));
		text(the_string, 5, 20);
	}
}
