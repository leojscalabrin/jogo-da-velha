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
        if (line[0].textContent != '' && line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent) {
            winner = currentMove
            showWinnerOnBoard(line)
        }
    }
}

$boardItem0.addEventListener('click', function () {
    if ($boardItem0.textContent != '') return
    printMove($boardItem0)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem1.addEventListener('click', function () {
    if ($boardItem1.textContent != '') return
    printMove($boardItem1)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem2.addEventListener('click', function () {
    if ($boardItem2.textContent != '') return
    printMove($boardItem2)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem3.addEventListener('click', function () {
    if ($boardItem3.textContent != '') return
    printMove($boardItem3)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem4.addEventListener('click', function () {
    if ($boardItem4.textContent != '') return
    printMove($boardItem4)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem5.addEventListener('click', function () {
    if ($boardItem5.textContent != '') return
    printMove($boardItem5)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem6.addEventListener('click', function () {
    if ($boardItem6.textContent != '') return
    printMove($boardItem6)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem7.addEventListener('click', function () {
    if ($boardItem7.textContent != '') return
    printMove($boardItem7)
    verifyWinner()
    toggleMoveVariable()
})
$boardItem8.addEventListener('click', function () {
    if ($boardItem8.textContent != '') return
    printMove($boardItem8)
    verifyWinner()
    toggleMoveVariable()
})


$switcherBot.addEventListener('click', function () {
    $switcherBot.classList.toggle('active')
})