const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
    }

    placeShip(ship, x ,y) {
        this.ships.push({ship, x ,y})
    }

    recieveAttack(x, y) {
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

// //Create gameboard class. Grid 10, ships arr, missAttcks arr 
// class Gameboard {
//     constructor() {
//         this.grid = Array.from({length: 10}, () => Array(10).fill(null));
//         this.ships = [];
//         this.missedAttacks = []
//     }
//     //Place ship on grid and coordinates calling Ship factory func
//     placeShip(ship, row, col, isVertical) { 
//         const shipLength = ship.length
//         const shipCoordinates = []
//         //if isVerical loop shipLength. grid row index & col is where ship is. Push ship
//         //else loop for horizontal
//         if (isVertical) {
//             for (let i = 0; i < shipLength; i++) {
//                 this.grid[row + i][col] = ship;
//                 shipCoordinates.push({row: row + i, col})
//             }
//         } else {
//             for (let i = 0; i <shipLength; i++) {
//                 this.grid[row][col + i] = ship;
//                 shipCoordinates.push({row, col: col + i})
//             }
//         }
//         ship = shipCoordinates;
//         this.ships.push(ship);
// }
//     //recieveAttack func takes in row, col.
//     //if not on grid row col return false
//     recieveAttack(row, col) {
//         if (!this.grid[row][col]) {
//             this.missedAttacks.push({row, col})
//             return false;
//         }
//         //Hit ship on grid row col return true
//         const hitShip = this.grid[row][col];
//         hitShip.hit();
//         return true;
//     } 

//     allShipsSunk() {
//         return this.ships.every(({ship}) => ship.isSunk());
//       }
//     }

module.exports = Gameboard