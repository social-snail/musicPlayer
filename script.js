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

const cfront = document.querySelector(".cfront");
const cleft = document.querySelector(".cleft");
const cright = document.querySelector(".cright");
const cback = document.querySelector(".cback");
const ctop = document.querySelector(".ctop");
const cbottom = document.querySelector(".cbottom");

const opac = [cfront, cleft, cright, cback, ctop, cbottom];

setTimeout((e) => {
  opac.forEach((side) => {
    side.style.opacity = 1;
    floorShadow.style.opacity = 1;
  });
}, 500);

const colorKeys = [
  "--bodyColor",
  "--bodyColorSecond",
  "--completeWrapBack",
  "--completeWrapFirst",
  "--completeWrapSecond",
  "--logoColor",
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
  "rgb(170, 122, 158)",
  "#fff",
  "rgb(246, 240, 250)",
  "rgba(201, 167, 191, 0.555)",
  "rgb(209, 144, 188)",
  "rgb(255, 249, 249)",
  "rgb(221, 200, 217)",
  "rgb(172, 78, 140)",
  "#fffc",
  "rgb(172, 78, 140)",
  "rgb(192, 138, 171)",
  "rgb(212, 195, 197)",
  "rgb(192, 138, 171)",
  "1",
  "#fff3",
  "rgb(243, 232, 232)",
  "rgb(192, 138, 171)",
  "rgb(197, 127, 156)",
  "rgb(247, 208, 238)",
  "rgb(255, 235, 235)",
];

const darkVals = [
  "rgba(0, 0, 0, 0.9)",
  "rgb(82, 56, 75)",
  "rgb(75, 17, 94)",
  "rgba(104, 95, 107, 0.555)",
  "rgb(66, 42, 59)",
  "rgb(214, 170, 170)",
  "rgb(91,60,101)",
  "rgb(241, 202, 202)",
  "#fff7",
  "rgb(247, 193, 211)",
  "rgb(230, 221, 221)",
  "rgb(133, 89, 118))",
  "rgb(223, 156, 156)",
  "0.8",
  "#fff2",
  "rgb(223, 156, 156)",
  "rgb(223, 156, 156)",
  "rgb(119, 71, 105)",
  "rgb(173, 109, 170)",
  "rgb(49, 47, 47)",
];

let lightObj = {};
let darkObj = {};

colorKeys.forEach((key, index) => (lightObj[key] = colorVals[index]));
colorKeys.forEach((key, index) => (darkObj[key] = darkVals[index]));

const toggle = document.querySelector("#darkmode");
const toggleHouse = document.querySelector(".toggle-house");
const toggleRound = document.querySelector(".toggle-round");

let dark = false;
const modeImgLight = document.querySelector(".light");
const modeImgDark = document.querySelector(".dark");
const elements = document.querySelector(".complete-wrap");

toggle.onclick = (e) => {
  window.navigator.vibrate([30]);

  dark = toggle.checked;
  elements.style.transition = "1s ease";

  setTimeout((e) => {
    elements.style.transition = "";
  }, 2000);

  if (dark) {
    toggleRound.style.left = "47%";

    modeImgDark.style.opacity = "1";
    modeImgLight.style.opacity = "0";

    floorShadow.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

    Object.keys(darkObj).forEach((key) => {
      document.documentElement.style.setProperty(key, darkObj[key]);
    });
  } else {
    toggleRound.style.left = "";

    modeImgDark.style.opacity = "0";
    modeImgLight.style.opacity = "1";

    floorShadow.style.backgroundColor = "rgba(0, 0, 0, 0.12)";

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
const artimg = document.querySelectorAll(".internal-image");

const logo = document.querySelector(".logoImg");
const socials = document.querySelector(".socials");
const icons = document.querySelector(".icons");

let clickk = 0;

logo.onclick = (e) => {
  window.navigator.vibrate([30]);

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

  setTimeout((e) => {
    clickk = 0;
    socials.style.opacity = 0;
    socials.style.top = "3%";
    icons.style.cursor = "auto";
  }, 6000);
};

const animList = [logo, scene, cube, artcon, floorShadow];

const songs = [
  "Resilience(Master).mp3",
  "Patience(Master).mp3",
  "Joy(Master).mp3",
  "Recursion(Master).mp3",
];

const bpms = [
  [0.5, 105, 2, 8],
  [0, 175, 2, 4],
  [0, 140, 2, 2],
  [0.571, 155, 4, 8],
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
  audio.play();
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

  curSon.classList.remove("current-song");

  song.classList.add("current-song");

  curSon = song;

  audio.src = "./audio/" + songs[song.id];
  audio.load();

  btnVisib(curSon);

  progress.value = 0.0;
}

resi.addEventListener("click", function strSong() {
  window.navigator.vibrate([30]);

  prepFromTitle(resi);
  playFromPrep();
});

pati.addEventListener("click", function strSong() {
  window.navigator.vibrate([30]);

  prepFromTitle(pati);
  playFromPrep();
});

joy.addEventListener("click", function strSong() {
  window.navigator.vibrate([30]);

  prepFromTitle(joy);
  playFromPrep();
});

recu.addEventListener("click", function strSong() {
  window.navigator.vibrate([30]);

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
  window.navigator.vibrate([30]);

  if (!audio.paused) {
    audio.pause();
  }

  setTimeout((e) => {
    let prevSon = curSon.previousElementSibling;
    prepFromTitle(prevSon);
    playFromPrep();
  }, 10);
});

nextBtn.addEventListener("click", function nextPrep() {
  window.navigator.vibrate([30]);

  if (!audio.paused) {
    audio.pause();
  }

  setTimeout((e) => {
    let nextSon = curSon.nextElementSibling;
    prepFromTitle(nextSon);
    playFromPrep();
  }, 10);
});

playBtn.addEventListener("click", function playClick() {
  window.navigator.vibrate([30]);

  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
});

document.body.onkeydown = (e) => {
  if (e.keyCode == 32) {
    e.preventDefault();

    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
    }
  } else if (e.keyCode == 37) {
    e.preventDefault();

    if (!audio.paused) {
      audio.pause();
    }

    if (!(curSon.id == 0)) {
      setTimeout((e) => {
        let prevSon = curSon.previousElementSibling;
        prepFromTitle(prevSon);
        playFromPrep();
      }, 10);
    }
  } else if (e.keyCode == 39) {
    e.preventDefault();

    if (!audio.paused) {
      audio.pause();
    }

    if (!(curSon.id == 3)) {
      setTimeout((e) => {
        let nextSon = curSon.nextElementSibling;
        prepFromTitle(nextSon);
        playFromPrep();
      }, 10);
    }
  }
};

audio.addEventListener("playing", (e) => {
  animList.forEach((anim) => {
    anim.style.animationPlayState = "running";
  });
  artimg.forEach((img) => {
    img.style.animationPlayState = "running";
  });

  playBtn.classList.add("playin");
  playBtn.classList.remove("notplayin");
});

audio.addEventListener("pause", (e) => {
  animList.forEach((anim) => {
    anim.style.animationPlayState = "paused";
  });
  artimg.forEach((img) => {
    img.style.animationPlayState = "paused";
  });

  playBtn.classList.add("notplayin");
  playBtn.classList.remove("playin");
});

audio.addEventListener("ended", function stopAnim() {
  animList.forEach((anim) => {
    anim.style.animationPlayState = "paused";
  });
  artimg.forEach((img) => {
    img.style.animationPlayState = "paused";
  });

  let avoid = false;

  setTimeout((e) => {
    let targ = 0;

    if (!(curSon.id == 3)) {
      avoid = false;
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

  if (xLoc <= width && xLoc > 0) {
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

    progress.style.background = `linear-gradient(to right, var(--progBarColor) ${progBarr}%, white ${progBarr}%)`;
  } else if (xLoc <= 0) {
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

  let bpm = bpmData[1] / 60;
  let scaleFact = bpmData[2];
  let rotateFact = bpmData[3];

  let bouncy = (1 / bpm) * scaleFact;
  let rotatey = (1 / bpm) * rotateFact * 8;

  document.documentElement.style.setProperty("--bounceSpeed", `${bouncy}s`);

  document.documentElement.style.setProperty("--rotateSpeed", `${rotatey}s`);
});

audio.addEventListener("timeupdate", function updateProgress() {
  let timeDisplay = document.querySelector(".time-display");

  let curTime = audio.currentTime;

  let curSec = Math.floor(curTime).toFixed(2);
  let curMin = Math.floor(Math.floor(curSec) / 60);

  let now = ((curSec / sonDuration) * 100).toFixed(2);

  if (!(now == "NaN")) {
    progress.style.background = `linear-gradient(to right, var(--progBarColor)  ${now}%, white ${now}%)`;
    progress.value = now;
  } else {
    progress.style.background = `linear-gradient(to right, var(--progBarColor)  0%, white 0%)`;
    progress.value = 0;
  }

  let displaySec = String(((curSec % 60) / 100).toFixed(2));

  timeDisplay.innerHTML = curMin + ":" + displaySec[2] + displaySec[3];
});
