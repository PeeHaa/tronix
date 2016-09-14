/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Main   = __webpack_require__(1);
	const Player = __webpack_require__(10);

	const main = new Main();

	main.addPlayer(new Player(0x00ff00));

	main.run();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const SquaresFloor = __webpack_require__(2);
	const SquaresWall  = __webpack_require__(4);
	const SideCamera   = __webpack_require__(6);
	const FirstPersonCamera = __webpack_require__(8);
	const ThirdPersonCamera = __webpack_require__(9);

	class Main {
	    constructor() {
	        this.lastTick   = Date.now();
	        this.lastUpdate = new Date().getSeconds();
	        this.fps        = 0;

	        this.scene = new THREE.Scene();

	        this.scene.add(new SquaresFloor().getMesh());
	        this.scene.add(new SquaresWall(0, -500, 0).getMesh());
	        this.scene.add(new SquaresWall(0, 500, Math.PI).getMesh());
	        this.scene.add(new SquaresWall(500, 0, Math.PI * 1.5).getMesh());
	        this.scene.add(new SquaresWall(-500, 0, Math.PI / 2).getMesh());

	        this.cameras = [
	            new ThirdPersonCamera(this.scene.position),
	            new SideCamera(this.scene.position),
	            new FirstPersonCamera(this.scene.position)
	        ];

	        this.activeCamera = 0;

	        this.renderer = new THREE.WebGLRenderer();

	        this.renderer.setSize(window.innerWidth, window.innerHeight);

	        document.body.appendChild(this.renderer.domElement);

	        this.players = [];
	    }

	    run() {
	        this.render();

	        document.addEventListener('keydown', (e) => {
	            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
	                this.players[0].turnLeft();
	            }

	            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
	                this.players[0].turnRight();
	            }

	            if (e.code === 'ArrowDown') {
	                this.cameras[this.activeCamera].lookBack();
	            }

	            if (e.code === 'KeyC') {
	                if (this.activeCamera === this.cameras.length - 1) {
	                    this.activeCamera = 0;
	                } else {
	                    this.activeCamera++;
	                }
	            }
	        });

	        document.addEventListener('keyup', (e) => {
	            if (e.code === 'ArrowDown') {
	                this.cameras[this.activeCamera].lookForward();
	            }
	        });
	    }

	    render() {
	        requestAnimationFrame(this.render.bind(this));

	        this.players[0].moveForward();
	        this.scene.remove(this.players[0].getActiveTailPart());
	        this.scene.remove(this.players[0].getActiveTailPartOutline());
	        this.scene.add(this.players[0].getActiveTailPart());
	        this.scene.add(this.players[0].getActiveTailPartOutline());

	        this.renderer.render(this.scene, this.cameras[this.activeCamera].getCamera());

	        if (this.lastUpdate !== new Date().getSeconds()) {
	            const delta = (Date.now() - this.lastTick) / 1000;

	            document.querySelector('[data-huditem="fps"]').textContent = Math.round(1 / delta);
	        }

	        this.lastTick   = Date.now();
	        this.lastUpdate = new Date().getSeconds();
	    }

	    addPlayer(player) {
	        this.players.push(player);

	        this.scene.add(player.getBike());
	        this.scene.add(player.getActiveTailPart());

	        for (let i = 0; i < this.cameras.length; i++) {
	            player.getBike().add(this.cameras[i].getCamera());
	        }
	    }
	}

	module.exports = Main;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Floor = __webpack_require__(3);

	class Squares extends Floor {
	    constructor() {
	        const floorTexture = new THREE.TextureLoader().load('/images/floor.jpg');

	        floorTexture.wrapS = THREE.RepeatWrapping;
	        floorTexture.wrapT = THREE.RepeatWrapping;

	        floorTexture.repeat.set(10, 10);

	        super(new THREE.MeshBasicMaterial({
	            map: floorTexture,
	            side: THREE.DoubleSide
	        }));
	    }
	}

	module.exports = Squares;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Floor {
	    constructor(floorMaterial) {
	        this.floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), floorMaterial);

	        this.floor.position.y = -0.5;
	        this.floor.rotation.x = Math.PI / 2;
	    }

	    getMesh() {
	        return this.floor;
	    }
	}

	module.exports = Floor;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Wall = __webpack_require__(5);

	class Squares extends Wall {
	    constructor(x, z, rotationY) {
	        const texture = new THREE.TextureLoader().load('/images/wall.jpg');

	        texture.wrapS = THREE.RepeatWrapping;
	        texture.wrapT = THREE.RepeatWrapping;

	        texture.repeat.set(10, 10);

	        super(new THREE.MeshBasicMaterial({
	            map: texture
	        }), x, z, rotationY);
	    }
	}

	module.exports = Squares;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Wall {
	    constructor(floorMaterial, x, z, rotationY) {
	        this.wall = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), floorMaterial);

	        this.wall.position.x = x;
	        this.wall.position.y = 500;
	        this.wall.position.z = z;
	        this.wall.rotation.y = rotationY;
	    }

	    getMesh() {
	        return this.wall;
	    }
	}

	module.exports = Wall;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Camera = __webpack_require__(7);

	class Side extends Camera {
	    constructor(scenePosition) {
	        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

	        camera.position.set(0, 150, 400);

	        camera.lookAt(scenePosition);

	        super(camera);
	    }

	    lookBack() {

	    }

	    lookForward() {

	    }
	}

	module.exports = Side;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class Camera {
	    constructor(camera) {
	        this.camera = camera;
	    }

	    getCamera() {
	        return this.camera;
	    }
	}

	module.exports = Camera;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Camera = __webpack_require__(7);

	class FirstPerson extends Camera {
	    constructor(scenePosition) {
	        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000);

	        camera.eulerOrder = "YXZ";

	        camera.position.set(1, 0, 0);

	        camera.lookAt(scenePosition);

	        camera.rotation.x = 0;
	        camera.rotation.y = 4.7;
	        camera.rotation.z = 0;

	        super(camera);
	    }

	    lookBack() {

	    }

	    lookForward() {

	    }
	}

	module.exports = FirstPerson;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Camera = __webpack_require__(7);

	class ThirdPerson extends Camera {
	    constructor(scenePosition) {
	        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

	        super(camera);

	        this.camera = camera;

	        this.camera.eulerOrder = "YXZ";

	        this.camera.position.set(-300, 150, -100);

	        this.camera.lookAt(scenePosition);

	        this.lookForward();
	    }

	    lookBack() {
	        this.camera.rotation.y = 7.6;
	    }

	    lookForward() {
	        this.camera.rotation.x = -0.4;
	        this.camera.rotation.y = 4.4;
	        this.camera.rotation.z = 0;
	    }
	}

	module.exports = ThirdPerson;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const Trail = __webpack_require__(11);

	class Player {
	    constructor(color) {
	        var geometry = new THREE.BoxGeometry(50, 24, 20);
	        var material = new THREE.MeshBasicMaterial({ color: color });

	        this.bike = new THREE.Mesh(geometry, material);

	        this.bike.position.set(-450, 12, 0);

	        this.trail = new Trail(color, -450, 0, 0);
	    }

	    getBike() {
	        return this.bike;
	    }

	    getTails() {
	        return this.trail.getTails();
	    }

	    getActiveTailPart() {
	        return this.trail.getActiveTailPart();
	    }

	    getActiveTailPartOutline() {
	        return this.trail.getActiveTailPartOutline();
	    }

	    turnLeft() {
	        this.bike.rotation.y += Math.PI / 2;

	        this.trail.turnLeft();
	    }

	    turnRight() {
	        this.bike.rotation.y -= Math.PI / 2;

	        this.trail.turnRight();
	    }

	    moveForward() {
	        this.bike.translateX(2);

	        this.trail.moveForward();
	    }
	}

	module.exports = Player;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const North    = __webpack_require__(12);
	const TailPart = __webpack_require__(17);

	class Trail {
	    constructor(color, x, y, z) {
	        this.color = color - 100;
	        this.x     = x;
	        this.y     = y;
	        this.z     = z;

	        this.activeTrail = new TailPart(this.color, new North(), x, y, z);

	        this.trails = [this.activeTrail];
	    }

	    getTails() {
	        return this.trails;
	    }

	    getActiveTailPart() {
	        return this.activeTrail.getPart();
	    }

	    getActiveTailPartOutline() {
	        return this.activeTrail.getOutline();
	    }

	    turn(heading) {
	        const delta = this.activeTrail.getDelta();

	        if (delta.direction === 'x') {
	            this.x += delta.position;
	        } else {
	            this.z += delta.position;
	        }

	        this.activeTrail = new TailPart(this.color, heading, this.x, this.y, this.z);

	        this.trails.push(this.activeTrail);
	    }

	    turnLeft() {
	        this.turn(this.activeTrail.getLeftHeading());
	    }

	    turnRight() {
	        this.turn(this.activeTrail.getRightHeading());
	    }

	    moveForward() {
	        this.activeTrail.moveForward();
	    }
	}

	module.exports = Trail;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const Heading = __webpack_require__(13);

	class North extends Heading {
	    constructor() {
	        super('x', 1, 2);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'x',
	            position: size
	        };
	    }

	    getLeftHeading() {
	        const West  = __webpack_require__(14);

	        return new West();
	    }

	    getRightHeading() {
	        const East = __webpack_require__(16);

	        return new East();
	    }
	}

	module.exports = North;


/***/ },
/* 13 */
/***/ function(module, exports) {

	class Heading {
	    constructor(direction, delta, extraSize, name) {
	        this.direction = direction;
	        this.delta     = delta;
	        this.extraSize = extraSize;
	    }

	    getDirection() {
	        return this.direction;
	    }

	    getDelta() {
	        return this.delta;
	    }

	    getExtraSize() {
	        return this.extraSize;
	    }
	}

	module.exports = Heading;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const Heading = __webpack_require__(13);

	class West extends Heading {
	    constructor() {
	        super('z', -1, 1);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'z',
	            position: -size  * 2
	        };
	    }

	    getLeftHeading() {
	        const South = __webpack_require__(15);

	        return new South();
	    }

	    getRightHeading() {
	        const North = __webpack_require__(12);

	        return new North();
	    }
	}

	module.exports = West;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	const Heading = __webpack_require__(13);

	class South extends Heading {
	    constructor() {
	        super('x', -1, 2);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'x',
	            position: -size
	        };
	    }

	    getLeftHeading() {
	        const East = __webpack_require__(16);

	        return new East();
	    }

	    getRightHeading() {
	        const West = __webpack_require__(14);

	        return new West();
	    }
	}

	module.exports = South;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	const Heading = __webpack_require__(13);

	class East extends Heading {
	    constructor() {
	        super('z', 1, 1);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'z',
	            position: size * 2
	        };
	    }

	    getLeftHeading() {
	        const North = __webpack_require__(12);

	        return new North();
	    }

	    getRightHeading() {
	        const South = __webpack_require__(15);

	        return new South();
	    }
	}

	module.exports = East;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const North = __webpack_require__(12);
	const East  = __webpack_require__(16);
	const South = __webpack_require__(15);
	const West  = __webpack_require__(14);

	class Part {
	    constructor(color, heading, x, y, z) {
	        this.size  = 1;
	        this.color = color;

	        const geometry = new THREE.BoxGeometry(this.size, 20, 2);
	        const material = new THREE.MeshBasicMaterial({ color: this.color });

	        this.tail = new THREE.Mesh(geometry, material);

	        this.outline = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }));

	        this.tail.position.set(x, 10, z);
	        this.outline.position.set(x, 10, z);

	        this.direction = 'x';
	        this.delta = 1;
	        this.extraSize = 2;

	        this.heading = heading;
	    }

	    getPart() {
	        return this.tail;
	    }

	    getOutline() {
	        return this.outline;
	    }

	    moveForward() {
	        this.size += this.heading.getExtraSize();

	        this.tail.scale[this.heading.getDirection()] = this.size;
	        this.outline.scale[this.heading.getDirection()] = this.size;

	        this.tail.position[this.heading.getDirection()] += this.heading.getDelta();
	        this.outline.position[this.heading.getDirection()] += this.heading.getDelta();
	    }

	    getPositionXDelta() {
	        return this.size;
	    }

	    getDelta() {
	        return this.heading.getFinalDelta(this.size);
	    }

	    getLeftHeading() {
	        return this.heading.getLeftHeading();
	    }

	    getRightHeading() {
	        return this.heading.getRightHeading();
	    }
	}

	module.exports = Part;


/***/ }
/******/ ]);