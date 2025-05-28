import Gameboard from "./Gameboard";

class Player{
    constructor(name,isComputer = false) {
        this.name = name;
        this.gameBoard = new Gameboard();
        this.isComputer = isComputer;
        this.attacksMade = [];
    }

    attack(x, y, opponent) {
        return opponent.gameBoard.receiveAttack(x,y);
    }

    computerAttack(opponent) {
        let x,y,key;
        do {
           x = Math.floor(Math.random() * 10);
           y = Math.floor(Math.random() * 10);
           key = `${x},${y}`;
        }while(this.attacksMade.includes(key));

        this.attacksMade.push(key);
        return opponent.gameBoard.receiveAttack(x,y);
    }
}

export default Player