import Ship from "./ship"

const app = () => {
    const gamesBoardContainer = document.getElementById('gamesboard-container')
    const optionContainer = document.querySelector('.option-container')
    const flipButton = document.getElementById('flip-button')
    const startButton = document.getElementById('start-button')
    const infoDisplay = document.getElementById('info')
    const turnDisplay = document.getElementById('turn-display')

    //Flip ship vert or horiz
    let angle = 0
    function flip() {
        const optionShips = Array.from(optionContainer.children)
        angle = angle === 0 ? 90 : 0
        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
    }

    flipButton.addEventListener('click', flip);

    flip();
    //Create gamesboard
    const width = 10;

    function createBoard(color, user) {
        const gameBoardContainer = document.createElement('div');
        gameBoardContainer.classList.add('game-board');
        gameBoardContainer.style.background = color;
        gameBoardContainer.id = user;

        for (let i = 0; i < width * width; i++) {
           const block = document.createElement('div');
           block.classList.add('block');
           block.id = i;
           gameBoardContainer.append(block)
        }

         gamesBoardContainer.append(gameBoardContainer);
    }

    createBoard('#0077be', 'player')
    createBoard('seagreen', 'computer')
    
    //Create ships
    const destroyer = new Ship('destroyer', 2);
    const submarine = new Ship('submarine', 3);
    const cruiser = new Ship('cruiser', 3);
    const battleship = new Ship('battleship', 4);
    const carrier = new Ship('carrier', 5)

    const ships = [destroyer, submarine, cruiser, battleship, carrier]
    let notDropped

    function getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
        let validStart = isHorizontal ? startIndex <= width * width - ship.length ? startIndex :
            width * width - ship.length :
            //Handle vertical
            startIndex <= width * width - width * ship.length ? startIndex : 
                startIndex - ship.length * width + width

        let shipBlocks = [];

        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                shipBlocks.push(allBoardBlocks[Number(validStart) + i])
            } else {
                shipBlocks.push(allBoardBlocks[Number(validStart) + i * width])
            }
        };
        let valid;

        if (isHorizontal) {
        shipBlocks.every((_shipBlock, index) =>
           valid = shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1)))
        } else {
            shipBlocks.every((_shipBlock, index) =>
                valid = shipBlocks[0].id < 90 + (width * index + 1))
        }

        const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

        return { shipBlocks, valid, notTaken}
    }

    function addShipPiece(user, ship, startId) {
        const allBoardBlocks = document.querySelectorAll(`#${user} div`)
        let randomBoolean = Math.random() < 0.5
        let isHorizontal = user === 'player' ? angle === 0 : randomBoolean
        let randomStartIndex = Math.floor(Math.random() * width * width)

        let startIndex = startId ? startId : randomStartIndex

        const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

        if (valid && notTaken) {
            shipBlocks.forEach(shipBlock => {
                shipBlock.classList.add(ship.name)
                shipBlock.classList.add('taken')
            })
        } else {
            if (user === 'computer') addShipPiece(user, ship, startId)
            if (user === 'player') notDropped = true
        };
    };

    ships.forEach(ship => addShipPiece('computer', ship))

    //Drag player ships
    let draggedShip
    const optionShips = Array.from(optionContainer.children)
    optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))

    const allPlayerBlocks = document.querySelectorAll('#player div')
    allPlayerBlocks.forEach(playerBlock => {
        playerBlock.addEventListener('dragover', dragOver)
        playerBlock.addEventListener('drop', dropShip)
    })

    function dragStart(e) {
        notDropped = false
        draggedShip = e.target
    }

    function dragOver(e) {
        e.preventDefault()
        const ship = ships[draggedShip.id]
        highLightArea(e.target.id, ship)
    }

    function dropShip(e) {
        const startId = e.target.id
        const ship = ships[draggedShip.id]
        addShipPiece('player', ship, startId)
        if (!notDropped) {
            draggedShip.remove()
        }
    }

    //Add highliht
    function highLightArea(startIndex, ship) {
        const allBoardBlocks = document.querySelectorAll('#player div')
        let isHorizontal = angle === 0

        const { shipBlocks, valid, notTaken} = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

        if (valid && notTaken) {
            shipBlocks.forEach(shipBlock => {
                shipBlock.classList.add('hover')
                setTimeout(() => shipBlock.classList.remove('hover'), 500)
            })
        }
    }

    let gameOver = false
    let playerTurn

    function startGame() {
        if (optionContainer.children.length != 0) {
            infoDisplay.textContent = 'Please place all of your ships!';
        } else {
            const allBoardBlocks = document.querySelectorAll('#computer div')
            allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
        }
    }

    startButton.addEventListener('click', startGame)

    let playerHits = []
    let computerHits = []
    const playerSunkShips = []
    const computerSunkShips = []
    

    function handleClick(e) {
        if (!gameOver) {
            if (e.target.classList.contains('taken')) {
                e.target.classList.add('boom')
                infoDisplay.textContent = 'You hit the computers ship!'
                let classes = Array.from(e.target.classList)
                classes = classes.filter(className => className !== 'block')
                classes = classes.filter(className => className !== 'boom')
                classes = classes.filter(className => className !== 'taken')
                playerHits.push(...classes)
                checkScore('player', playerHits, playerSunkShips)
            }
            if (!e.target.classList.contains('empty')) {
                infoDisplay.textContent = 'Nothing hit this time'
                e.target.classList.add('empty')
            }
            playerTurn = false
            const allBoardBlocks = document.querySelectorAll('#computer div')
            allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
            setTimeout(computerGo, 3000)
        }
    }

    //Define the computers go
    function computerGo() {
        if (!gameOver) {
            turnDisplay.textContent = ' Computers Go!'
            infoDisplay.textContent = 'The computer is thinking...'

            setTimeout(() => {
                let randomGo = Math.floor(Math.random() * width * width)
                const allBoardBlocks = document.querySelectorAll('#player div')

                if (allBoardBlocks[randomGo].classList.contains('taken') &&
                    allBoardBlocks[randomGo].classList.contains('boom')
                    ) {
                        computerGo()
                        return
                    } else if (
                        allBoardBlocks[randomGo].classList.contains('taken') &&
                        !allBoardBlocks[randomGo].classList.contains('boom')
                        ) {
                            allBoardBlocks[randomGo].classList.add('boom')
                            infoDisplay.textContent = 'The computer hit your ship'
                            let classes = Array.from(e.target.classList)
                            classes = classes.filter(className => className !== 'block')
                            classes = classes.filter(className => className !== 'boom')
                            classes = classes.filter(className => className !== 'taken')
                            computerHits.push(...classes)
                        } else {
                            infoDisplay.textContent= 'Nothing hit this time'
                            allBoardBlocks[randomGo].classList.add('empty')
                        }
            }, 3000)

            setTimeout(() => {
                playerTurn = true
                turnDisplay.textContent = 'Your Go!'
                infoDisplay.textContent = 'Please take your go.'
                const allBoardBlocks = document.querySelectorAll('#computer div')
                allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
            }, 6000)
        }
    }    

    function checkScore() {

    }
}

export default app