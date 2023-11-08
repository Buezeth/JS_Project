function clickMe() {
    var getDate = prompt('Enter Your year of birth');
    var age = (2023 - getDate) * 356;
    var answer = document.getElementById('answer');
    var h1 = document.createElement('h1');
    h1.setAttribute('id', 'answerh1');
    var textAnswer = document.createTextNode('You are ' + age + ' days old');
    h1.appendChild(textAnswer);
    answer.appendChild(h1);

}

function resetbtn() {
    document.getElementById('answerh1').remove();
    // console.log(reset.length);
    // for(var i = 0; i <= reset.length; i++){
    //     reset[i].remove();
    // }
}

//challenge 2
function generateCatImage() {
    var catImage = document.createElement('img');
    catImage.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    document.getElementById('flex-container').appendChild(catImage);
}


//==============================================
//============= challenge 3 ==================//
//=============================================
function rockPaperScissor(userChoise) {
    // userChoise
    var userChoiseId = userChoise.id;
    console.log(userChoiseId);
    // botChoice
    var bot = botChoice();
    console.log(bot);
    // result
    var result = resultdata(userChoiseId, bot);
    console.log(result);
    // message
    var message = messageToUser(result[0], result[1]);
    console.log(message);
    messageFrontEnd(userChoiseId, bot, message)
}

function botChoice() {
    var randomNumber = Math.floor(Math.random() * 3)
    var choice = ['rock', 'paper', 'scissor'];
    return choice[randomNumber];
}

function resultdata(userChoiseRes, botChoiceRes) {
    var data = {
        'rock':{'scissor':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissor':0},
        'scissor':{'paper':1, 'scissor':0.5, 'rock':0}
    }

    var userResult = data[userChoiseRes][botChoiceRes];
    var botResult = data[botChoiceRes][userChoiseRes];
    return [userResult, botResult];
}

function messageToUser( userChoise, bot) {
    if(userChoise === 0){
        return {'message':'You lost!', 'color':'red'};
    }
    else if (userChoise === 0.5) {
        return {'message':'Its a draw!', 'color':'yellow'};
    }
    else {
        return {'message':'You won!', 'color':'blue'};
    }
}

function messageFrontEnd(userChoise, bot, message) {
    

    var userdiv = document.createElement('img');
    var textdiv = document.createElement('h1');
    var botdiv = document.createElement('img');

    //Insert user Selection Image
    userdiv.src = document.getElementById(userChoise).src;
    document.getElementById('image-container').appendChild(userdiv);

    //Insert text
    var textMessage = document.createTextNode(message['message']);
    document.getElementById('image-container').appendChild(textdiv);
    textdiv.style = 'color:'+ message['color'];
    textdiv.appendChild(textMessage);
    
    //Insert bot selection image
    botdiv.src = document.getElementById(bot).src;
    document.getElementById('image-container').appendChild(botdiv);


    //Remove images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();
}

//=====================================
//========== Challenge 4 ===============
//=======================================

var allButtons = document.getElementsByClassName('btn');
var copyAllButons = [];
for(i = 0; i < allButtons.length; i++) {
    copyAllButons.push(allButtons[i].classList[1]);
}

function changeButtonColor(selectedColor) {
    console.log(copyAllButons);
    if(selectedColor === 'green'){
        greenColor();
    }
    else if (selectedColor === 'red') {
        redColor();
    }
    else if (selectedColor ==='random'){
        randomColor();
    }
    else if (selectedColor === 'reset') {
        resetColor();
    }
}

function greenColor() {
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function redColor() {
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function randomColor() {
    let colors = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for (let i = 0; i < allButtons.length; i++){
        let randColor = Math.floor(Math.random() * 4);
        console.log(randColor);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(colors[randColor]);
    }    
}

function resetColor() {
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButons[i]);
    }
}

//=====================================
//========== Challenge 5 ===============
//=======================================

let gameData = {
    'user':{'score-span':'#user-points', 'div':'#user-cardbox', 'score':0},
    'bot':{'score-span':'#bot-points', 'div':'#bot-cardbox', 'score':0},
    'card':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardpoints':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins':0,
    'loss':0,
    'draws':0,
    'isStand': false,
    'turnOver':false,
}
const USER = gameData['user'];
const BOT = gameData['bot'];

document.querySelector('#hit').addEventListener('click', blackJackHit);
document.querySelector('#deal').addEventListener('click', blackJackDealer);
document.querySelector('#stand').addEventListener('click', botLogic);

const hitSound = new Audio('sounds/swish.m4a');
const loseSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');

let playedOnce = 0;
let standOnce = 0;


//HIT BTN
function blackJackHit(){
    if(gameData['isStand'] === false) {
        let selectedCard = randomCard();
        showCard(selectedCard, USER);
        // console.log(gameData['card']);
        playedOnce++;
        showScore(USER);   
    }
}

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21){
        let cardimg = document.createElement('img');
        cardimg.src = `img/challenge 5/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardimg);
        updateScore(card, activePlayer);
        hitSound.play();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return gameData['card'][randomIndex];
}

function updateScore(card, activePlayer) {
    if(card === 'A'){
        let newScore = activePlayer['score'] + gameData['cardpoints'][card][1];
        console.log('newsore: ' + newScore);
        if(newScore <= 21){
            activePlayer['score'] += gameData['cardpoints'][card][1];
        }
        else {
            activePlayer['score'] += gameData['cardpoints'][card][0];
        }
    }
    else{
        activePlayer['score'] += gameData['cardpoints'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['score-span']).textContent = 'BUSTED !';
        document.querySelector(activePlayer['score-span']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['score-span']).textContent = activePlayer['score'];
    }
}

///==========================
//DEALER BTN
//===========================
function blackJackDealer() {

    if(gameData['turnOver'] === true) {

        let allUserImages = document.querySelector('#user-cardbox').querySelectorAll('img');
        let allBotImages = document.querySelector('#bot-cardbox').querySelectorAll('img');
     
        for(let i = 0; i < allUserImages.length; i++){
         allUserImages[i].remove();
        }
        for(let i = 0; i < allBotImages.length; i++){
         allBotImages[i].remove();
        }
     
        resetScore();
    }
}

function resetScore(){
    document.querySelector('#user-points').textContent = '0';
    document.querySelector('#bot-points').textContent = '0';
    BOT['score'] = 0;
    USER['score'] = 0;
    document.querySelector(['#user-points']).style.color = 'white';
    document.querySelector(['#bot-points']).style.color = 'white';

    document.querySelector('#lets-play').textContent = 'Lets Play';
   document.querySelector('#lets-play').style.color = 'black';

   gameData['turnOver'] = false;
   gameData['isStand'] = false;

   playedOnce = 0;

}

//Compute Bot Logic
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function botLogic() {
    if(playedOnce > 0){
        gameData['isStand'] = true;
        while((BOT['score'] < 16) && (gameData['isStand'] === true)) {
            let botSelectedCard = randomCard();
            showCard(botSelectedCard, BOT);    
            showScore(BOT);
            await sleep(800);
        }
        // gameData['isStand'] = false;
        gameData['turnOver'] = true;
        showResults(computeWinner());
    }
} 

//Compute Winner
function computeWinner() {
    let winner;
    let userScore = USER['score'];
    let botScore = BOT['score'];
    if (userScore <= 21) {
        if(userScore > botScore || (botScore > 21)) {
            winner = USER;
            console.log('You won!')
        } else if(userScore < botScore && (botScore <= 21)) {
            winner = BOT;
            console.log('You lose!')
        } else if (userScore === botScore) {
            winner = 'draw';
            console.log('Draw!')
        }
    } else if(botScore < 21 ) {
        winner = BOT;
        console.log('You lose!')
    } else {
        winner = 'draw';
        console.log('Draw!')
    }
    playedOnce = 0;
    return winner;
}

//Show results
function showResults(winner) {
    let message;
    let messageColor;

    if (winner === USER) {
        gameData['wins']++;
        message = 'You Won!';
        messageColor = 'blue';
        document.querySelector('#win-points').textContent = gameData['wins'];
         winSound.play();
    } else if(winner === BOT) {
        gameData['loss']++;
        message = 'You lose!';
        messageColor = 'red'; 
        document.querySelector('#lose-points').textContent = gameData['loss'];
         loseSound.play();
    } else {
        gameData['draws']++;
        message = 'Draw!';
        messageColor = 'orange'; 
        document.querySelector('#draw-points').textContent = gameData['draws'];

    }

    document.querySelector('#lets-play').textContent = message;
    document.querySelector('#lets-play').style.color = messageColor;
}