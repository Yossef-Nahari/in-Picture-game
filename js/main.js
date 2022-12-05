'use strict'

var gQuests = []
var gCurrQuestIdx, picture
var gInterval
var ghasPickAnswer = false

function initGame() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    gQuests = createQuests()

    gCurrQuestIdx = 0

    renderQuest(gQuests, gCurrQuestIdx)
}

function createQuests() {
    var quests = [
        { id: 1, opts: ['Hi! my name is Gary 🙋🏻‍♂️', 'Hi! I\'m Squidward 🤨'], correctOptIndex: 1 },
        { id: 2, opts: ['We resuce dummy Patrick 🤣', 'We in a trip 🍻'], correctOptIndex: 0 },
        { id: 3, opts: ['We happy to see each other 😁', 'We heared we have a tv show!'], correctOptIndex: 1 }
    ]

    return quests
}

function renderQuest(gQuests, gCurrQuestIdx) {
    clearInterval(gInterval)
    var strHTML = ''

    const opt1 = gQuests[gCurrQuestIdx].opts[0]
    const opt2 = gQuests[gCurrQuestIdx].opts[1]
    picture = gCurrQuestIdx
    strHTML += `
        <div class = "ques area">
        <img class="ques" src="img/${gCurrQuestIdx + 1}.png" alt="1"> 
        </div>
        <div class="answer answer0" onclick="checkAnswer(0)">${opt1}</div>
        <div class="answer answer1" onclick="checkAnswer(1)">${opt2}</div>
        `
    const elMain = document.querySelector('.main')
    elMain.innerHTML = strHTML
}

function checkAnswer(optIdx) {
    ghasPickAnswer = false
    const correctChoice = gQuests[gCurrQuestIdx].correctOptIndex
    var elAnswer = document.querySelector(`.answer${optIdx}`)
    if (optIdx === correctChoice) {
        gCurrQuestIdx += 1
        if (gCurrQuestIdx < gQuests.length) {
            elAnswer.setAttribute('id', 'correct')
            playSound('correct')
            gInterval = setInterval(function () { renderQuest(gQuests, gCurrQuestIdx) }, 4000)
        } else {
            playSound('victory')
            onOpenModal()
        }
    } else if (optIdx !== correctChoice && ghasPickAnswer === false) {
        ghasPickAnswer = true
        elAnswer.setAttribute('id', 'wrong')
        playSound('wrong')
    }

}

function playSound(answer) {
    var sound = new Audio(`sound/${answer}.mp3`)
    sound.play()
}

function onOpenModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('show')
    elModal.style.display = 'block'
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}