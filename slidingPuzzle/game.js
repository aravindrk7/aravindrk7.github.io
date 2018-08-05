//Import Pieces class
import Pieces from './pieces.js';

window.c = 0;
window.win = 0;
window.size = 133.33;
window.correctPieces = [1, 2, 3, 4, 5, 6, 7, 8, 0];
window.tempPieces = [];
window.ranPieces = [];


//Creating canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var sides = canvas.getBoundingClientRect();

window.movesTaken = 0;
var movesHolder = document.getElementById("moves");

var score = 500001;
var scoreHolder = document.getElementById("score");

var img = document.getElementById("puzzle");
var empty = document.getElementById("empty");

var sec = -1;
var time = document.getElementById("time");

window.setGame = function(){
    win = 0;
    movesTaken = 0;
    movesHolder.innerHTML = movesTaken;
    score = 500001;
    scoreHolder.innerHTML = score;
    sec = -1;
    generateRandomPieces();
}

setInterval(timer, 1000);
function timer() {
    sec++;
    time.innerHTML = sec;
    score -= sec;
    scoreHolder.innerHTML = score;
}

window.mover = function () {
    movesTaken++;
    movesHolder.innerHTML = movesTaken;
    score -= movesTaken * 5;
    scoreHolder.innerHTML = score;
}

generateRandomPieces();
function generateRandomPieces() {
    ranPieces = [];
    for (var i = 1; i < 9;) {
        c = 0;
        var number = Math.floor((Math.random() * 9));
        for (var j = 0; j <= ranPieces.length; j++) {
            if (number == ranPieces[j] || number == 8) {
                c++;
            }
        }
        if (c == 0) {
            ranPieces.push(number);
            i++
        }
        else {
            number = Math.floor((Math.random() * 9));
        }
    }
    ranPieces.push(8);
    inversion();
}


function generateArray(row, col) {
    window.pieces = new Array(row);
    for (var i = 0; i < pieces.length; i++) {
        pieces[i] = new Array(col);
    }
}

function generate2dArray(row, col) {
    window.pieces2d = new Array(row);
    for (var i = 0; i < pieces2d.length; i++) {
        pieces2d[i] = new Array(col);
    }

    var counter = 0;
    for (var row = 0; row < pieces.length; row++) {
        for (var col = 0; col < 3; col++) {
            pieces2d[counter] = [col, row];
            counter++;
        }
    }

}


//inversion();
function inversion() {
    //var a = [1,8,2,4,3,7,6,5];
    var k = 0;
    var total = 0;
    for (var i = 0; i < ranPieces.length - 1; i++) {
        k = 0;
        for (var j = i + 1; j < ranPieces.length - 1; j++) {
            if (ranPieces[i] > ranPieces[j]) {
                k++;
            }
        }
        total = total + k;
    }
    if (total % 2 == 0) {
        console.log("solvable" + total);
        createPieces();
    }
    else {
        console.log("insolvable" + total);
        generateRandomPieces();
    }
}

//createPieces();
function createPieces() {
    generateArray(3, 3);
    generate2dArray(9, 2);
    console.log(ranPieces);
    var row = 0;
    var col = 0;
    var counter = 1;
    for (var row2d = 0; row2d < ranPieces.length; row2d++) {
        var col1 = pieces2d[ranPieces[row2d]][0];
        var col2 = pieces2d[ranPieces[row2d]][1];
        console.log(col1, col2);
        if (row == 2 && col == 2) {
            console.log("done");
            pieces[row][col] = new Pieces(empty, 0, 0, size * col1, size * col2, 0);
        }
        else {
            pieces[row][col] = new Pieces(img, size * col2, size * col1, size * row, size * col, ranPieces[row2d] + 1);
            counter++;
        }
        if (col < 2) {
            col++;
        }
        else {
            row++;
            col = 0;
        }
    }
}

window.swap = function (p1, p2) {
    var t = p1;
    p1 = p2;
    p2 = t;
    var tx = p1.sx;
    var ty = p1.sy;
    p1.sx = p2.sx;
    p1.sy = p2.sy;
    p2.sx = tx;
    p2.sy = ty;
    return [p1, p2];
}

window.assign = function (x, y, a, b) {
    var array = swap(pieces[x][y], pieces[a][b]);
    pieces[x][y] = array[0];
    pieces[a][b] = array[1];
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);
    for (var row = 0; row < pieces.length; row++) {
        for (var col = 0; col < 3; col++) {
            pieces[row][col].show();

        }
    }
}

window.gameSuccessful = function () {
    if (win == 9) {
        alert("Game Completed");
        setGame();   
    }
}

canvas.onmousedown = function (event) {
    var x = event.pageX - sides.left;
    var y = event.pageY - sides.top;
    if (contain(x, y)) {
        mover();
    }
    gameSuccessful();
};

window.contain = function (x, y) {
    for (var row = 0; row < pieces.length; row++) {
        for (var col = 0; col < 3; col++) {
            if (x > pieces[row][col].sx && x < pieces[row][col].sx + size && y > pieces[row][col].sy && y < pieces[row][col].sy + size && pieces[row][col].counter != 0) {
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        var a = row + i;
                        var b = col + j;
                        if (row == a || col == b) {
                            if (a > -1 && a < 3 && b > -1 && b < 3) {
                                var neighbours = pieces[a][b];
                                if (neighbours.counter == 0) {
                                    assign(row, col, a, b);
                                    check();
                                    return true;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

window.check = function () {
    var num = 0;
    win = 0;
    for (var row = 0; row < pieces.length; row++) {
        for (var col = 0; col < 3; col++) {
            tempPieces[num] = pieces[row][col].counter;
            num++;
        }
    }
    for (var i = 0; i < correctPieces.length; i++) {
        if (tempPieces[i] == correctPieces[i]) {
            win++;
        }
    }
    console.log(tempPieces);
}

function update() {
    draw();
    requestAnimationFrame(update);
}
update();