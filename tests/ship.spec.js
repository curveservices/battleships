const Ship = require("../src/ship");

describe("Ship", () => {
  test("ship is initialized correctly", () => {
    const ship = new Ship("Battleship", 4);
    expect(ship.name).toBe("Battleship");
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test("ship takes a hit", () => {
    const ship = new Ship("Destroyer", 3);
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.sunk).toBe(false);
  });

  test("ship is sunk after enough hits", () => {
    const ship = new Ship("Submarine", 3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.sunk).toBe(true);
  });

  test("isSunk function works correctly", () => {
    const ship = new Ship("Carrier", 5);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
