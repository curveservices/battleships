const Gameboard = require('../src/gameboard');
const { Player, Computer } = require('../src/player');
const Ship = require('../src/ship');

test('player can attack enemy gameboard', () => {
    const enemyGameboard = new Gameboard;
    const player = new Player('Player', enemyGameboard);
    const ship = new Ship(3);

    enemyGameboard.placeShip(ship, 0, 0);
    player.attack(0, 0);
    expect(ship.hits).toBe(1);
});

 test('computer can make random attack on enemy gameboard', () => {
     const playerGameboard = new Gameboard;
     const computer = new Computer;
     const ship = new Ship(2);

     playerGameboard.placeShip(ship, 0, 0)
     computer.attack(0,0);
     expect(playerGameboard.missedAttacks.length).toBe(1);
     expect(playerGameboard.ship.hits).toBe(1)
 })