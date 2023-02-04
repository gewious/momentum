//Clock and calendar

const time = document.querySelector('.time');
const dateEl = document.querySelector('.date');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    setInterval(showTime, 1000);
}
showTime()


function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    dateEl.textContent = currentDate;
}


//Greeting

const greet = document.querySelector('.greeting')

const date = new Date()
const hours = date.getHours()


function getTimeOfDay() {
    let position = hours / 6;
    if (position < 1) {
        return 'night'
    }
    if (position >= 1 && position < 2) {
        return 'morning'
    }
    if (position >= 2 && position < 3) {
        return 'afternoon'
    }
    if (position >= 3) {
        return 'evening'
    }
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greet.textContent = greetingText;


const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
}
}
window.addEventListener('load', getLocalStorage);


//Slider

const body = document.querySelector('body')
body.style.backgroundImage = "url('https://raw.githubusercontent.com/gewious/momentum/assets/afternoon/03.jpg')"

let imgNum 

function getRandomNum() {
    imgNum = Math.floor(Math.random() * (7-1)) + 1
}


function setBg() {
    getRandomNum()
    const bgNum = imgNum.toString().padStart(2, '0')
    body.style.transition = 'all ease 1s'

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/gewious/momentum/assets/${getTimeOfDay()}/${bgNum}.jpg`;
    img.onload = () => {  
    body.style.backgroundImage = `url('${img.src}')`;
    }
    }

setBg()


function getSlideNext() {
    for (let i = 0; i < 7; i++) {
        imgNum++
    if (imgNum == 6) {
        imgNum = 1
    }
}
    setBg()
}


function getSlidePrev() {
    for (let i = 0; i < 7; i++) {
        imgNum--
    if (imgNum == 1) {
        imgNum = 6
    }
}
    setBg()
}


const slidePrev = document.querySelector('.slide-prev.slider-icon');
const slideNext = document.querySelector('.slide-next.slider-icon');

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);


//Weather

const city = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');


async function getWeather() {
    if (city.value === '') {
        city.value = 'Minsk'
    } 
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=642c6906cb87f8bbd6fb881d3801b5ac&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`

}
getWeather();

city.addEventListener('change', getWeather)

