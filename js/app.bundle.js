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
	var Player = __webpack_require__(2);

	var main = new Main();

	main.addPlayer(new Player(0x00ff00));

	main.run();


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Main {
	    constructor() {
	        this.scene    = new THREE.Scene();

	        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

	        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	        //this.scene.add(this.camera);
	        this.camera.position.set(0,150,400);
	        this.camera.lookAt(this.scene.position);

	        //this.camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	        this.renderer = new THREE.WebGLRenderer();

	        this.renderer.setSize(window.innerWidth, window.innerHeight);

	        document.body.appendChild(this.renderer.domElement);

	        //this.camera.position.z = 5;

	        this.addFloor();

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

	    addFloor() {
	        var floorTexture   = new THREE.TextureLoader().load('/images/floor.jpg');
	        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;

	        floorTexture.repeat.set(10, 10);

	        var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
	        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

	        var floor = new THREE.Mesh(floorGeometry, floorMaterial);

	        floor.position.y = -0.5;
	        floor.rotation.x = Math.PI / 2;

	        this.scene.add(floor);
	    }

	    addPlayer(player) {
	        this.players.push(player);

	        this.scene.add(player.getBike());
	        this.scene.add(player.getActiveTailPart());

	        player.getBike().add(this.camera);

	        this.camera.y = Math.PI / 2;
	    }
	}

	module.exports = Main;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Tail  = __webpack_require__(3);

	class Player {
	    constructor(color) {
	        var geometry = new THREE.BoxGeometry(50, 50, 20);
	        var material = new THREE.MeshBasicMaterial({ color: color });

	        this.bike = new THREE.Mesh(geometry, material);

	        this.tail = new Tail(color);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Tail = __webpack_require__(4);

	class Tail {
	    constructor(color) {
	        this.color = color;
	        this.activeTail = new TailPart(this.color);

	        this.tails = [this.activeTail];
	    }

	    getTails() {
	        return this.tails;
	    }

	    getActiveTailPart() {
	        this.activeTail;
	    }

	    turnLeft() {
	        this.activeTail = new TailPart(this.color, Math.PI / 2);

	        this.tails.push(this.activeTail);
	    }

	    turnRight() {
	        this.activeTail = new TailPart(this.color, -Math.PI / 2);

	        this.tails.push(this.activeTail);
	    }

	    moveForward() {
	        this.activeTail.moveForward();
	    }
	}

	module.exports = Tail;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class TailPart {
	    constructor(color, rotation) {
	        this.size  = 1;
	        this.color = color;

	        var geometry = new THREE.BoxGeometry(this.size, 40, 2);
	        var material = new THREE.MeshBasicMaterial({ color: this.color });

	        this.tail = new THREE.Mesh(geometry, material);

	        if (typeof rotation !== 'undefined') {
	            this.tail.rotation.y += rotation;
	        }
	    }

	    moveForward() {
	        this.size += 2;

	        this.tail.scale.x = this.size;
	        this.tail.position.x += 1;
	    }
	}

	module.exports = TailPart;


/***/ }
/******/ ]);