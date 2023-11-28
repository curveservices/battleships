// gameboard.js
class Gameboard {
  constructor(color, user) {
    this.color = color;
    this.user = user;
    this.width = 10;
    this.ships = [];
    this.notDropped = null;
    this.draggedShip = null;
    this.boardBlocks = [];
    this.angle = 0;
    this.createBoard();
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dropShip = this.dropShip.bind(this);
    this.highLightArea = this.highLightArea.bind(this);
    this.addShipPiece = this.addShipPiece.bind(this);
  }

  createBoard() {
    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.classList.add("game-board");
    gameBoardContainer.style.background = this.color;
    gameBoardContainer.id = this.user;

    for (let i = 0; i < this.width * this.width; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.id = i;
      gameBoardContainer.append(block);
      this.boardBlocks.push(block);
    }
    document.getElementById("gamesboard-container").append(gameBoardContainer);
  }

  getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
    const validStart = isHorizontal
      ? startIndex <= this.width * this.width - ship.length
        ? startIndex
        : this.width * this.width - ship.length
      : startIndex <= this.width * this.width - this.width * ship.length
      ? startIndex
      : startIndex - ship.length * this.width + this.width;

    let shipBlocks = [];

    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
      } else {
        shipBlocks.push(allBoardBlocks[Number(validStart) + i * this.width]);
      }
    }

    let valid;

    if (isHorizontal) {
      shipBlocks.every(
        (_shipBlock, index) =>
          (valid =
            shipBlocks[0].id % this.width !==
            this.width - (shipBlocks.length - (index + 1))),
      );
    } else {
      shipBlocks.every(
        (_shipBlock, index) =>
          (valid = shipBlocks[0].id < 90 + (this.width * index + 1)),
      );
    }

    const notTaken = shipBlocks.every(
      (shipBlock) => !shipBlock.classList.contains("taken"),
    );

    return { shipBlocks, valid, notTaken };
  }

  addShipPiece(user, ship, startId) {
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);
    let randomBoolean = Math.random() < 0.5;
    let isHorizontal = user === "player" ? this.angle === 0 : randomBoolean;

    let randomStartIndex = Math.floor(Math.random() * this.width * this.width);
    let startIndex = startId ? startId : randomStartIndex;

    const { shipBlocks, valid, notTaken } = this.getValidity(
      allBoardBlocks,
      isHorizontal,
      startIndex,
      ship,
    );

    if (valid && notTaken) {
      shipBlocks.forEach((shipBlock) => {
        shipBlock.classList.add(ship.name);
        shipBlock.classList.add("taken");
      });
      this.ships.push(ship);
    } else {
      if (user === "computer") this.addShipPiece(user, ship, startId);
      if (user === "player") this.notDropped = true;
    }
  }

  //Drag player ships
  dragStart(e) {
    this.notDropped = false;
    this.draggedShip = e.target;
  }

  dragOver(e) {
    e.preventDefault();
    const ship = this.ships[this.draggedShip.id];
    this.highLightArea(e.target.id, ship);
  }

  dropShip(e) {
    e.preventDefault();
    const startId = e.target.id;
    const ship = this.ships[this.draggedShip.id];
    this.addShipPiece("player", ship, startId);
    if (!this.notDropped) {
      this.draggedShip.remove();
    }
  }

  //Add highliht
  highLightArea(startIndex, ship) {
    const allBoardBlocks = document.querySelectorAll("#player div");
    let isHorizontal = this.angle === 0;

    const { shipBlocks, valid, notTaken } = this.getValidity(
      allBoardBlocks,
      isHorizontal,
      startIndex,
      ship,
    );

    if (valid && notTaken) {
      shipBlocks.forEach((shipBlock) => {
        shipBlock.classList.add("hover");
        setTimeout(() => shipBlock.classList.remove("hover"), 200);
      });
    }
  }
}

export default Gameboard;
