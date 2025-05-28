import Ship from "./Ship";

class Gameboard{
    constructor(ships = [], missedAttacks = [], attacksMade = []) {
        this.ships = ships
        this.missedAttacks = missedAttacks;
        this.attacksMade = attacksMade
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    }

    placeShip(x,y,length,direction){
        const ship = new Ship(length);
        const coordinates = [];
        

        for(let i = 0; i < length; i++) {
          let currentX = x;
          let currentY = y;

          if(direction === "horizontal") {
            currentY = y + i;
          }else if(direction === "vertical") {
            currentX = x + i;
          }
          
          if(currentX >= 10 || currentY >= 10) {
            throw new Error("Ship out of bounds");
          }

          if(this.board[currentX][currentY] !== null) {
            throw new Error("Cell already occupied");
          }

          coordinates.push([currentX,currentY]);
        }

        ship.coordinates = coordinates;

        for(const[x,y] of coordinates) {
            this.board[x][y] = ship;
        }

        this.ships.push({ship, coordinates})
    }

    clearBoard() {
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));

        this.ships = [];

        this.missedAttacks = [];

        this.attacksMade = [];
    }

    receiveAttack(x,y) {
        if(x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
            return "invalid";
        }

        if(this.attacksMade.some(coord => coord[0] === x && coord[1] === y)) {
          return "already attacked";
        }

        this.attacksMade.push([x, y]);

        const target = this.board[x][y];
        if(target != null) {
          target.hit(x,y);
          console.log('hit');
          return "hit";
        } else {
          this.missedAttacks.push([x,y]);
           console.log('miss');
          return "miss";
        }
        
    }
    
    allShipsSunk() {
        let sunkenShips = 0;

        for(const ships of this.ships) 
            if(ships.ship.isSunk()) {
                sunkenShips++
            }
        return sunkenShips === this.ships.length        
    }
}

export default Gameboard;