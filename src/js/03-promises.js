import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const formData = {};

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  collectData(e.currentTarget);

  initPromiseLoop();

  e.currentTarget.reset();
}

function initPromiseLoop() {
  const { delay: firstDelay, step, amount } = formData;

  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onFailure);

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function collectData(form) {
  [...form.elements].forEach(({ name, value }) => (formData[name] = Number(value)));
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
