let simonMemory,
  counterRound,
  thisSequence;
let strict = false;

const levels = {
  round1: {
    roundSpeed: 1000,
    soundSpeed: 0.75,
    animateSpeed: '0.75s'
  },
  round5: {
    roundSpeed: 800,
    soundSpeed: 1.0,
    animateSpeed: '0.65s'
  },
  round10: {
    roundSpeed: 600,
    soundSpeed: 1.25,
    animateSpeed: '0.55s'
  },
  round15: {
    roundSpeed: 500,
    soundSpeed: 1.30,
    animateSpeed: '0.50s'
  }
}

const totalRound = 20;
const animationDuration = 500;
const gameboard = ['green', 'blue', 'red', 'yellow'];
const panels = document.getElementsByClassName('panel');
const roundStatus = document.querySelector('.round-status');
const strictBtn = document.querySelector('.strict-btn');
const startBtn = document.querySelector('.start-btn');
const statusBox = document.querySelector('.status-bar')
const btn = document.getElementsByClassName('btn');

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('mouseover', function() {
    btn[i].classList.add('animated', 'infinite', 'pulse')
  });

  btn[i].addEventListener('mouseout', function() {
    btn[i].classList.remove('animated', 'infinite', 'pulse')
  });
}

function setDifficulty(setLevel) {
  for (let i = 0; i < panels.length; i++) {
    panels[i].style.animationDuration = setLevel.animateSpeed;
    panels[i].style.webkitAnimationDuration = setLevel.animateSpeed;
  }
  roundSpeedDuration = setLevel.roundSpeed;
  playbackSpeed = setLevel.soundSpeed;
}

function startGame() {
  startBtn.classList.add('animated', 'rubberBand')
  window.setTimeout(function() {
    startBtn.classList.remove('animated', 'rubberBand');
  }, animationDuration);

  setDifficulty(levels.round1)
  simonMemory = [];
  counterRound = 1;
  thisSequence = 0;
  roundStatus.innerHTML = 'ROUND ' + counterRound;
  newRound();
  allowClickEvent()
}

function strictMode() {
  if (strict) {
    strict = false
    strictBtn.classList.add('animated', 'tada')
    strictBtn.classList.remove('on');
    window.setTimeout(function() {
      strictBtn.classList.remove('animated', 'tada');
    }, 1000);
  } else {
    strict = true
    strictBtn.classList.add('on', 'animated', 'tada')
    window.setTimeout(function() {
      strictBtn.classList.remove('animated', 'tada');
    }, 1000);
  }
}

function getPanel() {
  const color = this.getAttribute('id');
  lightUp(color);
  playSound(color);
  checkPattern(color);
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
  sendStatus('SIMON SAYS...');
  var i = 0;
  var interval = setInterval(function() {
    lightUp(sequence[i]);
    playSound(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(sendStatus.bind(null, 'YOUR TURN!!'), 1000)
    }
  }, roundSpeedDuration);

}

function sendStatus(str) {
  statusBox.innerHTML = str
  switch (str) {
    case 'SIMON SAYS...':
      statusBox.classList.add('animated', 'zoomIn');
      window.setTimeout(function() {
        statusBox.classList.remove('animated', 'zoomIn');
      }, 1000);
      break;
    case 'YOUR TURN!!':
      statusBox.classList.add('animated', 'flash');
      window.setTimeout(function() {
        statusBox.classList.remove('animated', 'flash');
      }, 1000);
      break;
    case 'YOU WIN!!':
      playSound('victory');
      statusBox.classList.add('animated', 'zoomInRight');
      window.setTimeout(function() {
        statusBox.classList.remove('animated', 'zoomInRight');
      }, 1000);
      break;
  }
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

function playSound(word) { //panel is a string 'green'
  const audio = document.querySelector(`audio[data-key="${word}"]`);
  audio.currentTime = 0;
  if (gameboard.includes(word)) {
    audio.playbackRate = playbackSpeed;
  }
  audio.play();
}

function playErrorSound() { //panel is a string 'green'
  const audio = document.querySelector(`audio[data-key=wrong]`);
  audio.currentTime = 0;
  audio.play();
}
function playVictorySound() {
  const audio = document.querySelector(`audio[data-key=victory]`);
  audio.currentTime = 0;
  audio.play();
}

function checkPattern(thisPanel) {
  let correct = true;
  if (simonMemory[thisSequence] == thisPanel) {
    if ((thisSequence + 1) == simonMemory.length) {
      if (counterRound == 20) {
        setTimeout(sendStatus.bind(null, 'YOU WIN!!'), 1000);
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

function checkRound(thisRound) {
  if (thisRound == 5) {
    setDifficulty(levels.round5)
  } else if (thisRound == 10) {
    setDifficulty(levels.round10)
  } else if (thisRound == 15) {
    setDifficulty(levels.round15)
  }
  roundStatus.innerHTML = 'ROUND ' + counterRound;
}

function animateRound(correct) {
  if (correct) { //answer is right, true
    roundStatus.classList.add('correct', 'animated', 'wobble');
    window.setTimeout(function() {
      roundStatus.classList.remove('correct', 'animated', 'wobble');
    }, animationDuration);
  } else if (!correct) { //answer is wrong, false
    playSound('wrong');
    roundStatus.classList.add('wrong', 'animated', 'shake');
    window.setTimeout(function() {
      roundStatus.classList.remove('wrong', 'animated', 'shake');
    }, animationDuration);
  }
  blockClickEvent();
}
