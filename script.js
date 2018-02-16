
let simonMemory = [];
let playerMemory = [];
let currentRound = 1;
const totalRound = 20;
let roundSpeedDuration = 1000;
let playSpeed = 1;

const animationDuration = 500;
const gameboard = ['green','blue','red','yellow'];
const panels = document.getElementsByClassName('panel');

for (let i = 0; i < panels.length; i++){
panels[i].addEventListener('click', getPanel);
// panels[i].addEventListener('click', checkMemory);
}

function getPanel(){
  const color = this.getAttribute('id');
  lightUp (color)
  playSound(color)
}

function startGame(){
    simonMemory = [];
    playerMemory = [];
    currentRound = 1;
    newRound();
}

newRound();

function newRound(){
  const randomNum =Math.floor(Math.random() * 3);
  simonMemory.push(gameboard[randomNum]);
  console.log(randomNum, simonMemory)
  animate(simonMemory)
}

function animate(sequence) { //sequence is an array
    var i = 0;
    var interval = setInterval(function() {
        lightUp(sequence[i]);
        playSound(sequence[i]);

        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
   }, 600);
}

function lightUp(panel) { //panel is a string 'green'
    var thisPanel = document.getElementById(panel);
    thisPanel.classList.add('lit');
    thisPanel.classList.add('animated', 'infinite','jello');
    window.setTimeout(function() {
        thisPanel.classList.remove('lit');
        thisPanel.classList.remove('animated', 'infinite','jello');
    }, animationDuration);

}

function playSound(panel) {
  const audio = document.querySelector(`audio[data-key="${panel}"]`);
  audio.currentTime = 0;
  audio.playbackRate = playSpeed;
  audio.play();
}

function checkPattern(){

}

//setTimeOut(computerPlay(i),1000)
