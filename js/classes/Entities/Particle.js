class Particle {
	constructor(parent) {
		this.parent = parent;
		// location Pvector
		this.location = parent.getSource();
		// velocity vector
		this.velocity = this.getInitVelocity();
		// mass for nature of code patterns
		this.mass = random(2, 5);

		this.rotation = floor(random(0, 360));
		this.r = 25;
		// current acceleration vector
		this.acceleration = createVector(0, 0);
		// fill color
		this.image = t4;

		this.scale = random(.3, .8);
	}

	getInitVelocity() {
		return createVector(-4, random(-1, 1)).mult(random(.8, 2)).copy();
	}

	applyForce(force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}

	update() {
		this.applyForce(createVector(0, 1));
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.checkCollisions();
		if (random(0, 1000) > 750) {
			this.rotation = (this.rotation + .4);
			if (this.rotation > 360) {
				this.rotation = 0;
			}
		}
	}
	display() {
		push();
		translate(this.location.x, this.location.y);
		rotate(this.rotation);
		scale(this.scale);
		image(this.image, 0, 0);
		pop();
	}
	reset() {
		this.location = this.parent.getSource();
		this.velocity = this.getInitVelocity();
		this.acceleration = createVector(0, 0);

		this.scale = random(.3, .8);
	}
	checkCollisions() {
		// if hits right wall
		if (this.location.x > (width - (this.r))) {
			this.location.x = (width - (this.r));
			this.velocity.x *= -1;
		} else if (this.location.x < (this.r)) { // left wall
			this.velocity.x *= -1;
			this.location.x = (this.r);
		}
		// floor collision check
		if (this.location.y > height + 2 * this.r) {
			this.reset();
		}
	}
}
