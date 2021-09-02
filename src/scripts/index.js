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

const $playerField1 = document.querySelector('.player-field-1')
const $playerField2 = document.querySelector('.player-field-2')

const $winnerText = document.querySelector('.winner-text')

const $matchHistoryList = document.querySelector('.match-history-list')

const $historyMoveList = document.querySelector('.history-move-list')

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
            $boardItem.textContent = ''
    }
}


function resetVariables() {
    currentMove = 'X'
    winner = ''
}


function addPoint(player){
    if (player === 'X') {
        scorePlayer1 += 1
    } else if (player === 'O') {
        scorePlayer2 += 1
    }
}


function printWinnerName(){
    // if (winner === 'X') {
    //     const value = $playerField1.value
        
    //     $winnerText.textContent = value + ' venceu! 🤙'
    // } else if (winner === 'O') {
    //     const value = $playerField2.value

    //     $winnerText.textContent = value + ' venceu! ✌️'
    // } else if (winner === 'draw') {
    //     $winnerText.textContent = 'Empatou 😔'
    // }

    const playerValue = getPlayerName(currentMove)

    $winnerText.textContent = playerValue + ' venceu! 🤙'
}

function printPoint(){
    if (scorePlayer1 < 10) {
        $score1.textContent = '0' + scorePlayer1
    } else {
        $score1.textContent = scorePlayer1
    }

    if (scorePlayer2 < 10) {
        $score2.textContent = '0' + scorePlayer2
    } else {
        $score2.textContent = scorePlayer2
    }
}


function stopGame(time){
    game = false

    setTimeout(function(){
        game = true
    }, time)
}

function getScenery(){
    const scenery = []

    for (const $boardItem of $boardItemList){
        const move = $boardItem.textContent
        scenery.push(move)
    }

    return scenery
}

function printHistoryMatch(){
    const scenery = getScenery()

    const _container = document.createElement('li')
    _container.classList.add('match-history-item')

    const _winnerWrapper = document.createElement('div')
    _winnerWrapper.classList.add('winner-wrapper')

    const _title = document.createElement('strong')
    _title.classList.add('winner-history-title')
    _title.classList.add('title--green-small')
    _title.classList.add('title')
    _title.textContent = 'Vencedor'

    const _name = document.createElement('span')
    _name.classList.add('winner-history-name')
    _name.textContent = getPlayerName(winner)

    const _sceneryLabel = document.createElement('span')
    _sceneryLabel.classList.add('scenery-label')
    _sceneryLabel.textContent = 'Cenário'

    const _miniBoard = document.createElement('div')
    _miniBoard.classList.add('mini-board')

    _container.appendChild(_winnerWrapper)
    _container.appendChild(_sceneryLabel)
    _container.appendChild(_miniBoard)
    _winnerWrapper.appendChild(_title)
    _winnerWrapper.appendChild(_name)

    $matchHistoryList.appendChild(_container)

    for (const move of scenery){
        const _move = document.createElement('span')
        _move.classList.add('mini-board-item')
        _move.textContent = move

        _miniBoard.appendChild(_move)
    }

    // $matchHistoryList.innerHTML += `
    // <li class="match-history-item">
    //                 <div class="winner-wrapper">
    //                     <strong class='winner-history-title title--green-small title'>Vencedor</strong>
    //                     <span class="winner-history-name">Robson</span>
    //                 </div>
    //                 <span class="scenery-label">Cenário</span>
    //                 <div class="mini-board">
    //                     <span class="mini-board-item">O</span>
    //                     <span class="mini-board-item">X</span>
    //                     <span class="mini-board-item">X</span>
    //                     <span class="mini-board-item"></span>
    //                     <span class="mini-board-item"></span>
    //                     <span class="mini-board-item">X</span>
    //                     <span class="mini-board-item">O</span>
    //                     <span class="mini-board-item">O</span>
    //                     <span class="mini-board-item"></span>
    //                 </div>
    //             </li>
    // `
}

function printHistoryMove(move, fieldIndex){
    const playerName = getPlayerName(move)

    $historyMoveList.innerHTML += `
    <li class="history-move">
                <span class="history-move-letter">${move}</span>
                <div class="history-move-text-wrapper">
                    <h3 class="history-move-player-name">${playerName}</h3>
                    <span class="history-move-position-text">${fieldIndex}</span>
                </div>
            </li>
    `
}

function getPlayerName(playerMove){
    const player1Value = $playerField1.value
    const player2Value = $playerField2.value

    if(playerMove === 'X') {
        return player1Value
    } else if (playerMove === 'O') {
        return player2Value
    }
}

function clearElement(className){
    const $element = document.querySelector(className)

    $element.innerHTML = ''
}

$boardItem0.addEventListener('click', function () {
    if ($boardItem0.textContent || !game) return
    printMove($boardItem0)
    verifyWinner()
    printHistoryMove(currentMove, 'Primeiro campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem1.addEventListener('click', function () {
    if ($boardItem1.textContent || !game) return
    printMove($boardItem1)
    verifyWinner()
    printHistoryMove(currentMove, 'Segundo campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem2.addEventListener('click', function () {
    if ($boardItem2.textContent || !game) return
    printMove($boardItem2)
    verifyWinner()
    printHistoryMove(currentMove, 'Terceiro campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem3.addEventListener('click', function () {
    if ($boardItem3.textContent || !game) return
    printMove($boardItem3)
    verifyWinner()
    printHistoryMove(currentMove, 'Quarto campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem4.addEventListener('click', function () {
    if ($boardItem4.textContent || !game) return
    printMove($boardItem4)
    verifyWinner()
    printHistoryMove(currentMove, 'Quinto campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem5.addEventListener('click', function () {
    if ($boardItem5.textContent || !game) return
    printMove($boardItem5)
    verifyWinner()
    printHistoryMove(currentMove, 'Sexto campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem6.addEventListener('click', function () {
    if ($boardItem6.textContent || !game) return
    printMove($boardItem6)
    verifyWinner()
    printHistoryMove(currentMove, 'Sétimo campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})
$boardItem7.addEventListener('click', function () {
    if ($boardItem7.textContent || !game) return
    printMove($boardItem7)
    verifyWinner()
    printHistoryMove(currentMove, 'Oitavo campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
    
})
$boardItem8.addEventListener('click', function () {
    if ($boardItem8.textContent || !game) return
    printMove($boardItem8)
    verifyWinner()
    printHistoryMove(currentMove, 'Nono campo')
    if (!winner) toggleMoveVariable()
    if (winner) {
        stopGame(1500)
        setTimeout(resetBoard, 1500)
        setTimeout(function(){
            clearElement('.history-move-list')
        }, 1500)
        addPoint(winner)
        printWinnerName()
        printPoint()
        printHistoryMatch()
        resetVariables()
    }
})


$switcherBot.addEventListener('click', function () {
    $switcherBot.classList.toggle('active')
})
