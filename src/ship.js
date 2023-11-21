//Create a ship class/factory include length & hits 0
class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits +=1;
        if (this.hits === this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}

export default Ship;