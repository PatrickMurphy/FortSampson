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
		this.mass = 10;

		// Default Velocity: current velocity, collective from multiple updates
		this.velocity = createVector(0, 0);

		// Default Acceleration: current vectors applied
		this.acceleration = new createVector(0, 0);

		this.collision_box = new Collision('box', this.location, createVector(t2.width / 2, t2.height / 2));

		this.state = states.idle;

		this.is_colliding = false;
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
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

	handleInput() {
		if (keyIsPressed === true) {
			if (keyCode === LEFT_ARROW) {
				this.moveLeft();
				this.setState(states.moving);
			} else if (keyCode === RIGHT_ARROW) {
				this.moveRight();
				this.setState(states.moving);
			} else if ((keyCode === UP_ARROW) && (this.getState() !== states.jumping)) {
				this.setState(states.jumping);
				this.moveUp();
			}
		}
	}

	checkCollisions(callback) {
		// If hit collision box
		for (var i = 0; i < collision.length; i++) {
			if (collision[i].intersects(this.collision_box) !== false) {
				this.is_colliding = true;
				callback(collision[i]);
			}
		}
		this.is_colliding = false;
		callback(false);
	}

	// Update every frame
	update() {
		this.handleInput();

		if (this.state !== states.idle) {
			this.applyForce(createVector(0, 1.4)); // gravity
		}

		if (this.is_colliding === false) {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					console.log('hit first');
					that.velocity.mult(0);
					that.acceleration.mult(0);
					that.location.y -= 1;
					//this.applyForce(createVector(0, -10));
				}
			});
		} else {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					that.velocity.x *= 0.9;
				}
			});
		}


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
		this.applyForce(createVector(-2, 0));
		this.dir = 1;
	}

	// Move Right Action, right arrow
	moveRight() {
		this.applyForce(createVector(2, 0));
		this.dir = 0;
	}

	// Jump action, up arrow TODO: Add Space button, wasd
	moveUp() {
		this.location.y -= 5;
		this.applyForce(createVector(0, -30));
	}

	// display the cat
	display() {
		// Display cat image, use ternary to decide what image based on direction
		// TODO: use a function to determine image, enable animation
		image(this.dir == 1 ? t2 : t3, this.location.x, this.location.y, 140 / 2, 109 / 2);

		if (DEBUG === 'col') {
			fill(color(255, 0, 0));
			if (this.is_colliding) {
				ellipse(25, 25, 15, 15);
			}

			text(Object.keys(states)[this.state], 16, 50);
			this.collision_box.display();
		}
	}
}
