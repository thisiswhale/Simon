const simon1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const simon2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const simon3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const simon4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// const yellow = new Audio('http://res.cloudinary.com/thisiswhale/video/upload/v1518673264/Yellow_diamond._bhyqol.mp3');
// const white = new Audio('http://res.cloudinary.com/thisiswhale/video/upload/v1518673204/White_diamond_chedsv.mp3');
// const pink = new Audio('http://res.cloudinary.com/thisiswhale/video/upload/v1518673213/Pink_diamond_axisqu.mp3');
// const blue = new Audio('http://res.cloudinary.com/thisiswhale/video/upload/v1518673212/Blue_diamond_wpstav.mp3');
//simon1.play();

const panels = document.getElementsByClassName('panel')

for (let i = 0; i < panels.length; i++){
panels[i].addEventListener('click', playSound);
panels[i].addEventListener('play', function(e){
var audios = document.getElementsByTagName('audio');
for(var i = 0, len = audios.length; i < len;i++){
    if(audios[i] != e.target){
        audios[i].pause();
        audios[i].currentTime = 0;
    }
}
}, true);
}
function playSound(){
  const color = this.getAttribute('id');
  const audio = document.querySelector(`audio[data-key="${color}"]`);
  console.log(this)
  audio.currentTime = 0;
  audio.play();

}
let memory = [];

function playRound(){
  let randomNum =Math.floor((Math.random() * 4) + 1)
  memory.push(randomNum);
}
