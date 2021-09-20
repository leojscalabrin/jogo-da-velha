const $switcherBot = document.querySelector('.switcher-bot')
const $switcherMD = document.querySelector('.switcher-MD')

const $boardItemList = document.querySelectorAll('.board-item')

const $score1 = document.querySelector('.score-1')
const $score2 = document.querySelector('.score-2')

const $playerField1 = document.querySelector('.player-field-1')
const $playerField2 = document.querySelector('.player-field-2')

const $winnerText = document.querySelector('.winner-text')

const $matchHistoryList = document.querySelector('.match-history-list')

const $historyMoveList = document.querySelector('.history-move-list')

const $buttonStart = document.querySelector('.button-start')
const $buttonReset = document.querySelector('.button-reset')

const line1 = [$boardItemList[0], $boardItemList[1], $boardItemList[2]]
const line2 = [$boardItemList[3], $boardItemList[4], $boardItemList[5]]
const line3 = [$boardItemList[6], $boardItemList[7], $boardItemList[8]]
const column1 = [$boardItemList[0], $boardItemList[3], $boardItemList[6]]
const column2 = [$boardItemList[1], $boardItemList[4], $boardItemList[7]]
const column3 = [$boardItemList[2], $boardItemList[5], $boardItemList[8]]
const diagonal1 = [$boardItemList[0], $boardItemList[4], $boardItemList[8]]
const diagonal2 = [$boardItemList[2], $boardItemList[4], $boardItemList[6]]

const linesToVerify = [line1, line2, line3, column1, column2, column3, diagonal1, diagonal2]

const historyMoveList = []

let currentMove = 'X'
let winner = ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let game = false
let bot = false
let MD = false

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
    historyMoveList.length = 0
}

function resetHistoryMoveList(){
    clearElement('.history-move-list')
}

function resetScoreboard(){
    $score1.innerHTML = '00'
    $score2.innerHTML = '00'
}

function resetMatchHistoryList(){
    clearElement('.match-history-list')
}

function resetAll() {
    resetBoard()
    resetVariables()
    resetHistoryMoveList()
    resetScoreboard()
    resetMatchHistoryList()
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

const buildHistoryMoveList = () => {
    const scenery = getScenery()

    historyMoveList.push(scenery)
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

const getMoveQuantity = () => {
    let index = -1

    for (const $boardItem of $boardItemList){
        if ($boardItem.textContent) index++
    }

    return index
}

const printScenery = (scenery) => {
    for(let i = 0; i  < scenery.length; i++) {
        const $boardItem = $boardItemList[i]
        const move = scenery[i]

        $boardItem.textContent = move
    }
}

function printHistoryMove(move, fieldIndex){
    const playerName = getPlayerName(move)
    const currentMoveIndex = getMoveQuantity()

    const _historyMove = document.createElement('li')
    _historyMove.classList.add('history-move')
    _historyMove.setAttribute('index', currentMoveIndex)

    const _historyMoveLetter = document.createElement('span')
    _historyMoveLetter.classList.add('history-move-letter')
    _historyMoveLetter.textContent = move

    const _historyMoveTextWrapper = document.createElement('div')
    _historyMoveTextWrapper.classList.add('history-move-text-wrapper')
    
    const _historyMovePlayerName = document.createElement('h3')
    _historyMovePlayerName.classList.add('history-move-player-name')
    _historyMovePlayerName.textContent = playerName

    const _historyMovePositionText = document.createElement('span')
    _historyMovePositionText.classList.add('history-move-position-text')
    _historyMovePositionText.textContent = fieldIndex

    _historyMove.appendChild(_historyMoveLetter)
    _historyMove.appendChild(_historyMoveTextWrapper)
    _historyMoveTextWrapper.appendChild(_historyMovePlayerName)
    _historyMoveTextWrapper.appendChild(_historyMovePositionText)

    _historyMove.addEventListener('click', () => {
        const myScenery = historyMoveList[currentMoveIndex]

        printScenery(myScenery)
    })

    $historyMoveList.appendChild(_historyMove)

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
    buildHistoryMoveList()
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
        buildHistoryMoveList()
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

    if (bot) {
        $playerField2.value = "Bot 🤖"
    }
})

$switcherMD.addEventListener('click', () => {
    $switcherMD.classList.toggle("MD-active")
    MD = !MD
})

$buttonReset.addEventListener('click', resetAll) 

$buttonStart.addEventListener('click', function(){
    if (game == false){
        game = true
        $buttonStart.classList.add('button-active')
        $buttonStart.innerHTML = 'Pausar'
    } else {
        game = false
        $buttonStart.classList.remove('button-active')
        $buttonStart.innerHTML = 'Jogar'
    }
})