const giveawayDate = document.querySelector('.giveaway-date');
const timers = document.querySelectorAll('.deadline-format h4');
const monthList = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June', 
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const currentDate = new Date();

let findNextSunday = (currentDate) => {
  const DAYS = 7;
  /* Calculates days until Sunday, 6 - 1 for Mon - Sat, 7 for Sun. */
  const daysUntilSunday = DAYS - currentDate.getDay();
  /* Creates and returns new Date at next Sunday, 12:00pm */
  let nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + daysUntilSunday);
  nextDate.setHours(12, 0, 0, 0);
  return nextDate;
};

const nextSunday = findNextSunday(currentDate);
const day = nextSunday.getDate();
const month = monthList[nextSunday.getMonth()];
const year = nextSunday.getFullYear();
giveawayDate.textContent = `${day} ${month} ${year}, 12:00pm`;

/* Calculates remaining Time until future day as an array in the format:
[days, hours, mins, secs] */
const getRemainingTime = (futureDay) => {
  const currentTime = new Date().getTime();
  let remainingTime = futureDay.getTime() - currentTime;

  /* Values in ms */
  const oneSec = 1000;
  const oneMin = oneSec * 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(remainingTime / oneDay);
  remainingTime -= days * oneDay;
  const hours = Math.floor(remainingTime / oneHour);
  remainingTime -= hours * oneHour;
  const mins = Math.floor(remainingTime / oneMin);
  remainingTime -= mins * oneMin;
  const secs = Math.floor(remainingTime / oneSec);

  return [days, hours, mins, secs];
}

const setTimers = (futureDay) => {
  const times = getRemainingTime(futureDay);
  timers.forEach((timer, index) => {
    timer.textContent = times[index];
  });
}

setTimers(nextSunday);
const countdown = setInterval(setTimers, 1000, nextSunday);