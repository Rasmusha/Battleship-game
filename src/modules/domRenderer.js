import gameController from "./gameController";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

function renderBoards() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const playerCell = document.createElement('div');
            playerCell.classList.add('cell');
            playerCell.dataset.x = x;
            playerCell.dataset.y = y;
            playerBoard.appendChild(playerCell);

            const computerCell = document.createElement('div');
            computerCell.classList.add('cell');
            computerCell.dataset.x = x;
            computerCell.dataset.y = y;
            computerBoard.appendChild(computerCell);
        }
    }
}

function clearBoardVisual(boardElement) {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('ship', 'hit', 'miss');
  });
}

function clearComputerCellListeners() {
  const computerCells = document.querySelectorAll('#computer-board .cell');
  computerCells.forEach(cell => {
    const newCell = cell.cloneNode(true);
    cell.parentNode.replaceChild(newCell, cell);
  });
}

function updateBoards(player, computer) {
    for(let x = 0; x < 10; x++)
        for(let y = 0; y < 10; y++) {
            const playerCellValue = player.gameBoard.board[x][y];
            const computerCellValue = computer.gameBoard.board[x][y];

            const playerCell = document.querySelector(`#player-board .cell[data-x='${x}'][data-y='${y}']`);
            const computerCell = document.querySelector(`#computer-board .cell[data-x='${x}'][data-y='${y}']`);

            if(playerCellValue) {
                playerCell.classList.add('ship');
                if(playerCellValue.isHitAt(x,y)) {
                    playerCell.classList.add('hit');
                }
            }else {
                const isMissed = player.gameBoard.missedAttacks.some(
                    ([mx,my]) => mx === x && my === y
                );
                if(isMissed) {
                    playerCell.classList.add('miss');
                }
            }

            if(computerCellValue && computerCellValue.isHitAt(x,y)) {
                computerCell.classList.add('hit');
            } else {
                const isMissed = computer.gameBoard.missedAttacks.some(
                    ([mx,my]) => mx === x && my === y
                );
                if(isMissed) {
                    computerCell.classList.add('miss');
                }
            }
    }
}

let gameOver = false;
 
function addCellListeners(player,computer) {
    const computerCells = document.querySelectorAll('#computer-board .cell');

    computerCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (gameOver) return;
            const x = parseInt(cell.dataset.x,10);
            const y = parseInt(cell.dataset.y,10);

            const result = gameController.playerAttack(x,y);

            updateBoards(player,computer)

            if(result === 'win') {
                gameOver = true;
                alert('you wim');
            }else if (result === 'lose') {
                gameOver = true;
                alert('you lose');
            }
        }, { once: true });
    })
}

export { renderBoards, updateBoards, addCellListeners, clearBoardVisual, clearComputerCellListeners };