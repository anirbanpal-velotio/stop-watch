let currentTime = 0;
let timer = null;
let timerState = true;
let splitEvents = [];
let reset = false;

const btnContainer = document.getElementById("control-Btn-container");
const strtBtn = document.getElementById("strt");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer-display");
const splitEventDisplay = document.getElementById("split-events");

//btn click css effects
btnContainer.addEventListener("mousedown", (evt) => {
  if (evt.target === strtBtn) {
    strtBtn.classList.add("btn-pressed");
  } else if (evt.target === splitBtn) {
    splitBtn.classList.add("btn-pressed");
  } else if (evt.target === resetBtn) {
    resetBtn.classList.add("btn-pressed");
  }
});
btnContainer.addEventListener("mouseup", (evt) => {
  if (evt.target === strtBtn) {
    strtBtn.classList.remove("btn-pressed");
  } else if (evt.target === splitBtn) {
    splitBtn.classList.remove("btn-pressed");
  } else if (evt.target === resetBtn) {
    resetBtn.classList.remove("btn-pressed");
  }
});

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      currentTime++;
      timerDisplay.innerHTML = formatTime();
      strtBtn.innerHTML = "pause";
      resetBtn.disabled = true;
      splitBtn.disabled = false;
    }, 10);
  }
}

function pauseTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    strtBtn.innerHTML = "start";
    resetBtn.disabled = false;
    splitBtn.disabled = true;
  }
}

function resetTimer() {
  pauseTimer();
  currentTime = 0;
  timerDisplay.innerHTML = formatTime();
  resetSplitEvents();
}

function formatTime() {
  let ms = currentTime % 100;
  const time = Math.floor(currentTime / 100);
  let hour = Math.floor(time / 3600);
  let minute = Math.floor((time - hour * 3600) / 60);
  let second = time - hour * 3600 - minute * 60;

  return `${hour}:${minute}:${second}:${ms}`;
}

function storeSplitEvents() {
  splitEvents.push(formatTime());
  if (splitEvents.length == 1) {
    splitEventDisplay.classList.add("top-border");
  }
  const div1 = document.createElement("div");
  div1.innerHTML = `#${splitEvents.length}`;
  const div2 = document.createElement("div");
  div2.innerHTML = `${splitEvents[splitEvents.length - 1]}`;
  splitEventDisplay.prepend(div2);
  splitEventDisplay.prepend(div1);
}

function resetSplitEvents() {
  delete splitEvents;
  splitEvents = [];
  splitEventDisplay.classList.remove("top-border");
  splitEventDisplay.innerHTML = "";
  timerState = true;
}

btnContainer.addEventListener("click", (evt) => {
  if (evt.target === strtBtn) {
    if (timerState) {
      startTimer();
    } else {
      pauseTimer();
    }
    timerState = !timerState;
  } else if (evt.target === resetBtn) {
    resetTimer();
  } else if (evt.target === splitBtn) {
    storeSplitEvents();
  }
});
