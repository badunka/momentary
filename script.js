// DOM Elements
const body = document.querySelector('body'),
  time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  btn = document.getElementById('btn'),
  btnImg = document.getElementById('btnImg'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind'),
  img = document.createElement('img');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const nameMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  let today = new Date(),
    date = today.getDate();
    month = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    dayWeek = days[today.getDay()]
    nowMonth = nameMonth[today.getMonth()]



  // 24hr Format
  hour = hour % 24 || 24;

  // Output Time
  time.innerHTML = `<div>${dayWeek}<span> </span>${date}<span>, </span>${nowMonth}</div>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

   if (hour < 6 || hour == 24) {
  // Night
  document.body.style.backgroundImage = `url(./assets/images/night/${Math.floor(Math.random()*6 + 1)}.jpg)`;
  greeting.textContent = 'Good Night, ';
  document.body.style.color = 'white';
} else if (hour < 12 || hour == 6) {
    // Morning
    document.body.style.backgroundImage = `url(./assets/images/morning/${Math.floor(Math.random()*6 + 1)}.jpg)`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18 || hour == 12) {
    // Afternoon
    document.body.style.backgroundImage = `url(./assets/images/day/${Math.floor(Math.random()*6 + 1)}.jpg)`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24 || hour == 18) {
    // Evening
    document.body.style.backgroundImage = `url(./assets/images/evening/${Math.floor(Math.random()*6 + 1)}.jpg)`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
}
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let nameStr = '';

function clickName(e) {
  localStorage.setItem('name', e.target.innerText);
  nameStr = localStorage.getItem('name');
  if (e.type === 'click') {
    name.textContent = '';
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
  if (localStorage.getItem('name') === '') {
    localStorage.setItem('name', e.target.innerText);
    name.textContent = nameStr;
    localStorage.removeItem('name');
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

let focusStr = '';

function clickFocus(e) {
  localStorage.setItem('focus', e.target.innerText);
  focusStr = localStorage.getItem('focus');
  if (e.type === 'click') {
    focus.textContent = '';
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
  if (localStorage.getItem('focus') === "") {
    localStorage.setItem('focus', e.target.innerText);
    focus.textContent = focusStr;
    localStorage.removeItem('focus');
  }
}

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=91030d7833c517df1638d752fcc8ae10&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity.toFixed()}%`;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed()}m/s`;
}
  catch(err) {
      alert("Неверное название локации");
    }
  }
getWeather()

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

function getImage() {
  if (document.body.style.backgroundImage.includes('night')) {
    const src = `./assets/images/morning/${Math.floor(Math.random()*6 + 1)}.jpg`
    img.src = src
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
    }
    } else if (document.body.style.backgroundImage.includes('morning')) {
    const src = `./assets/images/day/${Math.floor(Math.random()*6 + 1)}.jpg`
    img.src = src
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
    }
  } else if (document.body.style.backgroundImage.includes('day')) {
    const src = `./assets/images/evening/${Math.floor(Math.random()*6 + 1)}.jpg`
    img.src = src
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
    }
  } else if (document.body.style.backgroundImage.includes('evening')) {
    const src = `./assets/images/night/${Math.floor(Math.random()*6 + 1)}.jpg`
    img.src = src
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`
    }
  }
}


document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);
city.addEventListener('keypress', setCity);
btn.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickName);
focus.addEventListener('click', clickFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btnImg.addEventListener('click', getImage);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getImage();
