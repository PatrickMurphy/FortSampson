class Entity {
	constructor(location) {
		this.location = location;

		// The mass of the cat
		this.mass = 10;

		// current velocity, collective from multiple updates
		this.velocity = createVector(0, 0);

		// current vectors applied this frame
		this.acceleration = new createVector(0, 0);
	}

	// update function for every frame, physics
	update() {
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	setLocation(vector) {
		this.location = vector;
	}

	// get the current location vector
	getLocation() {
		return this.location;
	}

	// Apply vector force to cat physics
	applyForce(force) {
		// Scale To mass
		var f = p5.Vector.div(force, this.mass);

		// Apply to this frames accel
		this.acceleration.add(f);
	}

	// Return Boolean if within screen
	inBounds() {
		return (this.location.x < width + this.mass &&
			this.location.x > -this.mass &&
			this.location.y < height + this.mass &&
			this.location.y > -this.mass);
	}

	distance(m) {
		// distance to another location object
		return dist(m.location.x, m.location.y, this.location.x, this.location.y);
	}
}
