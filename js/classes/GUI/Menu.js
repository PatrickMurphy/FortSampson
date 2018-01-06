class Menu {
	constructor(state) {
		this.elements = {
			"game": []
		};
		this.main_menu_settings = {
			canPile_xoffset: -3,
			canPile_yOffset: height - 200,
			canPile_yLimit: 33,
			canPile_ySpeed: .045
		};
		this.menu_state = state || menu_states.main_menu;
		this.particle_system = new ParticleSystem(createVector(200, 400));
		this.addMainMenu();
	}

	addElement(state, element) {
		if (this.elements.hasOwnProperty(state)) {
			this.elements[state].push(element);
		} else {
			this.elements[state] = [];
			this.elements[state].push(element);
		}
	}

	addMainMenu() {
		var init_pos = createVector(width / 6, height / 1.35);
		var standard_size = createVector(width * .66, height * .1);
		var half_size = createVector(width * .32, standard_size.y);
		// choose a cat
		// start game
		this.addElement(menu_states.main_menu, new GUIButton("Start Game", init_pos, standard_size, this, this.handleMainMenuClick));
		// settings
		this.addElement(menu_states.main_menu, new GUIButton("Settings", init_pos.copy().add(createVector(0, height * .12)), half_size, this, this.handleMainMenuClick));
		// about
		this.addElement(menu_states.main_menu, new GUIButton("About", init_pos.copy().add(createVector(width * .34, height * .12)), half_size, this, this.handleMainMenuClick));
	}

	displayMainMenu() {
		this.main_menu_settings.canPile_yOffset = max(this.main_menu_settings.canPile_yOffset - this.main_menu_settings.canPile_ySpeed, this.main_menu_settings.canPile_yLimit);
		image(menuBG, 0, 0);
		image(menuCans, this.main_menu_settings.canPile_xoffset, this.main_menu_settings.canPile_yOffset);
		this.particle_system.update();
		this.particle_system.display();
		image(menuFG, 0, 0);
	}

	handleMainMenuClick(element, that) {
		if (element.name === 'Start Game') {
			that.menu_state = menu_states.game;
		} else if (element.name === 'Settings') {
			that.menu_state = menu_states.settings;
		} else if (element.name === 'About') {
			that.menu_state = menu_states.settings;
		}
	}

	displayGUIElements() {
		for (var i = 0; i < this.elements[this.menu_state].length; i++) {
			this.elements[this.menu_state][i].display();
		}
	}

	display() {
		background(color(150, 150, 150));
		if (this.menu_state === menu_states.main_menu) {
			this.displayMainMenu();
		}
		this.displayGUIElements();
		this.handleClicks();
	}

	handleClicks() {
		if (mouseIsPressed) {
			for (var i = 0; i < this.elements[this.menu_state].length; i++) {
				if (this.elements[this.menu_state][i].constructor.name === GUIButton.name) {
					this.elements[this.menu_state][i].handleClick();
				}
			}
		}
	}
}
