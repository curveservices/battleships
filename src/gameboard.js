import Ship from "./ship";

class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
    }

    placeShip(ship, x ,y) {
        this.ships.push({ ship, x ,y })
    }

    receiveAttack(x, y) {
        let hit = false;

        this.ships.forEach((shipInfo) => {
            const { ship, x: shipX, y: shipY } = shipInfo;
            if (x === shipX && y === shipY) {
                ship.hit();
                hit = true;
            }
        });

        if (!hit) {
            this.missedAttacks.push({ x, y});
        }
    }

    allShipsSunk() {
        return this.ships.every((shipInfo) => shipInfo.ship.isSunk())
    }
}

module.exports = Gameboard