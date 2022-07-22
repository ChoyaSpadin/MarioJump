const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const startBtn = document.querySelector(".startBtn");
const restartBtn = document.querySelector(".restartBtn");

restartBtn.classList.add("hide");

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};
const start = () => {
  pipe.classList.add("start");

  startBtn.classList.add("hide");
};

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

    restartBtn.classList.add("display");

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", jump);
