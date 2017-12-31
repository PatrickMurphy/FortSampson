var item_names, item_types;
var tile_names, tile_types;
var collision_directions, collision_types;
var mover_states, level_types;
var debug_states;

function setupEnums() {
	debug_states = {
		off: 0,
		collisions: 1,
		level_editor: 2
	};

	item_types = {
		rollingrock: {
			id: 0,
			string_id: 'rollingrock',
			title: 'Rolling Rock',
			image: t4,
			offset: createVector(0, -20)
		},
		path: {
			id: 1,
			string_id: 'path',
			title: 'path',
			image: t4,
			offset: createVector(0, -15)
		}
	};

	mover_states = {
		idle: 0,
		moving: 1,
		jumping: 2,
		movejump: 3,
		dead: 4
	};

	item_names = ['rollingrock', 'path'];


	tile_types = {
		air: {
			id: 0,
			collisions: false,
			objects: true
		},
		grass: {
			id: 1,
			collisions: true,
			objects: true
		}
	};
	tile_names = ['air', 'grass'];

	collision_directions = {
		none: 0,
		top: 1,
		bottom: 2,
		top_bottom: 3, // top plus bottom
		sides: 4,
		sides_top: 5, // sides + top
		sides_bottom: 6,
		all: 7 // top+bottom+sides=7
	};
	collision_types = {
		floor: {
			id: 0,
			isHardBody: true,
			direction: collision_directions.top,
			stationary: true
		},
		item: {
			id: 1,
			isHardBody: false,
			direction: collision_directions.all,
			stationary: true
		},
		path: {
			id: 2,
			isHardBody: false,
			direction: collision_directions.all,
			stationary: true
		},
		cat: {
			id: 3,
			isHardBody: true,
			direction: collision_directions.all,
			stationary: false
		}
	}

	level_types = {
		cells: 0,
		svg: 1
	};

	level_properties = {
		FortSampsonOutside: {
			hasBG: true,
			type: level_types.svg,
			title: 'FortSampsonOutside',
			playerStart: createVector(0, 6),
			items: [{
					x: 685,
					y: 585,
					type: item_types.rollingrock
			}, {
					x: 510,
					y: 585,
					type: item_types.rollingrock
			},
				{
					x: 530,
					y: 328,
					type: item_types.rollingrock
				}, {
					x: 670,
					y: 328,
					type: item_types.rollingrock
				},
				{
					x: 140,
					y: 520,
					type: item_types.rollingrock
				},
				{
					x: 195,
					y: 520,
					type: item_types.rollingrock
				},
				{
					x: 75,
					y: 265,
					type: item_types.rollingrock
				},
				{
					x: 185,
					y: 265,
					type: item_types.rollingrock
				},
				{
					x: 265,
					y: 265,
					type: item_types.rollingrock
				},
				{
					x: 375,
					y: 265,
					type: item_types.rollingrock
				},
				{
					x: 149,
					y: 210,
					type: item_types.rollingrock
				}],
			paths: [],
			collisions: [{
					x: 40,
					y: 589
			},
				{
					x: 421,
					y: 599
			},
				{
					x: 123,
					y: 535
			},
				{
					x: 232,
					y: 540
			},
				{
					x: 502,
					y: 346
			},
				{
					x: 702,
					y: 350
			},
				{
					x: 568,
					y: 312
			},
				{
					x: 622,
					y: 318
			},
				{
					x: 52,
					y: 359
			},
				{
					x: 422,
					y: 362
			},
				{
					x: 53,
					y: 279
			},
				{
					x: 421,
					y: 281
			},
				{
					x: 37,
					y: 228
			},
				{
					x: 258,
					y: 232
			},
				{
					x: 36,
					y: 78
			},
				{
					x: 520,
					y: 82
			},
				{
					x: 125,
					y: 422
			},
				{
					x: 229,
					y: 425
			},
				{
					x: 0,
					y: 615
				}, {
					x: 800,
					y: 625
				}]
		},
		FortSampsonInside_LivingRoom: {
			hasBG: true,
			type: level_types.svg,
			title: 'FortSampsonInside_LivingRoom',
			playerStart: createVector(8, 6),
			items: [],
			paths: [{
				x: 40,
				y: 530,
				properties: {
					destination: 'FortSampsonOutside'
				},
				type: item_types.path
			}],
			collisions: [
				{
					x: 25,
					y: 572
				}, {
					x: 770,
					y: 567
				}, {
					x: 768,
					y: 7
				}, {
					x: 799,
					y: 637
				}, {
					x: -1,
					y: 638
				}, {
					x: 26,
					y: 27
				}, {
					x: 98,
					y: 458
				}, {
					x: 205,
					y: 466
				}, {
					x: 334,
					y: 455
				}, {
					x: 608,
					y: 452
				}, {
					x: 369,
					y: 515
				}, {
					x: 582,
					y: 519
				}, {
					x: 453,
					y: 369
				}, {
					x: 652,
					y: 375
				}]
		}
	}
}
