import Player from "../models/Player";

const gameController = (() => {
    let player;
    let computer;
    let currentPlayer

    function startGame() {
        player = new Player('Human');
        computer = new Player('Computer')
        currentPlayer = player;
    }

     function getPlayer() {
        return player;
    }

     function getComputer() {
        return computer;
    }

    function playerAttack(x,y) {
        player.attack(x,y,computer)
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
    switchTurns,
    getPlayer,
    getComputer
};
})(); 
export default gameController;
