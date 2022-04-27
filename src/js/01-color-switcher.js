const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

let intervalID = null;

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalID = setInterval(changeBodyBgColor, 1000);

  switchBtns();
}

function onStopBtnClick() {
  clearInterval(intervalID);
  switchBtns();
}

function changeBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchBtns() {
  refs.start.disabled = !refs.start.disabled;
  refs.stop.disabled = !refs.stop.disabled;
}
