const Gameboard = require('../src/gameboard');
const Ship = require('../src/ship');

test('Gameboard can place a ship', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 1, 2, true);
    expect(gameboard.ships.length).toBe(1,2)
});

test('Gameboard can receive an attack and hit ship', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 1, 2, true);
    gameboard.recieveAttack(1, 2, true);
    expect(ship.hits).toBe(1);
});

test('Gameboard reports all ships sunk', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 1, 2);
    gameboard.placeShip(ship2, 4, 5);
    ship1.hit();
    ship1.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(gameboard.allShipsSunk()).toBe(true)
})