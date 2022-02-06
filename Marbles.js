const { exit } = require('process');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let playerMarbles = 10;
let cpuMarbles = 10;
let currentPlayer = 'player';

function startRound() {
    console.log('----------------------------------');
    console.log('Current Marbles: Player %s, CPU %s', playerMarbles, cpuMarbles);
    if (playerMarbles == 0) {
        console.log('Player has no marbles left, CPU Wins!')
        rl.close;
        exit();
    } else if (cpuMarbles == 0) {
        console.log('CPU has no marbles left, Player Wins!')
        rl.close;
        exit();
    } else if (currentPlayer == 'player') {
        getInput();
    } else {
        getGuess();
    }
}

function getInput() {
    rl.question('Players pick. How many marbles would you like to bet?', playerTurn)
}

function getGuess() {
    console.log('CPUs turn to pick marbles');
    rl.question('Do you guess Odd or Even?', cpuTurn)
}

function playerTurn(pick) {
    let pickNum = parseInt(pick);
    let isEven = evenMarbles(pickNum);
    if (isEven) {
        var choice = 'even';
    } else {
        var choice = 'odd';
    }
    if (cpuGuessEven(pickNum)) {
        console.log('CPU Guessed %s - Correct!', choice);
        cpuMarbles += pickNum;
        playerMarbles -= pickNum;
    } else {
        console.log('CPU Guessed %s - Wrong!', choice);
        cpuMarbles -= pickNum;
        playerMarbles += pickNum;
    }
    currentPlayer = 'CPU';
    startRound();

}

function cpuTurn(guess) {
    if (guess.toLowerCase() == 'even') {
        var guessBool = true;
    } else {
        var guessBool = false;
    }
    let cpuPick = cpuPickMarbles(cpuMarbles);
    if (guessBool === evenMarbles(cpuPick)) {
        console.log('CPU bet %d marbles', cpuPick);
        console.log('You Guessed %s - Correct!', guess);
        cpuMarbles -= cpuPick;
        playerMarbles += cpuPick;
    } else {
        console.log('CPU bet %d marbles', cpuPick);
        console.log('You Guessed %s - Wrong!', guess);
        cpuMarbles += cpuPick;
        playerMarbles -= cpuPick;
    }
    currentPlayer = 'player';
    startRound();
}

function evenMarbles(marbles) {
    if (marbles % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

function cpuPickMarbles(cpuMarbles) {
    return Math.floor(Math.random() * cpuMarbles) + 1;
}

function cpuGuessEven(pickNum) {
    let rand = Math.floor(Math.random() * 101);
    return (rand % 2 == pickNum % 2);
}

startRound();


