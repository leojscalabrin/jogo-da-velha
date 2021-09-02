const $switcherBot = document.querySelector('.switcher-bot')

const $boardItemList = document.querySelectorAll('.board-item')

const $score1 = document.querySelector('.score-1')
const $score2 = document.querySelector('.score-2')

const $playerField1 = document.querySelector('.player-field-1')
const $playerField2 = document.querySelector('.player-field-2')

const $winnerText = document.querySelector('.winner-text')

const $matchHistoryList = document.querySelector('.match-history-list')

const $historyMoveList = document.querySelector('.history-move-list')

const line1 = [$boardItemList[0], $boardItemList[1], $boardItemList[2]]
const line2 = [$boardItemList[3], $boardItemList[4], $boardItemList[5]]
const line3 = [$boardItemList[6], $boardItemList[7], $boardItemList[8]]
const column1 = [$boardItemList[0], $boardItemList[3], $boardItemList[6]]
const column2 = [$boardItemList[1], $boardItemList[4], $boardItemList[7]]
const column3 = [$boardItemList[2], $boardItemList[5], $boardItemList[8]]
const diagonal1 = [$boardItemList[0], $boardItemList[4], $boardItemList[8]]
const diagonal2 = [$boardItemList[2], $boardItemList[4], $boardItemList[6]]

const linesToVerify = [line1, line2, line3, column1, column2, column3, diagonal1, diagonal2]

let currentMove = 'X'
let winner = ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let game = true
let bot = false

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
    const playerValue = getPlayerName(currentMove)

    if (winner != '' && winner != 'draw') {
        $winnerText.textContent = playerValue + ' venceu! 🤙'
    } else {
        $winnerText.textContent = 'Empatou! 😔'
    }
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

function botMoveIndex(){
    return Math.floor(Math.random() * 9)
}

function botPlay(){
    const botMove = botMoveIndex()
    const $boardItem = $boardItemList[botMove]
    const itsFull = checkBoard()

    if ($boardItem.textContent && !itsFull) return botPlay()

    const positionText = getPositionText(botMove)

    if ($boardItem.textContent || !game) return
    printMove($boardItem)
    verifyWinner()
    printHistoryMove(currentMove, `${positionText} campo`)
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
}


for (let i = 0; i < $boardItemList.length; i++){
    const $boardItem = $boardItemList[i]

    $boardItem.addEventListener('click', function () {
        const positionText = getPositionText(i)
        
        if ($boardItem.textContent || !game) return
        printMove($boardItem)
        verifyWinner()
        printHistoryMove(currentMove, `${positionText} campo`)
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
        bot && botPlay()
    })
}

function getPositionText(index){
    const dictionaryText = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo', 'Oitavo', 'Nono']

    return dictionaryText[index]
}


$switcherBot.addEventListener('click', function () {
    $switcherBot.classList.toggle('active')
    bot = !bot
})
