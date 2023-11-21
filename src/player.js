//Create player class
class Player {
    constructor(name, gameboard) {
        this.name = name;
        this.gameboard = gameboard;
    }
    
    attack(x, y) {
        this.gameboard.receiveAttack(x, y);
    }
  }

  class Computer {
      constructor(gameboard) {
          this.gameboard = gameboard;
          this.attackedCoordinates = [];
      }

      getRandomCoordinate() {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          return { x, y};
      }

      attack() {
          let coordinates;
          do {
              coordinates = this.getRandomCoordinate();
          } while (this.attackedCoordinates.some(coord => coord.x === coordinates.x && coord.y === coordinates.y));

          this.attackedCoordinates.push(coordinates);
          this.gameboard.receiveAttack(coordinates.x, coordinates.y);
      }
  }

module.exports = { Player, Computer }