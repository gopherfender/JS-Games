const mainReel = ['🍔', '🍕', '🌭', '🍲', '🍟', '🥓']
let reel1 = mainReel.slice(0)
let reel2 = mainReel.slice(0)
let reel3 = mainReel.slice(0)
let funds = 0
const { exit } = require('process')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const scores = {
    '🍔': 1,
    '🍕': 3,
    '🌭': 5,
    '🍲': 10,
    '🍟': 15,
    '🥓': 25
}

function addFunds() {
    rl.question("How much would you like to add?", answer => {
        funds += parseInt(answer)
        setStake()
    })

}

function setStake() {
    rl.question("Pick your stake: £1, £5, £10, £15", stake => {
        if (stake == 5) {
            reel1 = mainReel.slice(1, 5)
            reel2 = mainReel.slice(1, 5)
            reel3 = mainReel.slice(1, 5)
        } else if (stake == 10) {
            reel1 = mainReel.slice(2, 5)
            reel2 = mainReel.slice(2, 5)
            reel3 = mainReel.slice(2, 5)
        } else if (stake == 15) {
            reel1 = mainReel.slice(3, 5)
            reel2 = mainReel.slice(3, 5)
            reel3 = mainReel.slice(3, 5)
        }
        funds -= parseInt(stake)
        spinReel(reel1)
        spinReel(reel2)
        spinReel(reel3)
        console.log(reel1[0], reel2[0], reel3[0])
        returnScore()
    })
}

function spinReel(reel) {
    const rand = Math.floor(Math.random() * 10)
    for (let i = 0; i < rand; i++) {
        reel.unshift(reel.pop())
        //console.log(reel)
    }
}

function checkWin() {
    let score = 0
    if (reel1[0] === reel2[0] && reel1[0] === reel3[0]) {
        score = scores[reel1[0]] * 3
    }
    return score
}

function returnScore() {
    let score = checkWin()
    if (!score) {
        console.log("No win this time, try again!")
    } else {
        console.log("3 in a row! You win £%d!", score)
        funds += score
    }
    console.log("Current Balance: %d", funds)
    setStake()
}

addFunds()
