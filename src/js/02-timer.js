import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer {
  constructor({ selector, date }) {
    this.date = date.getTime();
    this.timerEl = document.querySelector(selector);
    this.intervalID = null;

    this.makeRefs();
  }

  startTimer() {
    if (this.date < Date.now()) {
      return;
    }

    this.intervalID = setInterval(() => {
      if (this.date < Date.now()) {
        clearInterval(this.intervalID);

        Notify.success('Time is up!');

        return;
      }

      this.updateOutput();
    }, 1000);
  }

  makeRefs() {
    this.refs = {
      days: this.timerEl.querySelector('[data-days]'),
      hours: this.timerEl.querySelector('[data-hours]'),
      minutes: this.timerEl.querySelector('[data-minutes]'),
      seconds: this.timerEl.querySelector('[data-seconds]'),
    };
  }

  updateOutput() {
    const { days, hours, minutes, seconds } = this.convertMs(this.date - Date.now());

    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.addLeadingZero(hours);
    this.refs.minutes.textContent = this.addLeadingZero(minutes);
    this.refs.seconds.textContent = this.addLeadingZero(seconds);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.addEventListener('click', onStartBtnClick);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    verifyDate(selectedDates[0]);
  },
});

function onStartBtnClick() {
  const myTimer = new Timer({ selector: '.timer', date: new Date(inputEl.value) });
  myTimer.startTimer.call(myTimer);

  startBtn.disabled = true;
}

function verifyDate(date) {
  if (date.getTime() > Date.now()) {
    startBtn.disabled = false;
    return;
  }

  startBtn.disabled = true;
  Notify.failure('Please choose a date in the future');
}
