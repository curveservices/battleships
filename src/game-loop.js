import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import Computer from "./computer";

const gameLoop = () => {
  const optionContainer = document.querySelector(".option-container");
  const flipButton = document.getElementById("flip-button");
  const startButton = document.getElementById("start-button");
  const infoDisplay = document.getElementById("info");
  const turnDisplay = document.getElementById("turn-display");

  //Create ships
  const destroyer = new Ship("destroyer", 2);
  const submarine = new Ship("submarine", 3);
  const cruiser = new Ship("cruiser", 3);
  const battleship = new Ship("battleship", 4);
  const carrier = new Ship("carrier", 5);

  //Create gamesboard
  const playerBoard = new Gameboard("#0077be", "player");
  const computerBoard = new Gameboard("seagreen", "computer");

  // Create players
  const player = new Player();
  const computer = new Computer();

  // Add ships to player and comupter
  player.ships = [destroyer, submarine, cruiser, battleship, carrier];
  player.ships.forEach((ship) => playerBoard.addShipPiece("computer", ship));

  //Drag player ships
  const optionShips = Array.from(optionContainer.children);
  optionShips.forEach((optionShip) =>
    optionShip.addEventListener("dragstart", playerBoard.dragStart),
  );

  const allPlayerBlocks = document.querySelectorAll("#player div");
  allPlayerBlocks.forEach((playerBlock) => {
    playerBlock.addEventListener("dragover", (e) => {
      playerBoard.dragOver(e, playerBoard.angle);
    });
    playerBlock.addEventListener("drop", (e) => {
      playerBoard.dropShip(e, playerBoard.angle);
    });
  });

  //Flip ship vertical or horizontal
  function flip() {
    const optionShips = Array.from(optionContainer.children);
    playerBoard.angle = playerBoard.angle === 90 ? 0 : 90;
    optionShips.forEach(
      (optionShip) =>
        (optionShip.style.transform = `rotate(${playerBoard.angle}deg)`),
    );
  }

  flipButton.addEventListener("click", flip);

  function startGame() {
    if ((player.playerTurn = true)) {
      if (optionContainer.children.length != 0) {
        infoDisplay.textContent = "Please place all of your ships first!";
      } else {
        const allBoardBlocks = document.querySelectorAll("#computer div");
        allBoardBlocks.forEach((block) =>
          block.addEventListener("click", handleClick),
        );
        player.playerTurn = true;
        turnDisplay.classList.add("show");
        turnDisplay.textContent = "Your Go!";
        infoDisplay.classList.add("show");
        infoDisplay.textContent = "The game has started";
      }
    }
  }

  startButton.addEventListener("click", startGame);

  function handleClick(e) {
    if (!player.gameOver || !computer.gameOver) {
      if (e.target.classList.contains("boom")) {
        infoDisplay.textContent = "Target already hit";
        return;
      }

      if (e.target.classList.contains("taken")) {
        e.target.classList.add("boom");
        infoDisplay.textContent = `You hit the Admiral Bot's ship!`;
        e.target.innerHTML = "💥";
        let classes = Array.from(e.target.classList);
        classes = classes.filter((className) => className !== "block");
        classes = classes.filter((className) => className !== "boom");
        classes = classes.filter((className) => className !== "taken");
        player.hits.push(...classes);
        checkScore("player", player.hits, player.sunkShips);
      }
      if (!e.target.classList.contains("taken")) {
        infoDisplay.textContent = "Nothing hit this time";
        e.target.classList.add("empty");
        e.target.innerHTML = "💦";
      }
      player.playerTurn = false;
      const allBoardBlocks = document.querySelectorAll("#computer div");
      allBoardBlocks.forEach((block) =>
        block.replaceWith(block.cloneNode(true)),
      );
      setTimeout(computerGo, 1000);
    }
  }

  //Define the computers go
  function computerGo() {
    if (!computer.gameOver && !player.gameOver) {
      turnDisplay.textContent = " Admiral Bot's Go!";
      infoDisplay.textContent = "Admiral Bot is thinking...";

      setTimeout(() => {
        let randomGo = Math.floor(
          Math.random() * playerBoard.width * playerBoard.width,
        );
        const allBoardBlocks = document.querySelectorAll("#player div");

        if (
          allBoardBlocks[randomGo].classList.contains("taken") &&
          allBoardBlocks[randomGo].classList.contains("boom")
        ) {
          computerGo();
          return;
        } else if (
          allBoardBlocks[randomGo].classList.contains("taken") &&
          !allBoardBlocks[randomGo].classList.contains("boom")
        ) {
          allBoardBlocks[randomGo].classList.add("boom");
          infoDisplay.textContent = "Admiral Bot hit your ship";
          allBoardBlocks[randomGo].innerHTML = "💥";
          let classes = Array.from(allBoardBlocks[randomGo].classList);
          classes = classes.filter((className) => className !== "block");
          classes = classes.filter((className) => className !== "boom");
          classes = classes.filter((className) => className !== "taken");
          computer.hits.push(...classes);
          checkScore("computer", computer.hits, computer.sunkShips);
        } else {
          infoDisplay.textContent = "Nothing hit this time";
          allBoardBlocks[randomGo].classList.add("empty");
          allBoardBlocks[randomGo].innerHTML = "💦";
        }
      }, 1500);

      setTimeout(() => {
        player.playerTurn = true;
        turnDisplay.textContent = "Your Go!";
        infoDisplay.textContent = "Please take your go.";
        const allBoardBlocks = document.querySelectorAll("#computer div");
        allBoardBlocks.forEach((block) =>
          block.addEventListener("click", handleClick),
        );
      }, 2000);
    }
  }

  function checkScore(user, userHits, userSunkShips) {
    function checkShip(shipName, shipLength) {
      if (
        userHits.filter((storedShipName) => storedShipName === shipName)
          .length === shipLength
      ) {
        infoDisplay.textContent = `You sunk the ${user}'s ${shipName}`;
        if (user === "player") {
          infoDisplay.textContent = `You sunk Admiral Bot\'s ${shipName}`;
          player.hits = userHits.filter(
            (storedShipName) => storedShipName !== shipName,
          );
        }
        if (user === "computer") {
          infoDisplay.textContent = `The Admiral Bot sunk your ${shipName}`;
          computer.hits = userHits.filter(
            (storedShipName) => storedShipName !== shipName,
          );
        }
        userSunkShips.push(shipName);
      }
    }
    checkShip("destroyer", 2);
    checkShip("submarine", 3);
    checkShip("cruiser", 3);
    checkShip("battleship", 4);
    checkShip("carrier", 5);

    console.log("playerHits", player.hits);
    console.log("playerSunkShips", player.sunkShips);

    if (player.sunkShips.length === 5) {
      infoDisplay.textContent = "You sunk all of Admiral Bot's ships. YOU WIN!";
      player.gameOver = true;
    }
    if (computer.sunkShips.length === 5) {
      infoDisplay.textContent = "The Admiral Bot has sunk all ships. YOU LOST!";
      computer.gameOver = true;
    }
  }
};

export default gameLoop;
