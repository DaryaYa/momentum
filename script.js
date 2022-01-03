const locationToken = '608d0ed27f66fc';
const OPEN_WEATHER = '985407983380c5d99fa1bb48a8e0eec0';
const UNSPLASH_KEY = '7f3414d36c39132ae4aae83156a242d1c6ce22dbadf927f69b5e1ddbb4c2842c';
// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  userName = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  bgButton = document.querySelector('.bg-button'),
  quote = document.querySelector('.quote-today'),
  quoteAuthor = document.querySelector('.quote-author'),
  quoteButton = document.querySelector('.quote-button'),
  loc = document.querySelector('.location'),
  errorLoc = document.querySelector('.error'),
  locButton = document.querySelector('.loc-button');

const temperature1 = document.querySelector('.temperature1');
const feelsLike = document.querySelector('.feelsLike');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const icon = document.querySelector('.weather-icon');
const iconDescription = document.querySelector('.weather-description');
let city = localStorage.getItem('loc') || 'Minsk';
// Get Location 
 function getLocation() {
  return fetch(`https://ipinfo.io/json?token=${locationToken}`)
    .then((res) => res.json())
    .then((data) => {
    if (localStorage.getItem('loc') === null) { 
      loc.textContent = data.city;
      localStorage.setItem('loc', data.city)
    } else {
      loc.textContent = localStorage.getItem('loc');
    }
    });
}
// (localStorage.getItem('loc') !== data.city))
// City nice pics
function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?query=nature&${city}&client_id=${UNSPLASH_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.body.style.backgroundImage = `url("${data.urls.regular}")`;
    });
}

//Show weather forecast
 async function getWeatherForecast(city) {
  
    const myCity = city || localStorage.getItem('loc');
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${myCity}&lang=en&units=metric&APPID=${OPEN_WEATHER}`);
    const data = await res.json();
     if (res.ok) {
      localStorage.setItem('loc', city);
    temperature1.innerHTML = '';
    feelsLike.innerHTML = '';
    wind.innerHTML = '';
    humidity.innerHTML = '';
    const t = data.list[0].main.temp;
    const fL = data.list[0].main.feels_like;
    const w = data.list[0].wind.speed;
    const h = data.list[0].main.humidity;
    const iconCode = data.list[0].weather[0].icon;
    feelsLike.append(Math.round(fL));
    temperature1.append(`${Math.round(t)}`);
    wind.append(Math.round(w));
    humidity.append(Math.round(h));
    icon.setAttribute('alt', iconCode);
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    iconDescription.textContent = data.list[0].weather[0].description;
      } else {
    const data1 = await res;
    errorLoc.textContent = `Error ${res.status}! , ${data1.statusText}`;
    console.log(`Error ${res.status}! , ${data1.statusText}`);
  }
 }

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    
  // Output Time
  time.innerHTML = `<span>${addZero(hour)}:${addZero(min)}:${addZero(sec)}</span>`;

  setTimeout(showTime, 1000);
}
// Show date
function showDate() {
  let now = new Date(),
  month = now.getMonth(),
  day = now.getDate(),
  weekDay = now.getDay();

  date.innerHTML = `${getDate(weekDay)}, ${day} ${getMonth(month)}`;
}
// Week Day name
function getDate(number) {
  let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return day[number];
}
// Month name 
function getMonth(number) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[number];
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Math random 
function randomInteger(length) {
 return Math.floor(Math.random() * Math.floor(length - 1));
}

// Choose background
const path = './assets/images/';

function getPicIndex() {
  const arr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg"];
  let length = arr.length;
  const picIndex = randomInteger(length);
  return arr[picIndex];
}
  
// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(),
    dayTime = '';  

  if ((hour < 12) && (hour >= 6)) {  
    dayTime = 'morning/';
    greeting.textContent = 'Good Morning, ';
  } else if ((hour < 18) && (hour>=12)) {
    dayTime = 'day/';
    greeting.textContent = 'Good Afternoon, ';
  } else if ((hour>= 18) && (hour <24)) {
    dayTime = 'evening/';
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    dayTime = 'night/';
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
  document.body.style.backgroundImage = `url(${path}${dayTime}${getPicIndex()}`;
}

// Shaw all pics
function allBG() {
  let array = ['morning/', 'day/', 'evening/', 'night/'];
  let day = randomInteger(array.length);   
let fullPath = `${path}${array[day]}${getPicIndex()}`;
  // document.body.style.backgroundImage = `url(${path}${array[day]}${getPicIndex()}`;  
   let img = document.createElement('img');
    img.src = fullPath;
    img.onload = () => document.body.style.backgroundImage = `url(${fullPath}), url('assets/images/overlay.png')`;
}

// Get Name
function getName() {
  if ((localStorage.getItem('name') === null) || (localStorage.getItem('name').length == 0)) {
    userName.value = 'Enter Name';
  } else {
    userName.textContent = localStorage.getItem('name');
    userName.style.borderBottom = 'none';
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      e.target.innerText === '' ? getName() : localStorage.setItem('name', e.target.innerText);
      userName.blur();
    }
  } else {
    e.target.innerText === '' ? getName() : localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if ((localStorage.getItem('focus') === null) || (localStorage.getItem('focus').length == 0)) {
    focus.value = 'Enter Focus';
  } else {
    focus.textContent = localStorage.getItem('focus');
    focus.style.borderBottom = 'none';
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      e.target.innerText === '' ? getFocus() : localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    e.target.innerText === '' ? getFocus() : localStorage.setItem('focus', e.target.innerText);
  }
}

function clickTarget(event) {
  event.target.innerText = '';
}

//Get Quote of the Day
async function getQuote() {
  const url = "https://type.fit/api/quotes";
  const res = await fetch(url);
  const data = await res.json();

  let index = randomInteger(data.length);

  quote.textContent = data[index].text;
  quoteAuthor.textContent = data[index].author;
}

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
userName.addEventListener('click', clickTarget);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickTarget);
bgButton.addEventListener('click', allBG);
quoteButton.addEventListener('click', getQuote);
loc.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {    
    errorLoc.textContent = '';
    getWeatherForecast(e.target.textContent);
    // localStorage.setItem('loc', e.target.textContent);
    city = e.target.textContent;
    getLinkToImage();
    e.target.blur();
  }  
})

// locButton.addEventListener('click', ()=> {
//   getLocation();
//   localStorage.setItem('loc', loc.textContent);
//   city = loc.textContent;
//   errorLoc.textContent = '';
// })

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getQuote();
getLocation();
getWeatherForecast(city);