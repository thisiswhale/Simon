let simonMemory = [];
let counterRound = 1;
const totalRound = 20;
let thisSequence = 0;
let strict = false;

let round1RoundSpeed = 1000;
let round5RoundSpeed = 800;
let round10RoundSpeed = 600;
let round15RoundSpeed = 400;

let round1SoundSpeed = 0.5
let round5SoundSpeed = 1.0
let round10SoundSpeed = 1.25
let round15SoundSpeed = 1.5

let round1AnimateSpeed = '0.75s'
let round5AnimateSpeed = '0.65s'
let round10AnimateSpeed = '0.55s'
let round15AnimateSpeed = '0.50s'

const animationDuration = 500;
const gameboard = ['green', 'blue', 'red', 'yellow'];
const panels = document.getElementsByClassName('panel');
const roundStatus = document.querySelector('.round-status');
const strictBtn = document.querySelector('.strict-btn');
const startBtn = document.querySelector('.start-btn');
const btn = document.getElementsByClassName('btn');

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('mouseover', function() {
    btn[i].classList.add('animated', 'infinite', 'pulse')
  });

  btn[i].addEventListener('mouseout', function() {
    btn[i].classList.remove('animated', 'infinite', 'pulse')
  });
}

function strictMode() {
  if (strict) {
    strict = false
    strictBtn.classList.add('animated', 'tada')
    strictBtn.classList.remove('on');
    window.setTimeout(function() {
      strictBtn.classList.remove('animated', 'tada');
    }, animationDuration);
  } else {
    strict = true
    strictBtn.classList.add('on', 'animated', 'tada')
    window.setTimeout(function() {
      strictBtn.classList.remove('animated', 'tada');
    }, animationDuration);
  }
}

function getPanel() {
  const color = this.getAttribute('id');
  lightUp(color);
  playSound(color);
  checkPattern(color);
}

function startGame() {
  startBtn.classList.add('animated', 'rubberBand')
  window.setTimeout(function() {
    startBtn.classList.remove('animated', 'rubberBand');
  }, animationDuration);

  setDifficulty(round1AnimateSpeed, round1RoundSpeed, round1SoundSpeed)
  simonMemory = [];
  counterRound = 1;
  roundStatus.innerHTML = 'ROUND ' + counterRound;
  newRound();
  allowClickEvent()
}

function allowClickEvent() {
  for (let i = 0; i < panels.length; i++) {
    panels[i].addEventListener('click', getPanel);
  }
}
function blockClickEvent() {
  for (let i = 0; i < panels.length; i++) {
    panels[i].removeEventListener('click', getPanel);
  }
}

function newRound() {
  const randomNum = Math.floor(Math.random() * 3);
  simonMemory.push(gameboard[randomNum]);
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
  }, roundSpeedDuration);
}

function lightUp(panel) { //panel is a string 'green'
  var thisPanel = document.getElementById(panel);
  thisPanel.classList.add('lit');
  thisPanel.classList.add('animated', 'jello');
  window.setTimeout(function() {
    thisPanel.classList.remove('lit');
    thisPanel.classList.remove('animated', 'jello');
  }, animationDuration);

}

function playSound(panel) { //panel is a string 'green'
  const audio = document.querySelector(`audio[data-key="${panel}"]`);
  audio.currentTime = 0;
  audio.playbackRate = playbackSpeed;
  audio.play();
}

function playErrorSound(panel) { //panel is a string 'green'
  const audio = document.querySelector(`audio[data-key="${panel}"]`);
  audio.currentTime = 0;
  audio.play();
}

function checkPattern(thisPanel) {
  let correct = true;
  if (simonMemory[thisSequence] == thisPanel) {
    if ((thisSequence + 1) == simonMemory.length) {
      if (counterRound == 20) {
        //you win
      } else {
        thisSequence = 0;
        counterRound++;
        checkRound(counterRound);
        animateRound(correct);
        setTimeout(newRound, 1000);
      }
    } else {
      thisSequence++;
    }
  } else if (strict == true) { //start over game
    correct = false;
    animateRound(correct);
    setTimeout(startGame, 1000);
  } else {
    correct = false;
    animateRound(correct);
    thisSequence = 0;
    setTimeout(animate.bind(null, simonMemory), 1000);
  }
  allowClickEvent();
}

function setDifficulty(animateSpeed, roundSpeed, soundSpeed) {
  for (let i = 0; i < panels.length; i++) {
    panels[i].style.animationDuration = animateSpeed;
    panels[i].style.webkitAnimationDuration = animateSpeed;
  }
  roundSpeedDuration = roundSpeed;
  playbackSpeed = soundSpeed;

}

function checkRound(thisRound) {

  if (thisRound == 5) {
    setDifficulty(round5AnimateSpeed, round5RoundSpeed, round5SoundSpeed)
  } else if (thisRound == 10) {
    setDifficulty(round10AnimateSpeed, round10RoundSpeed, round10SoundSpeed)
  } else if (thisRound == 15) {
    setDifficulty(round15AnimateSpeed, round15RoundSpeed, round15SoundSpeed)
  }

  roundStatus.innerHTML = 'ROUND ' + counterRound;

}

function animateRound(correct) {
  if (correct) {
    roundStatus.classList.add('correct', 'animated', 'wobble');
    window.setTimeout(function() {
      roundStatus.classList.remove('correct', 'animated', 'wobble');
    }, animationDuration);
  } else if (!correct) {
    roundStatus.classList.add('wrong', 'animated', 'shake');
    window.setTimeout(function() {
      roundStatus.classList.remove('wrong', 'animated', 'shake');
    }, animationDuration);
  }
  blockClickEvent();
}
//Goals
//Add a sound, when play gets pattern wrong
//add status such as "Your turn to follow", "Simon Says..", "Incorrect!", "Good Job!"
