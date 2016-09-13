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

	var Main   = __webpack_require__(1);
	var Player = __webpack_require__(4);

	var main = new Main();

	main.addPlayer(new Player(0x00ff00));

	main.run();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let SquaresFloor = __webpack_require__(2);

	class Main {
	    constructor() {
	        this.scene = new THREE.Scene();

	        this.scene.add(new SquaresFloor().getMesh());

	        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

	        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

	        this.camera.position.set(0, 150, 400);
	        this.camera.lookAt(this.scene.position);

	        this.renderer = new THREE.WebGLRenderer();

	        this.renderer.setSize(window.innerWidth, window.innerHeight);

	        document.body.appendChild(this.renderer.domElement);

	        this.players = [];
	    }

	    run() {
	        this.render();

	        document.addEventListener('keydown', function(e) {
	            if (e.code === 'ArrowLeft') {
	                this.players[0].turnLeft();
	            }

	            if (e.code === 'ArrowRight') {
	                this.players[0].turnRight();
	            }
	        }.bind(this));
	    }

	    render() {
	        requestAnimationFrame(this.render.bind(this));

	        this.players[0].moveForward();
	        this.scene.remove(this.players[0].getActiveTailPart());
	        this.scene.add(this.players[0].getActiveTailPart());

	        this.renderer.render(this.scene, this.camera);
	    }

	    addPlayer(player) {
	        this.players.push(player);

	        this.scene.add(player.getBike());
	        this.scene.add(player.getActiveTailPart());

	        player.getBike().add(this.camera);
	    }
	}

	module.exports = Main;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let Floor = __webpack_require__(3);

	class Squares extends Floor {
	    constructor() {
	        let floorTexture = new THREE.TextureLoader().load('/images/floor.jpg');

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

	var Tail  = __webpack_require__(5);

	class Player {
	    constructor(color) {
	        var geometry = new THREE.BoxGeometry(50, 50, 20);
	        var material = new THREE.MeshBasicMaterial({ color: color });

	        this.bike = new THREE.Mesh(geometry, material);

	        this.bike.position.set(-450, 0, 0);

	        this.tail = new Tail(color, -450, 0, 0);
	    }

	    getBike() {
	        return this.bike;
	    }

	    getTails() {
	        return this.tail.getTails();
	    }

	    getActiveTailPart() {
	        return this.tail.getActiveTailPart();
	    }

	    turnLeft() {
	        this.bike.rotation.y += Math.PI / 2;

	        this.tail.turnLeft();
	    }

	    turnRight() {
	        this.bike.rotation.y -= Math.PI / 2;

	        this.tail.turnRight();
	    }

	    moveForward() {
	        this.bike.translateX(2);

	        this.tail.moveForward();
	    }
	}

	module.exports = Player;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var North    = __webpack_require__(6);
	var East     = __webpack_require__(8);
	var South    = __webpack_require__(9);
	var West     = __webpack_require__(10);
	var TailPart = __webpack_require__(11);

	class Tail {
	    constructor(color, x, y, z) {
	        this.color = color - 100;
	        this.x     = x;
	        this.y     = y;
	        this.z     = z;

	        this.activeTail = new TailPart(this.color, new North(), x, y, z);

	        this.tails = [this.activeTail];
	    }

	    getTails() {
	        return this.tails;
	    }

	    getActiveTailPart() {
	        return this.activeTail.getPart();
	    }

	    turnLeft() {
	        var delta = this.activeTail.getDelta();

	        if (delta.direction === 'x') {
	            this.activeTail = new TailPart(this.color, this.activeTail.getLeftHeading(), delta.position + this.x, this.y, this.z);
	        } else {
	            this.activeTail = new TailPart(this.color, this.activeTail.getLeftHeading(), this.x, this.y, delta.position + this.z);
	        }

	        this.tails.push(this.activeTail);
	    }

	    turnRight() {
	        this.activeTail = new TailPart(this.color, this.activeTail.getRightHeading(), this.activeTail.getPositionXDelta() + this.x, this.y, this.z);

	        this.tails.push(this.activeTail);
	    }

	    moveForward() {
	        this.activeTail.moveForward();
	    }
	}

	module.exports = Tail;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Heading = __webpack_require__(7);
	var East    = __webpack_require__(8);
	var South   = __webpack_require__(9);
	var West    = __webpack_require__(10);

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
	        return new West();
	    }

	    getRightHeading() {
	        return new East();
	    }
	}

	module.exports = North;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class Heading {
	    constructor(direction, delta, extraSize, name) {
	        this.direction = direction;
	        this.delta     = delta;
	        this.extraSize = extraSize;

	        this.name = name;
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Heading = __webpack_require__(7);
	var North   = __webpack_require__(6);
	var South   = __webpack_require__(9);
	var West    = __webpack_require__(10);

	class East extends Heading {
	    constructor() {
	        super('z', 1, 1);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'z',
	            position: -size
	        };
	    }

	    getLeftHeading() {
	        return new North();
	    }

	    getRightHeading() {
	        return new South();
	    }
	}

	module.exports = East;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Heading = __webpack_require__(7);
	var North   = __webpack_require__(6);
	var East    = __webpack_require__(8);
	var West    = __webpack_require__(10);

	class South extends Heading {
	    constructor() {
	        super('x', 1, -2);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'x',
	            position: size
	        };
	    }

	    getLeftHeading() {
	        return new East();
	    }

	    getRightHeading() {
	        return new West();
	    }
	}

	module.exports = South;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Heading = __webpack_require__(7);
	var North   = __webpack_require__(6);
	var South   = __webpack_require__(9);
	var East    = __webpack_require__(8);

	class West extends Heading {
	    constructor() {
	        super('z', -1, 1);
	    }

	    getFinalDelta(size) {
	        return {
	            direction: 'z',
	            position: -size
	        };
	    }

	    getLeftHeading() {
	        return new South();
	    }

	    getRightHeading() {
	        return new North();
	    }
	}

	module.exports = West;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var North = __webpack_require__(6);
	var East  = __webpack_require__(8);
	var South = __webpack_require__(9);
	var West  = __webpack_require__(10);

	class TailPart {
	    //constructor(color, rotation, x, y, z) {
	    constructor(color, heading, x, y, z) {
	        this.size  = 1;
	        this.color = color;

	        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
	        var material = new THREE.MeshBasicMaterial({ color: this.color });

	        this.tail = new THREE.Mesh(geometry, material);

	        this.tail.position.set(x, y, z);

	        this.direction = 'x';
	        this.delta = 1;
	        this.extraSize = 2;

	this.heading = heading;

	/*
	        this.heading = new North();

	        if (typeof rotation !== 'undefined' && rotation === Math.PI / 2) {
	            //this.tail.rotation.y += rotation;

	            this.direction = 'z';
	            this.delta = -1;
	            this.extraSize = 1;

	            this.heading = new East();
	        }

	        if (typeof rotation !== 'undefined' && rotation === -Math.PI / 2) {
	            //this.tail.rotation.y += rotation;

	            this.direction = 'z';
	            this.delta = 1;
	            this.extraSize = 1;

	            this.heading = new West();
	        }
	*/
	    }

	    getPart() {
	        return this.tail;
	    }

	    moveForward() {
	        //this.size += this.extraSize;
	        this.size += this.heading.getExtraSize();

	        //this.tail.scale[this.direction] = this.size;
	        //this.tail.position[this.direction] += this.delta;
	//console.log(this.heading);
	        this.tail.scale[this.heading.getDirection()] = this.size;
	        this.tail.position[this.heading.getDirection()] += this.heading.getDelta();
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

	module.exports = TailPart;


/***/ }
/******/ ]);