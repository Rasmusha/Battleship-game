import './styles.css'
import gameController from './modules/gameController.js';
import { renderBoards, updateBoards, addCellListeners, clearBoardVisual, clearComputerCellListeners } from './modules/domRenderer.js';

const randomPlaceBtn = document.getElementById('random-place-btn');
const restartBtn = document.getElementById('restart');
const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const messageDiv = document.getElementById('message');
const startGameBtn = document.getElementById('start-game-btn');

restartBtn.addEventListener('click', () => {
    gameController.startGame();
    const player = gameController.getPlayer();
    const computer = gameController.getComputer();
    clearBoardVisual(playerBoard);
    clearBoardVisual(computerBoard);
    player.gameBoard.clearBoard();
    computer.gameBoard.clearBoard();
    clearComputerCellListeners();
    updateBoards(player, computer);
    randomPlaceBtn.classList.remove('hidden');
    startGameBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');
    messageDiv.textContent = "Place your ships to begin.";
})

startGameBtn.addEventListener('click', () => {
    const player = gameController.getPlayer();
    const computer = gameController.getComputer();

    updateBoards(player,computer);

    clearComputerCellListeners();
    addCellListeners(player,computer);

    randomPlaceBtn.classList.add('hidden');
    startGameBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
})

randomPlaceBtn.addEventListener('click', () => {
    gameController.startGame();
    const player = gameController.getPlayer();
    const computer = gameController.getComputer();

    clearBoardVisual(playerBoard);
    clearBoardVisual(computerBoard);
    player.gameBoard.clearBoard();
    computer.gameBoard.clearBoard();
    placeShipsRandomly(player); 
    placeShipsRandomly(computer);
    updateBoards(player, computer);
    startGameBtn.classList.remove('hidden');
});

renderBoards();

function placeShipsRandomly(player) {
  const shipsToPlace = [
    { length: 5, name: 'Carrier' },
    { length: 4, name: 'Battleship' },
    { length: 3, name: 'Cruiser' },
    { length: 3, name: 'Submarine' },
    { length: 2, name: 'Destroyer' }
  ];

  const directions = ['horizontal', 'vertical'];

  player.gameBoard.clearBoard(); 
 
  for (const ship of shipsToPlace) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = directions[Math.floor(Math.random() * directions.length)];
      try {
        player.gameBoard.placeShip(x, y, ship.length, direction);
        placed = true;
      } catch {
      }
    }
  }
}



