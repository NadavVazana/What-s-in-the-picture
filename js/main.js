'use strjct'
var gQuests
var gBoard
var gOptions = [['Kurt cobain!', 'Oded menashe'],
['Beni ganz', 'Alex turener!'],
['Oded ben ami', 'Julian casablancas!'],
['Axel rose!', 'Eliyau hanavi']]

var gLevelCount
var gQuestCount = 4


function initGame() {
    gLevelCount = 0
    createQuests(gQuestCount)
    play()
}

function play() {
    renderQuest()
}

function renderQuest() {
    var strHTML = `<div class="picture"><img src="/img/${gQuests[gLevelCount].id}.jpg"/></div>`
    var answer1 = `<button onmouseover="playAudio('/audio/option.mp3')" class="opt1" onclick = "checkAnswer(this)">${gOptions[gLevelCount][0]}</button>`
    var answer2 = `<button onmouseover="playAudio('/audio/option.mp3')"  class="opt2" onclick = "checkAnswer(this)">${gOptions[gLevelCount][1]}</button>`
    var board = document.querySelector('div.board')
    board.innerHTML = strHTML + answer1 + answer2

}

function createQuests(questCount) {
    gQuests = []
    for (var i = 0; i < questCount; i++) {
        var quest = { id: i + 1, opts: [], correctOptIndex: null }
        gQuests.push(quest)
    }
    createOptions()



}
function checkAnswer(elButton) {
    console.log('elButton:', elButton)
    // if(elButton.innerText === gOptions[gLevelCount][gQuests[gLevelCount].correctAnswer])
    // {

    if (gLevelCount < gQuestCount) {
        var correctAnswer = gOptions[gLevelCount][gQuests[gLevelCount].correctOptIndex]
        if (elButton.innerText === correctAnswer) {
            if (gLevelCount === gQuestCount - 1) {
                var winMsg = document.querySelector('h1.win')
                winMsg.style.display = 'block'
                playAudio('/audio/claps.mp3')
                resButton = document.querySelector('.restart-button')
                resButton.style.display = 'block'
            }
            else {
                playAudio('/audio/correct.mp3')
                gLevelCount++
                renderQuest()
            }
        }
        else playAudio('/audio/nope.mp3')


    }
}


function restartGame() {
    var winMsg = document.querySelector('h1.win')
    winMsg.style.display = 'none'
    gLevelCount = 0
    resButton = document.querySelector('.restart-button')
    resButton.style.display = 'none'

    play()



}






function createOptions() {
    for (var i = 0; i < gQuests.length; i++) {
        gQuests[i].opts.push(gOptions[i][0], gOptions[i][1])
    }
    for (var j = 0; j < gOptions.length; j++) {
        var option1 = gOptions[j][0]
        var option2 = gOptions[j][1]
        option1.charAt(option1.length - 1)

        gQuests[j].correctOptIndex = option1.charAt(option1.length - 1) === '!' ? 0 : 1
        var correctAnswer = gOptions[j][gQuests[j].correctOptIndex]
        correctAnswer = correctAnswer.substring(0, correctAnswer.length - 1)
        gOptions[j][gQuests[j].correctOptIndex] = correctAnswer


    }
}

function playAudio(src) {
    var audio = new Audio(src)
    audio.volume = 0.2
    audio.play()
}




