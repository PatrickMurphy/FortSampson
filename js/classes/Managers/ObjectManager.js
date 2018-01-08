class ObjectManager {
	constructor() {
		this.elements = {};
	}

	add(key, value) {
		this.elements[key] = value;
	}
	set(key, value) {
		this.add(key, value);
	}
	get(key) {
		return this.elements[key];
	}

	getAll() {
		return this.elements;
	}
	remove() {
		this.elements[key] = undefined;
	}
	clear() {
		this.elements = {};
	}
	isSet(key) {
		return isDefined(this.elements[key]);
	}
}
