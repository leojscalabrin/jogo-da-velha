const $switcherBot = document.querySelector('.switcher-bot')
const $boardItem0 = document.querySelector('.board-item-0')
const $boardItem1 = document.querySelector('.board-item-1')
const $boardItem2 = document.querySelector('.board-item-2')
const $boardItem3 = document.querySelector('.board-item-3')
const $boardItem4 = document.querySelector('.board-item-4')
const $boardItem5 = document.querySelector('.board-item-5')
const $boardItem6 = document.querySelector('.board-item-6')
const $boardItem7 = document.querySelector('.board-item-7')
const $boardItem8 = document.querySelector('.board-item-8')

const $boardItemList = document.querySelectorAll('.board-item')

const $score1 = document.querySelector('.score-1')
const $score2 = document.querySelector('.score-2')

const line1 = [$boardItem0, $boardItem1, $boardItem2]
const line2 = [$boardItem3, $boardItem4, $boardItem5]
const line3 = [$boardItem6, $boardItem7, $boardItem8]
const column1 = [$boardItem0, $boardItem3, $boardItem6]
const column2 = [$boardItem1, $boardItem4, $boardItem7]
const column3 = [$boardItem2, $boardItem5, $boardItem8]
const diagonal1 = [$boardItem0, $boardItem4, $boardItem8]
const diagonal2 = [$boardItem2, $boardItem4, $boardItem6]

const linesToVerify = [line1, line2, line3, column1, column2, column3, diagonal1, diagonal2]

let currentMove = 'X'
let winner = ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let game = true

function toggleMoveVariable() {
    if (currentMove == 'O') {
        currentMove = 'X'
    } else {
        currentMove = 'O'
    }
}

function printMove($boardItem) {
    $boardItem.textContent = currentMove
}

function showWinnerOnBoard(boardItemList){
    for (const lineItem of boardItemList) {
        lineItem.classList.add('won')

        setTimeout(function(){
            lineItem.classList.remove('won')
        }, 1500)
    }
}

function verifyWinner() {
    for (const line of linesToVerify) {
        if (line[0].textContent && line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent) {
            winner = currentMove
            showWinnerOnBoard(line)
        }
    }
    
    const itsFull = checkBoard()

    if(!winner && itsFull) {
        winner = 'draw'
    }
}

function checkBoard() {
    let itsFull = true

    for (const $boardItem of $boardItemList) {
        if (!$boardItem.textContent) {
            itsFull = false
        }
    }

    return itsFull
}

function resetBoard(){
    for(const $boardItem of $boardItemList) {
        if($boardItem.textContent) {
            $boardItem.textContent = ''
        }
    }
}

function resetVariables() {
    currentMove = ''
    winner = ''
}


function addPoint(player){
    if (player === 'X') {
        scorePlayer1 += 1
    } else if (player === 'O') {
        scorePlayer2 += 1
    }
}

function printPoint(){
    $score1.textContent = scorePlayer1
    $score2.textContent = scorePlayer2
}

function stopGame(time){
    game = false

    setTimeout(function(){
        game = true
    }, time)
}

$boardItem0.addEventListener('click', function () {
    if ($boardItem0.textContent || !game) return
    printMove($boardItem0)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem1.addEventListener('click', function () {
    if ($boardItem1.textContent || !game) return
    printMove($boardItem1)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem2.addEventListener('click', function () {
    if ($boardItem2.textContent || !game) return
    printMove($boardItem2)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem3.addEventListener('click', function () {
    if ($boardItem3.textContent || !game) return
    printMove($boardItem3)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem4.addEventListener('click', function () {
    if ($boardItem4.textContent || !game) return
    printMove($boardItem4)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem5.addEventListener('click', function () {
    if ($boardItem5.textContent || !game) return
    printMove($boardItem5)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem6.addEventListener('click', function () {
    if ($boardItem6.textContent || !game) return
    printMove($boardItem6)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem7.addEventListener('click', function () {
    if ($boardItem7.textContent || !game) return
    printMove($boardItem7)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})
$boardItem8.addEventListener('click', function () {
    if ($boardItem8.textContent || !game) return
    printMove($boardItem8)
    toggleMoveVariable()
    verifyWinner()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        addPoint(winner)
        resetVariables()
        printPoint()
    }
})


$switcherBot.addEventListener('click', function () {
    $switcherBot.classList.toggle('active')
})

const itsFull = checkBoard()