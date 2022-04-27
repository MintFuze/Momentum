const name = document.querySelector('.name')
const quoteDiv = document.querySelector('.quote')
const authorDiv = document.querySelector('.author')
const quote = document.querySelector('.change-quote')
let num = 0;
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');


function myTextHours()
{
    const now = new Date();
const hours = now.getHours();
if (hours <10){return '0'+hours+':'}
else{return hours+':';}

}

function myTextMinutes()
{
    const now = new Date();
const minute = now.getMinutes();
if (minute <10){return '0'+minute+':'}
else{return minute+':';}
}

function myTextSeconds()
{
    const now = new Date();
const seconds = now.getSeconds();
if (seconds <10){return '0'+seconds}
else{return seconds;}
}

function myTextDate()
{
    const now = new Date();
    let textMonth = ["January","Fabruary","March","April","May","June","July","August","September","October","November","December"]
    let textDayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const day = now.getDay();
    const date = now.getDate();
    return textDayOfWeek[now.getDay()]+ ", "+textMonth[now.getMonth()]+" "+date;
}

// function getTimeOfDay()
// {
//     const now = new Date();
//     const hours = now.getHours();
//     if (hours >=6 && hours <=12){return 'Good morning,'}
//     if (hours >=12 && hours <=18) {return 'Good afternoon,',console.log(hours)}
//     if (hours >=18 && hours<=0) {return 'Good evening,'}
//     if (hours >=0 && hours <=6) {return 'Good night,' }
    
// }

function getTimeOfDay(){
    const now = new Date();
    const minute = now.getMinutes();
    const hours = now.getHours();
if( hours < 6 || hours == 24) {return 'Good night,'} 
else if(hours <= 12) {return 'Good morning,'} 
else if (hours < 18) {return 'Good afternoon,'}
else {return 'Good evening,'}
}

function getRandomNum(){
    min = Math.ceil(1);
    max = Math.floor(21);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
let littleNum= function getLittleRandomNum(){
    min = Math.ceil(1);
    max = Math.floor(4);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// function setBg(){
//     const hours = now.getHours();
//     const num = getRandomNum();
//     if (hours <12){return body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/"+num+".jpg')";}
//     if (hours >12||hours<18) {return body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/"+num+".jpg')";}
//     if (hours >18) {return body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/"+num+".jpg')";}
// }


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=4688b304f972a6ab320dd3ac66415201&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  async function getNewWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4688b304f972a6ab320dd3ac66415201&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  
  function setCity(event) {
    if (event.code === 'Enter') {
      getNewWeather();
      city.blur();
    }
  }
  

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    quoteDiv.textContent = data[num].text;
    authorDiv.textContent = data[num].author;
  }
getQuotes();

async function changeQuote() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    num++;
    quoteDiv.textContent = data[num].text;
    authorDiv.textContent = data[num].author;
   if (num==2){
       num=-1;
   }
    
}

function setLocalStorage() {
    localStorage.setItem('.name', name.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('.name')) {
      name.value = localStorage.getItem('.name');
    }
  } 
  window.addEventListener('load', getLocalStorage)

setInterval(function() {
    document.querySelector('.hour').innerHTML = myTextHours();
},1);

setInterval(function() {
    document.querySelector('.minute').innerHTML = myTextMinutes();
},1);

setInterval(function() {
    document.querySelector('.second').innerHTML = myTextSeconds();
},1);

setInterval(function() {
    document.querySelector('.date').innerHTML = myTextDate();
},1);
setInterval(function() {
    document.querySelector('.greeting').innerHTML = getTimeOfDay();
},50);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
quote.addEventListener('click',changeQuote);
