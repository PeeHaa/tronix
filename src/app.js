var Main   = require('./main.js');
var Player = require('./Player.js');

var main = new Main();

main.addPlayer(new Player(0x00ff00));

main.run();
