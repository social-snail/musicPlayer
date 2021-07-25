const audio = document.querySelector(".audio");

const viewHeight = document.documentElement.clientHeight;
const viewWidth = document.documentElement.clientWidth;

const bodyBlock = document.querySelector(".complete-wrap");

let topp;
let bottomm;

if (viewHeight > 700) {
  topp = (viewHeight - 700) / 2 + "px";
} else {
  topp = 10 + "px";
  bottomm = 10 + "px";
}

bodyBlock.style.top = topp;
bodyBlock.style.bottom = bottomm;

const colorKeys = [
  "--bodyColor",
  "--bodyColorSecond",
  "--completeWrapBack",
  "--completeWrapFirst",
  "--completeWrapSecond",
  "--socialCover",
  "--toggleHouseBorder",
  "--toggleHouseColor",
  "--toggleRoundBorder",
  "--toggleRoundColor",
  "--progBarColor",
  "--progThumbColor",
  "--cubeBright",
  "--currentSongBack",
  "--currentSongColor",
  "--currentSongPin",
  "--floorGradFirst",
  "--floorGradSecond",
  "--floorRadialGrad",
];

const colorVals = [
  "rgb(245, 147, 163)",
  "#fff",
  "rgb(211, 46, 73)",
  "rgba(245, 214, 214, 0.8)",
  "rgb(214, 80, 102)",
  "rgb(238, 183, 183)",
  "rgb(218, 136, 136)",
  "#fffc",
  "palevioletred",
  "rgb(223, 156, 156)",
  "#eeb3b9",
  "rgb(241, 158, 172)",
  "1",
  "#fff3",
  "rgb(156, 79, 79)",
  "rgb(223, 156, 156)",
  "rgb(238, 139, 139)",
  "rgb(243, 188, 188)",
  "rgb(255, 235, 235)",
];

const darkVals = [
  "rgb(0, 0, 0)",
  "rgb(68, 16, 26)",
  "rgb(61, 6, 16)",
  "rgba(105, 54, 54, 0.8)",
  "rgb(48, 5, 13)",
  "rgb(95, 42, 42)",
  "rgb(241, 202, 202)",
  "#fff7",
  "rgb(247, 193, 211)",
  "rgb(230, 221, 221)",
  "#864a4f",
  "rgb(173, 95, 108)",
  "0.8",
  "#fff2",
  "rgb(223, 156, 156)",
  "rgb(223, 156, 156)",
  "rgb(107, 24, 24)",
  "rgb(117, 62, 62)",
  "rgb(145, 97, 97)",
];

let lightObj = {};
let darkObj = {};

colorKeys.forEach((key, index) => (lightObj[key] = colorVals[index]));
colorKeys.forEach((key, index) => (darkObj[key] = darkVals[index]));

const toggle = document.querySelector("#darkmode");
const toggleHouse = document.querySelector(".toggle-house");
const toggleRound = document.querySelector(".toggle-round");

let dark = false;

toggle.onclick = (e) => {
  dark = toggle.checked;

  if (dark) {
    toggleRound.style.left = "60%";

    Object.keys(darkObj).forEach((key) => {
      document.documentElement.style.setProperty(key, darkObj[key]);
    });
  } else {
    toggleRound.style.left = "";

    Object.keys(lightObj).forEach((key) => {
      document.documentElement.style.setProperty(key, lightObj[key]);
    });
  }
};

const bubble = document.querySelector(".bubble");

const scene = document.querySelector(".scene");
const cube = document.querySelector(".cube");
const artcon = document.querySelector(".artcon");
const floorShadow = document.querySelector(".floor-shadow");

const logo = document.querySelector(".logoImg");
const socials = document.querySelector(".socials");
const icons = document.querySelector(".icons");

let clickk = 0;

logo.onclick = (e) => {
  if (!clickk) {
    clickk = 1;
    socials.style.opacity = 1;
    socials.style.top = "10%";
    icons.style.cursor = "pointer";
  } else {
    clickk = 0;
    socials.style.opacity = 0;
    socials.style.top = "3%";
    icons.style.cursor = "auto";
  }
};

const animList = [logo, scene, cube, artcon, floorShadow];

const animNames = [
  "imgScl",
  "sceneRotate",
  "cubeContract",
  "artRotate",
  "artShadow",
];

const songs = [
  "Resilience(Master).mp3",
  "Patience(Master).mp3",
  "Joy(Master).mp3",
  "Recursion(Master).mp3",
];

const bpms = [
  [0.5, 137, 105, 2, 8],
  [0, 0, 175, 2, 4],
  [0, 0, 140, 2, 2],
  [0.571, 195, 155, 4, 8],
];

const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");

let sonDuration;
let progress = document.querySelector(".progress");
let animDelay;

audio.load();
progress.value = 0.0;

// PLAY AUDIO
function playFromPrep() {
  setTimeout((e) => {
    audio.play();
  }, 530);

  setTimeout((e) => {
    animList.forEach((anim) => {
      anim.style.animationPlayState = "running";
    });
  }, animDelay + 170);

  playBtn.classList.add("playin");
  playBtn.classList.remove("notplayin");
}

const resi = document.querySelector(".resilience");
const pati = document.querySelector(".patience");
const joy = document.querySelector(".joy");
const recu = document.querySelector(".recursion");

// TITLE BUTTON INTERFACE

let curSon = document.querySelector(".current-song");
btnVisib(curSon);

function prepFromTitle(song) {
  if (!audio.paused) {
    audio.pause();
  }

  setTimeout((e) => {
    animList.forEach((anim) => {
      anim.style.animationPlayState = "paused";
    });

    curSon.classList.remove("current-song");

    song.classList.add("current-song");

    curSon = song;

    audio.src = "./audio/" + songs[song.id];

    btnVisib(curSon);

    progress.value = 0.0;
  }, 200);
}

resi.addEventListener("click", function strSong() {
  prepFromTitle(resi);
  setTimeout(playFromPrep, 50);
});

pati.addEventListener("click", function strSong() {
  prepFromTitle(pati);
  setTimeout(playFromPrep, 50);
});

joy.addEventListener("click", function strSong() {
  prepFromTitle(joy);
  setTimeout(playFromPrep, 50);
});

recu.addEventListener("click", function strSong() {
  prepFromTitle(recu);
  setTimeout(playFromPrep, 50);
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

    animList.forEach((anim) => {
      anim.style.animationPlayState = "paused";
    });
  } else {
    audio.play();
    playBtn.classList.add("playin");
    playBtn.classList.remove("notplayin");

    animList.forEach((anim) => {
      anim.style.animationPlayState = "running";
    });
  }
});

audio.addEventListener("playing", (e) => {
  playBtn.classList.add("playin");
  playBtn.classList.remove("notplayin");
});

audio.addEventListener("ended", function stopAnim() {
  animList.forEach((anim) => {
    anim.style.animationPlayState = "paused";
  });

  let avoid = false;

  setTimeout((e) => {
    let targ;

    if (!(curSon.id == 3)) {
      targ = curSon.nextElementSibling;
      prepFromTitle(targ);
    } else {
      avoid = true;
    }
  }, 1000);

  setTimeout((e) => {
    if (!avoid) {
      playFromPrep();
    }
  }, 2000);

  playBtn.classList.add("notplayin");
  playBtn.classList.remove("playin");
});

function alterTime(xLoc) {
  let width = progress.clientWidth;

  if (xLoc <= width && xLoc >= 0) {
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
  } else if (xLoc < 0) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = audio.duration;
  }
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

  if (xLoc <= width && xLoc >= 0) {
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

  animDelay = sonOffset * 1000;

  animList.forEach((anim) => {
    anim.style.animationIterationCount = bpm * bounceDur;
  });
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
