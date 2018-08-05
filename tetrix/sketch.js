//Creating a canvas
let canvas;
let SB;

let music;
let lazer;
let set;
let flip;
//sounds
function preload() {
    music = loadSound("music.mp3");
    lazer = loadSound("lazer.mp3");
    set = loadSound("merge.mp3");
    flip = loadSound("flip.mp3");
}

function setup() {
    canvas = createCanvas(500, 420);
    canvas.parent('can');
    music.play();
    music.loop();
    SB = new scoreboard();
}
//Scaling the canvas
let size = 20;

//timer
let dropCounter = 0;
let dropInterval = 20;
let lastTime = 0;
let time = 0;

function timer() {
    time = time += 1;
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
}


//animate multiple times
function draw() {
    background(40);
    drawPieces(board, player.size, { x: 0, y: 20 });
    drawPieces(player.matrix, player.size, player.position);
    timer();
    SB.show();
}

//creates a new matrix
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//paste the piece's position in the board 
function merge(board, player) {
    for (let i = 0; i < player.matrix.length; i++) {
        for (let j = 0; j < player.matrix[i].length; j++) {
            if (player.matrix[i][j] != 0) {
                board[i + (player.position.y) / 20][j + (player.position.x) / 20] = player.matrix[i][j];
                set.play();
            }
        }
    }
}

//check for collision
function collide(board, player) {
    for (let i = 0; i < player.matrix.length; ++i) {
        for (let j = 0; j < player.matrix[i].length; ++j) {
            if ((player.matrix[i][j] !== 0) && (board[i + (player.position.y) / 20] && board[i + (player.position.y) / 20][j + (player.position.x) / 20]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

//rotate the pieces
function playerRotate(dir) {
    flip.play();
    const pos = player.position.x;
    let offset = 20;
    rotatePiece(player.matrix, dir);
    while (collide(board, player)) {
        player.position.x += offset;
        offset = -(offset + (offset > 0 ? 20 : -20));
        if (offset > player.matrix[0].length) {
            rotatePiece(player.matrix, -dir);
            player.position.x = pos;
            return;
        }
    }
}

function rotatePiece(matrix, dir) {
    for (let i = 0; i < player.matrix.length; ++i) {
        for (let j = 0; j < i; ++j) {
            [
                matrix[j][i],
                matrix[i][j],
            ] = [
                    matrix[i][j],
                    matrix[j][i],
                ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    }
    else {
        matrix.reverse();
    }
}

//drop the pieces one position down
function playerDrop() {
    if (collide(board, player)) {
        player.position.y -= 20;
        merge(board, player);
        playerReset();
        removeRow();
    }
    player.position.y += 20;
    dropCounter = 0;
}

//draw pieces
function drawPieces(matrix, size, pos) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] != 0) {
                fill(colors[matrix[i][j]]);
                rect((j * size) + pos.x, (i * size) + pos.y, size, size);
            }
        }
    }
}

//create new board
const board = createMatrix(15, 20);

//reset pieces
function playerReset() {
    const pieceType = 'TOJLISZ';
    let r = floor(random(0, 7));
    player.matrix = createPieces(pieceType[r]);
    player.position.y = 0;
    player.position.x = 160;
    if (collide(board, player)) {
        board.forEach(row => row.fill(0));
        lines = 0;
        score = 0;
    }
}

//create pieces
const player = {
    position: { x: 160, y: 0 },
    matrix: createPieces('T'),
    size: size
}

function createPieces(type) {
    if (type == 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    }
    else if (type == 'O') {
        return [
            [2, 2],
            [2, 2]
        ];
    }
    else if (type == 'Z') {
        return [
            [3, 3, 0],
            [0, 3, 3],
            [0, 0, 0]
        ];
    }
    else if (type == 'S') {
        return [
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0]
        ];
    }
    else if (type == 'L') {
        return [
            [5, 0, 0],
            [5, 5, 5],
            [0, 0, 0]
        ];
    }
    else if (type == 'J') {
        return [
            [0, 0, 6],
            [6, 6, 6],
            [0, 0, 0]
        ];
    }
    else if (type == 'I') {
        return [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0]
        ];
    }
}

//color
let colors = [
    null,
    'blue',
    'orange',
    'green',
    'magenta',
    'cyan',
    'yellow',
    'red'
];

let lines = 0;
let score = 0;
let count = 1;
function removeRow() {
    first: for (let i = board.length - 1; i > 0; --i) {
        for (let j = 0; j < board[i].length; ++j) {
            if (board[i][j] === 0) {
                continue first;
            }
        }
        const row = board.splice(i, 1)[0].fill(0);
        board.unshift(row);
        ++i;
        lazer.play();
        lines++;
        score += count * 10;
        count *= 2;
        console.log(lines);
    }
}

//keyboard movements
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        playerMove(-20);
    }
    else if (keyCode === RIGHT_ARROW) {
        playerMove(20);
    }
    else if (keyCode === DOWN_ARROW) {
        playerDrop();
    }
    else if (keyCode === 81) {
        playerRotate(-20);
    }
    else if (keyCode === 87) {
        playerRotate(20);
    }
}

function playerMove(direction) {
    player.position.x += direction;
    if (collide(board, player)) {
        player.position.x -= direction;
    }
}
