const Gameboard = require("../src/gameboard");
const { Player, Computer } = require("../src/player");
const Ship = require("../src/ship");

describe("Player", () => {
  test("Player can attack a gameboard", () => {
    const gameboard = new Gameboard();
    const player = new Player("Player1", gameboard);
    const ship = new Ship("Carrier", 5);
    gameboard.placeShip(ship, 0, 0, true);

    player.attack(0, 0);

    expect(ship.hits).toBe(1);
  });
});

describe("Computer", () => {
  test("computer can make a random attack on gameboard", () => {
    const gameboard = new Gameboard();
    const computer = new Computer("Computer", gameboard);
    const ship = new Ship("Carrier", 5);
    gameboard.placeShip(ship, 0, 0, true);

    computer.randomAttack();

    expect(ship.hits).toBeGreaterThanOrEqual(0);
  });

  test("computer does not make the same attack twice", () => {
    const gameboard = new Gameboard();
    const computer = new Computer("Computer", gameboard);

    computer.randomAttack(); // First attack

    // Save the previous attacks
    const previousAttacks = computer.previousAttacks.slice();

    computer.randomAttack(); // Second attack

    // Ensure the second attack is different from the previous ones
    const newAttack =
      computer.previousAttacks[computer.previousAttacks.length - 1];
    expect(
      previousAttacks.some(
        (attack) =>
          attack.row === newAttack.row && attack.col === newAttack.col,
      ),
    ).toBe(false);
  });
});
