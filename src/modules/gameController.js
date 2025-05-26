import Player from "../models/Player";

const gameController = (() => {
    let player;
    let computer;
    let currentPlayer

    function startGame() {
        player = new Player('Human');
        computer = new Player('Computer')
        currentPlayer = player;
        
        player.gameBoard.placeShip(1, 1, 5, "horizontal");
        player.gameBoard.placeShip(2, 1, 4, "horizontal");
        player.gameBoard.placeShip(3, 1, 3, "horizontal");
        player.gameBoard.placeShip(4, 1, 3, "horizontal");
        player.gameBoard.placeShip(5, 1, 2, "horizontal");

        computer.gameBoard.placeShip(1, 1, 5, "horizontal");
        computer.gameBoard.placeShip(2, 1, 4, "horizontal");
        computer.gameBoard.placeShip(3, 1, 3, "horizontal");
        computer.gameBoard.placeShip(4, 1, 3, "horizontal");
        computer.gameBoard.placeShip(5, 1, 2, "horizontal");
    }

    function playerAttack(x,y) {
        player.playerAttack(x,y,computer)
        if(computer.gameBoard.allShipsSunk()) {
            return 'win';
        }
        switchTurns()
        computerAttack();
        return 'continue';
    }

    function computerAttack() {
        computer.computerAttack(player);
        if(player.gameBoard.allShipsSunk()) {
            return 'lose';
        }
        switchTurns();
        return 'continue';
    }

    function switchTurns() {
        currentPlayer = currentPlayer === player ? computer : player;
    }
    return {
    startGame,
    playerAttack,
    computerAttack,
    switchTurns
};
})