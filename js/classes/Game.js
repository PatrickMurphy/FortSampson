class Game {
	constructor() {
		this.DEBUG_STATE = debug_states.off;

		// Map Options
		this.level_manager = new LevelManager(this);

		// If Debug set up level editor
		if (this.DEBUG_STATE === debug_states.level_editor) {
			this.level_editor = new LevelEditor();
		}
		this.level_manager.addLevel(this.level_manager.initializeLevel(level_properties.FortSampsonInside_LivingRoom));
	}

	display() {
		this.level_manager.display();
		if (this.DEBUG_STATE === debug_states.level_editor) {
			this.level_editor.display();
		}
	}

	handleClicks() {
		if (this.DEBUG_STATE === debug_states.level_editor) {
			this.level_editor.handleClick();
		}
	}
}