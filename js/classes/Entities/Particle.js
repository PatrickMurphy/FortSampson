class Particle extends Entity {
	constructor(parent) {
		super(parent.getSource());

		// Parent reference
		this.parent = parent;

		// velocity vector
		this.velocity = this.getInitVelocity();

		// mass for nature of code patterns
		this.mass = random(2, 5);

		this.rotation = floor(random(0, 360));

		// radius
		this.r = 25;

		// current acceleration vector
		this.acceleration = createVector(0, 0);

		// fill color
		this.image = t4;

		// Scale of this particle
		this.scale = random(.3, .8);
	}

	getInitVelocity() {
		return createVector(-4, random(-1, 1)).mult(random(.8, 2)).copy();
	}

	update() {
		this.applyForce(createVector(0, 1));
		super.update();
		this.checkCollisions();
		this.randomRotation();
	}
	display() {
		push();
		translate(this.location.x, this.location.y);
		rotate(this.rotation);
		scale(this.scale);
		image(this.image, 0, 0);
		pop();
	}

	randomRotation() {
		if (random(0, 1000) > 750) {
			this.rotation = (this.rotation + .4);
			if (this.rotation > 360) {
				this.rotation = 0;
			}
		}
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
