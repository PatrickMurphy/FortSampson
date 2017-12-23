class Cat {
	constructor(loc, typeID, i) {
		// The display location of the cat
		this.location = vectorToDisplay(loc);

		// The cat Type ID: only toby so far // Todo: add cats
		this.type = typeID;

		// Unique index id
		this.index = i;

		// Direction the cat is facing State: 1:left, 0: right
		this.dir = 0;

		//Default floor value y height
		this.default_floor = height - (109 / 2) - 22;

		// The height of the floor
		this.floor = this.default_floor;

		// The mass of the cat, have type lookup
		this.mass = 15;

		// Default Velocity: current velocity, collective from multiple updates
		this.velocity = createVector(0, 0);

		// Default Acceleration: current vectors applied
		this.acceleration = new createVector(0, 0);

		this.collision_box = new Collision('box',this.location,createVector(t2.width/2,t2.height/2));
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
		return (this.location.x < width + this.mass && this.location.x > -this.mass && this.location.y < height + this.mass && this.location.y > -this.mass);
	}

	// Update every frame
	update() {
		// If hit ground OR Gravity
		if (this.location.y < this.floor) {
			this.applyForce(createVector(0, 1));
		} else {
			//this.velocity.mult(.2);
			//this.acceleration.mult();
			this.location.y = this.floor - 1;
		}



		// Friction ---------------------------------------
		// if facing left
		if (this.dir == 1 && this.location.y >= this.floor) {
			this.applyForce(createVector(.1, 0));
		}

		// if facing right
		if (this.dir == 0 && this.location.y >= this.floor) {
			this.applyForce(createVector(-.1, 0));
		}
		// End --------------------------------------------

		// Update physics
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	distance(m) {
		// distance to another location object
		return dist(m.location.x, m.location.y, this.location.x, this.location.y);
	}

	// Move Left Action, left arrow
	moveLeft() {
		this.applyForce(createVector(-3, 0));
		this.dir = 1;
	}

	// Move Right Action, right arrow
	moveRight() {
		this.applyForce(createVector(3, 0));
		this.dir = 0;
	}

	// Jump action, up arrow TODO: Add Space button, wasd
	moveUp() {
		this.applyForce(createVector(0, -25));
	}

	display() {
		// Display cat image, use ternary to decide what image based on direction
		// TODO: use a function to determine image, enable animation
		image(this.dir == 1 ? t2 : t3, this.location.x, this.location.y, 140 / 2, 109 / 2);
		if(DEBUG === 'col'){
			this.collision_box.display();
		}
	}
}
