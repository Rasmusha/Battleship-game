class Ship {
    constructor(length) {
        this.length = length;
        this.coordinates = [];
        this.hits = [];   
    }

    hit(x,y) {
        this.hits.push([x,y]);
    }

    isHitAt(x,y) {
        return this.hits.some(([hx, hy]) => hx === x && hy === y);
    }

   isSunk() {
    return this.coordinates.every(([x, y]) =>
        this.hits.some(([hx, hy]) => hx === x && hy === y)
    );
}
}

export default Ship;