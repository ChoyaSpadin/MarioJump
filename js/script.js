const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const startBtn = document.querySelector(".startBtn");
const restartBtn = document.querySelector(".restartBtn");
const scoreDiv = document.getElementById("score");

restartBtn.classList.add("hide");

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => mario.classList.remove("jump"), 500);
};
const start = () => {
  pipe.classList.add("start");
  startBtn.classList.add("hide");
};

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.left = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";
    restartBtn.classList.remove("hide");
    scoreDiv.style.visibility = "visible";
    pause();
    saveScore();
    clearInterval(loop);
  }
}, 10);

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function startTimer() {
  pause();
  cron = setInterval(() => timer(), 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  // document.getElementById("hour").innerText = "00";
  document.getElementById("minute").innerText = "00";
  document.getElementById("second").innerText = "00";
  document.getElementById("millisecond").innerText = "000";
}

document.form_main.start.onclick = () => startTimer();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function timer() {
  if ((millisecond += 10) === 1000) {
    millisecond = 0;
    second++;
  }
  if (second === 60) {
    second = 0;
    minute++;
  }
  if (minute === 60) {
    minute = 0;
    hour++;
  }
  // document.getElementById("hour").innerText = returnData(hour);
  document.getElementById("minute").innerText = returnData(minute);
  document.getElementById("second").innerText = returnData(second);
  document.getElementById("millisecond").innerText = returnData(millisecond);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`;
}

function saveScore(key, value) {
  const minute = document.getElementById("minute").innerText;
  const second = document.getElementById("second").innerText;
  const millisecond = document.getElementById("millisecond").innerText;

  // const scoreMillisecond = (document.getElementById(
  //   "scoreMillisecond"
  // ).innerHTML = millisecond);
  // const scoreSecond = (document.getElementById("scoreSecond").innerHTML =
  //   second);
  // const scoreMinute = (document.getElementById("scoreMinute").innerHTML =
  //   minute);

  const lastScore = `${minute}:${second}:${millisecond}`;

  localStorage.setItem(lastScore, lastScore);

  const scoreTable = [];

  for (let i = 0; i < localStorage.length; i++) {
    scoreTable.push(localStorage.key(i));
    if (scoreTable.length > 2) {
      localStorage.removeItem(scoreTable[i]);
    }
  }

  scoreTable.sort().reverse();

  document.getElementById("scoreTable").innerHTML = scoreTable.join("<br>");
}
