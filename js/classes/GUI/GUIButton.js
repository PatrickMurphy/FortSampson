class GUIButton {
	constructor(btnName, btnPos, size, parent, clickHandler) {
		this.name = btnName;
		this.parent = parent;
		this.position = btnPos || createVector();
		this.size = size;
		//this.btnFont = btnFont || createFont("Georgia", txtSize);
		this.btnTextSize = 15;
		this.pressed = false;
		this.clickHandler = clickHandler || function () {
			console.log('default');
		};
	}

	display() {
		textSize(this.btnTextSize);
		if (!this.pressed) {
			fill(0, 110, 100);
			rect(this.position.x, this.position.y + height / 150, this.size.x, this.size.y, 15);
			fill(0, 150, 140);
			rect(this.position.x, this.position.y, this.size.x, this.size.y, 15);
			fill(255);
			text(this.name, this.position.x + (this.size.x / 2), this.position.y + (this.size.y / 2));
		} else {
			fill(0, 60, 55);
			rect(this.position.x, this.position.y, this.size.x, this.size.y, 15);
			fill(0, 100, 90);
			rect(this.position.x, this.position.y + height / 150, this.size.x, this.size.y, 15);
			fill(180);
			text(this.name, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2 + height / 150);
		}
	}

	onButton(x, y) {
		return (x >= this.position.x && y >= this.position.y && x <= this.position.x + this.size.x && y <= this.position.y + this.size.y);
	}

	handleClick() {
		if (this.onButton(mouseX, mouseY)) {
			this.clickHandler(this, this.parent);
		}
	}
}
