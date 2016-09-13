var Main   = require('./Main.js');
var Player = require('./Player/Player.js');

var main = new Main();

main.addPlayer(new Player(0x00ff00));

main.run();
