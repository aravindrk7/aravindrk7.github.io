export default class Pieces {
    constructor(image, x, y, sx, sy, counter) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.counter = counter;
    }
    show() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext('2d');
        context.drawImage(this.image, this.x, this.y, size, size, this.sx, this.sy, size, size);
    }
}