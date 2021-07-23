const audio = document.querySelector(".audio");

const scene = document.querySelector(".scene");
const cube = document.querySelector(".cube");
const artcon = document.querySelector(".artcon");
const coverArt = document.querySelector(".coverart");
const bubble = document.querySelector(".bubble");
const floorShadow = document.querySelector(".floor-shadow");

const logo = document.querySelector(".logoImg");

const songs = [
  "Resilience(Master).mp3",
  "Patience(Master).mp3",
  "Joy(Master).mp3",
  "Recursion(Master).mp3",
];

const bpms = [
  [0.6, 137, 105, 2, 8],
  [0, 0, 175, 2, 4],
  [0, 0, 140, 2, 2],
  [1.571, 195, 155, 4, 8],
];

const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");

let sonDuration;
let progress = document.querySelector(".progress");

audio.load();
progress.value = 0.0;

// PLAY AUDIO
function playFromPrep() {
  audio.oncanplaythrough = function playSong() {
    audio.play();
  };

  playBtn.classList.add("playin");
  playBtn.classList.remove("notplayin");

  scene.style.animationPlayState = "running";
  cube.style.animationPlayState = "running";
  artcon.style.animationPlayState = "running";
  coverArt.style.animationPlayState = "running";
  logo.style.animationPlayState = "running";
  floorShadow.style.animationPlayState = "running";
}

const resi = document.querySelector(".resilience");
const pati = document.querySelector(".patience");
const joy = document.querySelector(".joy");
const recu = document.querySelector(".recursion");

// TITLE BUTTON INTERFACE

let curSon = document.querySelector(".current-song");
btnVisib(curSon);

function prepFromTitle(song) {
  if (!audio.paused) audio.pause();

  curSon.classList.remove("current-song");

  song.classList.add("current-song");
  curSon = song;

  audio.src = "./audio/" + songs[song.id];
  audio.load();

  btnVisib(curSon);

  progress.value = 0.0;
}

resi.addEventListener("click", function strSong() {
  prepFromTitle(resi);
  playFromPrep();
});

pati.addEventListener("click", function strSong() {
  prepFromTitle(pati);
  playFromPrep();
});

joy.addEventListener("click", function strSong() {
  prepFromTitle(joy);
  playFromPrep();
});

recu.addEventListener("click", function strSong() {
  prepFromTitle(recu);
  playFromPrep();
});

// NAV BUTTON INTERFACE

function btnVisib(curSon) {
  if (curSon.id === String(0)) {
    prevBtn.classList.add("isHidden");
    prevBtn.style.cursor = "auto";
    nextBtn.classList.remove("isHidden");
    nextBtn.style.cursor = "pointer";
  } else if (curSon.id === String(3)) {
    prevBtn.classList.remove("isHidden");
    prevBtn.style.cursor = "pointer";
    nextBtn.classList.add("isHidden");
    nextBtn.style.cursor = "auto";
  } else {
    prevBtn.classList.remove("isHidden");
    prevBtn.style.cursor = "pointer";
    nextBtn.classList.remove("isHidden");
    nextBtn.style.cursor = "pointer";
  }
}

prevBtn.addEventListener("click", function prevPrep() {
  let prevSon = curSon.previousElementSibling;
  prepFromTitle(prevSon);
  playFromPrep();
});

nextBtn.addEventListener("click", function nextPrep() {
  let nextSon = curSon.nextElementSibling;
  prepFromTitle(nextSon);
  playFromPrep();
});

playBtn.addEventListener("click", function playClick() {
  if (!audio.paused) {
    audio.pause();
    playBtn.classList.add("notplayin");
    playBtn.classList.remove("playin");
    scene.style.animationPlayState = "paused";
    cube.style.animationPlayState = "paused";
    artcon.style.animationPlayState = "paused";
    coverArt.style.animationPlayState = "paused";
    logo.style.animationPlayState = "paused";
    floorShadow.style.animationPlayState = "paused";
  } else {
    audio.play();
    playBtn.classList.add("playin");
    playBtn.classList.remove("notplayin");

    scene.style.animationPlayState = "running";
    cube.style.animationPlayState = "running";
    artcon.style.animationPlayState = "running";
    coverArt.style.animationPlayState = "running";
    logo.style.animationPlayState = "running";
    floorShadow.style.animationPlayState = "running";
  }
});

audio.addEventListener("ended", function stopAnim() {
  scene.style.animationPlayState = "paused";
  cube.style.animationPlayState = "paused";
  artcon.style.animationPlayState = "paused";
  coverArt.style.animationPlayState = "paused";
  logo.style.animationPlayState = "paused";
  floorShadow.style.animationPlayState = "paused";

  playBtn.classList.add("notplayin");
  playBtn.classList.remove("playin");
});

function alterTime(xLoc) {
  let width = progress.clientWidth;

  let progFactor = xLoc / width;
  let bubbleFactor = progFactor * 100;
  let subFactor = (14 / width) * 100;
  bubble.style.left = bubbleFactor - subFactor + "%";
  bubble.style.opacity = "1";
  setTimeout((e) => {
    bubble.style.opacity = "0";
  }, 1000);

  let curTime = progFactor * sonDuration;

  let curSec = Math.floor(curTime);
  let curMin = Math.floor(curSec / 60);

  let displaySec = String(((curSec % 60) / 100).toFixed(2));

  bubble.innerHTML = curMin + ":" + displaySec[2] + displaySec[3];

  audio.currentTime = curTime;

  let progBarr = progFactor * 100;

  progress.style.background = `linear-gradient(to right, orange ${progBarr}%, white ${progBarr}%)`;
}

function changePos(e) {
  let xLoc;

  let boundRect = progress.getBoundingClientRect();

  if (e.type == "click") {
    xLoc = e.offsetX;
    alterTime(xLoc);
  } else {
    xLoc = e.touches[0].clientX - boundRect.left;
    alterTime(xLoc);
  }
}

progress.addEventListener("click", changePos);
progress.addEventListener("touchstart", changePos);
progress.addEventListener("touchmove", changePos);
progress.addEventListener("mousemove", mouseMover);
progress.addEventListener("mouseout", (e) => {
  bubble.style.opacity = "0";
});

function mouseMover(e) {
  let xLoc = e.offsetX;
  let width = progress.clientWidth;

  let progFactor = xLoc / width;
  let bubbleFactor = progFactor * 100;
  let subFactor = (14 / width) * 100;
  bubble.style.left = bubbleFactor - subFactor + "%";
  bubble.style.opacity = "1";

  let curTime = progFactor * sonDuration;

  let curSec = Math.floor(curTime);
  let curMin = Math.floor(curSec / 60);

  let displaySec = String(((curSec % 60) / 100).toFixed(2));

  bubble.innerHTML = curMin + ":" + displaySec[2] + displaySec[3];
}

audio.addEventListener("loadeddata", function () {
  let duration = audio.duration;

  let span = document.querySelector(".span-time");

  let sonSec = Math.floor(duration);
  sonDuration = sonSec;
  progress.value = 0.0;

  let sonMin = Math.floor(sonSec / 60);
  sonSec = sonSec - sonMin * 60;
  sonSec = (sonSec / 100).toFixed(2);

  span.innerHTML = sonMin + ":" + sonSec[2] + sonSec[3];

  let bpmData = bpms[curSon.id];
  let sonOffset = bpmData[0];
  let animCont = bpmData[1];
  let bpm = bpmData[2] / 60;
  let scaleFact = bpmData[3];
  let rotateFact = bpmData[4];

  let bounceDur = animCont - sonOffset;

  if (animCont == 0) {
    bounceDur = sonDuration - sonOffset;
  }
  let bouncy = (1 / bpm) * scaleFact;
  let rotatey = (1 / bpm) * rotateFact * 8;

  document.documentElement.style.setProperty("--bounceSpeed", `${bouncy}s`);

  document.documentElement.style.setProperty("--rotateSpeed", `${rotatey}s`);

  cube.style.animationDelay = `${sonOffset}s`;
  artcon.style.animationDelay = `${sonOffset}s`;
  coverArt.style.animationDelay = `${sonOffset}s`;
  logo.style.animationDelay = `${sonOffset}s`;
  floorShadow.style.animationDelay = `${sonOffset}s`;

  cube.style.animationIterationCount = bpm * bounceDur;
  artcon.style.animationIterationCount = bpm * bounceDur;
  coverArt.style.animationIterationCount = bpm * bounceDur;
  logo.style.animationIterationCount = bpm * bounceDur;
  floorShadow.style.animationIterationCount = bpm * bounceDur;
});

audio.addEventListener("timeupdate", function updateProgress() {
  let timeDisplay = document.querySelector(".time-display");

  let curTime = audio.currentTime;

  let curSec = Math.floor(curTime).toFixed(2);
  let curMin = Math.floor(Math.floor(curSec) / 60);

  let now = ((curSec / sonDuration) * 100).toFixed(2);

  progress.style.background = `linear-gradient(to right, #eeb3b9  ${now}%, white ${now}%)`;
  progress.value = now;

  let displaySec = String(((curSec % 60) / 100).toFixed(2));

  timeDisplay.innerHTML = curMin + ":" + displaySec[2] + displaySec[3];
});
