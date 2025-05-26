class Ship {
    constructor(length,timesHit = 0,sunk = false) {
        this.length = length;
        this.timesHit = timesHit;
        this.sunk = sunk;
    }

    hit() {
        this.timesHit++;
    }

    isSunk() {
        return this.timesHit >= this.length;
    }
}

export default Ship;