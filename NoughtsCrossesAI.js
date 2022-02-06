const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let player = "X"

function togglePlayer() {
    return player === "X" ? "O" : "X"
}

function haveWinner(board) {
    const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < combos.length; i++) {
        if (board[combos[i][0]] === "X"
            && board[combos[i][1]] === "X"
            && board[combos[i][2]] === "X") {
            return 'X'
        }
        if (board[combos[i][0]] === "O"
            && board[combos[i][1]] === "O"
            && board[combos[i][2]] === "O") {
            return 'O'
        }
    }
    for (var move of board) {
        if (move != 'X' && move != 'O') {
            return false;
        }
    } return 'draw';
}

function isValid(input) {
    return (input => 0 && input < 9)
        && (board[input] !== "X" && board[input] !== "O")
}

function miniMax(board, depth, player) {
    let rating;
    if (player == 'O') {
        player = 'X'
    } else {
        player = 'O';
    }
    if (haveWinner(board) == 'X') {
        return 100 - depth
    } else if (haveWinner(board) == 'O') {
        return -100 - depth
    } else if (haveWinner(board) == 'draw') {
        return 0 - depth
    }
    if (player == 'X') {
        rating = -Infinity
        for (let i = 0; i < board.length; i++) {
            if (typeof board[i] === 'number') {
                const newBoard = board.slice()
                newBoard[i] = player;
                let score = miniMax(newBoard, depth + 1, player)
                rating = Math.max(score, rating)
            }
        }
        return rating
    } else {
        rating = +Infinity
        for (let i = 0; i < board.length; i++) {
            if (typeof board[i] === 'number') {
                const newBoard = board.slice()
                newBoard[i] = player;
                let score = miniMax(newBoard, depth + 1, player)
                rating = Math.min(score, rating)
            }
        }
        return rating
    }
}

function computerPlays() {
    let rating = -Infinity
    let sq
    for (let i = 0; i < board.length; i++) {
        if (typeof board[i] === 'number') {
            const newBoard = board.slice()
            newBoard[i] = player
            let score = miniMax(newBoard, 0, player)
            if (rating < score) {
                rating = score
                sq = i
            }
        }
    }
    console.log(sq)
    makePlay(sq)
}

function makePlay(input) {
    if (isValid(input)) {

        board[input] = player

        if (haveWinner(board) == 'X') {
            console.log('X Wins!');
            rl.close();
            process.exit(0);
        } else if (haveWinner(board) == 'O') {
            console.log('O Wins!');
            rl.close();
            process.exit(0);
        } else if (haveWinner(board) == 'draw') {
            console.log('draw');
            rl.close();
            process.exit(0);
        }
    }
    else {
        console.log("invalid move")
    }
    player = togglePlayer()
    if (player == 'X') {
        computerPlays()
    } else {
        getInput()
    }
}

function getInput() {
    printBoard()
    rl.question("Choose a sq to play on 1 - 9", shiftInput)
}

function shiftInput(input) {
    input--
    makePlay(input);
}

function printBoard() {
    console.log(board[0], "|", board[1], "|", board[2])
    console.log(board[3], "|", board[4], "|", board[5])
    console.log(board[6], "|", board[7], "|", board[8])
}

printBoard()
computerPlays()