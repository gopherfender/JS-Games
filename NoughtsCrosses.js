const { exit } = require('process');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput() {
    rl.question("Choose an available square:", processInput);
}

let grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let winList = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let playerXMoves = [];
let playerOMoves = [];
let moveCount = 1;
let player = 'X';

function turn() {
    player = (moveCount % 2 == 0) ? 'O' : 'X';
    console.log("Player %s's turn", player)
    printBoard();
    getInput();
}

function printBoard() {
    console.log(grid[0] + '|' + grid[1] + '|' + grid[2]);
    console.log(grid[3] + '|' + grid[4] + '|' + grid[5]);
    console.log(grid[6] + '|' + grid[7] + '|' + grid[8]);
}

function processInput(move) {
    move = parseInt(move);
    if (grid.includes(move)) {
        var moveIndex = grid.indexOf(move);
        if (player == 'X') {
            playerXMoves.push(move);
            grid[moveIndex] = 'X';
            if (checkWin()) {
                printBoard();
                console.log("Player %s wins!", player)
                rl.close();
                exit();
            } else if (checkDraw()) {
                printBoard();
                console.log("Draw!");
                rl.close();
                exit();
            } else {
                moveCount++
                turn();
            }
        }
        else {
            playerOMoves.push(move);
            grid[moveIndex] = 'O';
            //grid.splice(moveIndex, 1);
            if (checkWin()) {
                console.log("Player %s wins!", player)
            } else if (checkDraw()) {
                console.log("Draw!");
            } else {
                moveCount++;
                turn();
            }
        }
    }
    else {
        console.log('Invalid move, please select again');
        // turn()
    }
}

function checkWin() {
    var hasWon = false;
    for (var win of winList) {
        if (grid[win[0] - 1] === player && grid[win[1] - 1] === player && grid[win[2] - 1] === player) {
            hasWon = true;
            return hasWon;
        }
    }
    return hasWon;
}

function checkDraw() {
    for (var move of grid) {
        if (move != 'X' && move != 'O') {
            return false;
        }
    }
    return true;
}
printBoard();
turn();
