const Gameboard = require("../src/gameboard");
const Ship = require("../src/ship");

describe("Gameboard", () => {
  test("placing a ship on board", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier", 5);

    gameboard.placeShip(ship, 0, 0, true);

    expect(gameboard.ships).toContain(ship);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBe(ship);
    expect(gameboard.board[0][4]).toBe(ship);
  });

  test("placing overlap ships throws error", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship("Carrier", 5);
    const ship2 = new Ship("Battleship", 4);

    gameboard.placeShip(ship1, 0, 0, true);

    expect(() => gameboard.placeShip(ship2, 0, 0)).toThrow(
      "Invalid ship placement",
    );
  });

  test("receiving a missed attck", () => {
    const gameboard = new Gameboard();

    gameboard.receiveAttack(0, 0);

    expect(gameboard.missedAttacks).toContainEqual({ row: 0, col: 0 });
  });

  test("Receiving successful attck on ship", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Destroyer", 3);
    gameboard.placeShip(ship, 0, 0, true);

    gameboard.receiveAttack(0, 0);

    expect(ship.hits).toBe(1);
  });

  test("allShipsSunk returns true when all ships are sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Submarine", 3);
    gameboard.placeShip(ship, 0, 0, true);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
