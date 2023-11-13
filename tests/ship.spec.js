const Ship = require('../src/ship');

test('Ship can be hit', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('Ship is sunk when hits equal length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test('Ship is not sunk when hits are less than length', () => {
    const ship  = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false)
});



