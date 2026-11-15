let gameSeq = [];
let userSeq = [];
let btns = ["blue", "orange", "green", "pink"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let h3 = document.querySelector("h3");
let startBtn = document.querySelector("#startBtn");
let highScoreDisplay = document.querySelector("#highScore");
let gameOver = document.querySelector(".game-over");

highScoreDisplay.innerText = highScore;

startBtn.addEventListener("click", function () {
    if (started == false) {
        started = true;
        startBtn.disabled = true;
        startBtn.innerText = "GAME STARTED";
        levelUp();
    }
});

function gameFash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randmIdx = Math.floor(Math.random() * 4);
    let randmColor = btns[randmIdx];
    let randmBtn = document.querySelector(`.${randmColor}`);

    gameSeq.push(randmColor);
    console.log(gameSeq);
    gameFash(randmBtn);
}

function checkColor(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 600);
        }
    } 
    else {
    gameOver.classList.remove("show");
    void gameOver.offsetWidth;
    gameOver.classList.add("show");

    h3.innerHTML = `Game Over! Your score was &nbsp; <b>${level}</b>`;

    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = highScore;
    }

    reset();

    setTimeout(function () {
        gameOver.classList.remove("show");
    }, 1500);
}
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkColor(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.disabled = false;
    startBtn.innerText = "PLAY AGAIN";
}
