import playList from './playList.js';

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
    getQuotes()
}


function getSlidePrev() {
    for (let i = 0; i < 7; i++) {
        imgNum--
    if (imgNum == 1) {
        imgNum = 6
    }
}
    setBg()
    getQuotes()
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
    try {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    } else {
        city.value = 'Minsk'
    }
    localStorage.setItem('city', city.value);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=642c6906cb87f8bbd6fb881d3801b5ac&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`
} catch (error) {
    console.error(error);
}
}

getWeather();

city.addEventListener('change', function() {
    localStorage.setItem('city', city.value)
    getWeather()
})


// Quotes

const quoteElement = document.querySelector('.quote')
const authorElement = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

async function getQuotes() {
    const quotes = './src/dataEn.json';
    const res = await fetch(quotes);
    const data = await res.json()
    let random = Math.floor(Math.random() * (6 - 1) + 1)

    quoteElement.textContent = data[timeOfDay][random].text
    authorElement.textContent = data[timeOfDay][random].author

    changeQuote.addEventListener('click', function() {

        if (timeOfDay === 'morning') {
        quoteElement.textContent = data.morning[random].text
        authorElement.textContent = data.morning[random].author
        }
    })

    changeQuote.addEventListener('click', function() {

        let random = Math.floor(Math.random() * (6 - 1) + 1)
        if (timeOfDay === 'afternoon') {
        quoteElement.textContent = data.afternoon[random].text
        authorElement.textContent = data.afternoon[random].author
        }
    })

    changeQuote.addEventListener('click', function() {

        let random = Math.floor(Math.random() * (6 - 1) + 1)
        if (timeOfDay === 'evening') {
        quoteElement.textContent = data.evening[random].text
        authorElement.textContent = data.evening[random].author
        }
    })

    changeQuote.addEventListener('click', function() {

        let random = Math.floor(Math.random() * (6 - 1) + 1)
        if (timeOfDay === 'night') {
        quoteElement.textContent = data.night[random].text
        authorElement.textContent = data.night[random].author
        }
    })

    // This is quotes for certain characters

    // for (let i = 0; i < 6; i++) {
    //     if (imgNum && timeOfDay === 'morning') {
    //         if (imgNum == i + 1 && imgNum <= 6) {
    //         quoteElement.textContent = data.morning[i].text
    //         authorElement.textContent = data.morning[i].author
    //     }
    // }   
    // }

    // for (let i = 0; i < 6; i++) {
    //     if (imgNum && timeOfDay === 'afternoon') {
    //         if (imgNum == i + 1 && imgNum <= 6) {
    //         quoteElement.textContent = data.afternoon[i].text
    //         authorElement.textContent = data.afternoon[i].author
    //     }
    // }   
    // }

    // for (let i = 0; i < 6; i++) {
    //     if (imgNum && timeOfDay === 'evening') {
    //         if (imgNum == i + 1 && imgNum <= 6) {
    //         quoteElement.textContent = data.evening[i].text
    //         authorElement.textContent = data.evening[i].author
    //     }
    // }   
    // }

    // for (let i = 0; i < 6; i++) {
    //     if (imgNum && timeOfDay === 'night') {
    //         if (imgNum == i + 1 && imgNum <= 6) {
    //         quoteElement.textContent = data.night[i].text
    //         authorElement.textContent = data.night[i].author
    //     }
    // }   
    // }
 }

getQuotes()


// Audio

    let currentTrack = document.querySelector('.track-name');
    let progressBar = document.querySelector('.progress-bar');
    let volume = document.querySelector('.volume');
    let currentDuration = document.querySelector('.current-duration');
    let totalDuration = document.querySelector('.total-duration');
    const playBtn = document.querySelector('.play')
    const audio = new Audio;
    let isPlay = false;


    playList.forEach((playListItem) => {
    const li = document.createElement('li');
    const playListContainer = document.querySelector('.play-list')
    playListContainer.append(li)
    li.classList.add('play-item')
    li.textContent = playListItem.title
})

    function updateTrack() {
        audio.src = playList[playNum].src
        currentTrack.textContent = playList[playNum].title
        audio.currentTime = 0;
        totalDuration.textContent = playList[playNum].duration
    }

    
    function playAudio() {

    playBtn.addEventListener('click', function() {
        updateTrack()
    if(!isPlay) {
        audio.play();
        isPlay = true;
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
    } else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
    }
    })
    }


  let playNum = 0;
  const nextBtn = document.querySelector('.play-next');
  const prevBtn = document.querySelector('.play-prev');


    nextBtn.addEventListener('click', function() {
       
        if(playNum + 1 < playList.length) {
            playNum++;
            updateTrack();
            console.log(playNum)
        } else {
            playNum = 0;
            updateTrack();
        }

        if(playBtn.classList.contains('pause')) {
            audio.play()
        } else {
            audio.pause()
        }

        clearInterval(intervalId)
    })


    prevBtn.addEventListener('click', function() {
  
        if(playNum - 1 >= 0) {
            playNum--;
            updateTrack();
            audio.play();
            console.log(playNum)
        } else {
            playNum = playList.length - 1;
            updateTrack();
            audio.play();
        }

        if(playBtn.classList.contains('pause')) {
            audio.play()
        } else {
            audio.pause()
        }
        
        clearInterval(intervalId)
    })

  playAudio();



  let intervalId
  
  function updateCurrentDuration() {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60)
    currentDuration.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10? "0"+ seconds: seconds}`
  }

  audio.addEventListener('play', function() {
    clearInterval(intervalId)
    intervalId = setInterval(updateCurrentDuration, 1000);
  })

  audio.addEventListener('pause', function() {
    clearInterval(intervalId)
  })

  audio.addEventListener('ended', function() {
    clearInterval(intervalId)
  })

  volume.addEventListener('input', function() {
    audio.volume = volume.value / 100;
  })

