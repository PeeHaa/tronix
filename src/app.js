const Main   = require('./Main.js');
const Player = require('./Player/Player.js');

const main = new Main();

main.addPlayer(new Player(0x00ff00));

main.run();
