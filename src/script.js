import playList from './playList.js';

//Clock and calendar


let currentLanguage = 'en';
const time = document.querySelector('.time');
const dateEl = document.querySelector('.date');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    setInterval(showTime, 1000);
}
showTime();


function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    let currentDate;
    if (currentLanguage === 'en') {
    currentDate = date.toLocaleDateString('en-US', options);
    } else {
    currentDate = date.toLocaleDateString('ru-RU', options);    
    }
    dateEl.textContent = currentDate;
}


//Greeting

const greet = document.querySelector('.greeting');


const date = new Date();
const hours = date.getHours();


function getTimeOfDay() {
    let position = hours / 6;
    if (position < 1) {
        return 'night';
    }
    if (position >= 1 && position < 2) {
        return 'morning';
    }
    if (position >= 2 && position < 3) {
        return 'afternoon';
    }
    if (position >= 3) {
        return 'evening';
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
        name.value = localStorage.getItem('name') ; 
}
}

window.addEventListener('load', getLocalStorage);


//Slider

const body = document.querySelector('body');
body.style.backgroundImage = "url('https://raw.githubusercontent.com/gewious/momentum/assets/afternoon/03.jpg')";

let imgNum;

function getRandomNum() {
    imgNum = Math.floor(Math.random() * (11-1)) + 1;
}


function setBg() {
    getRandomNum();
    const bgNum = imgNum.toString().padStart(2, '0');
    body.style.transition = 'all ease 1s';

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/gewious/momentum/assets/${getTimeOfDay()}/${bgNum}.jpg`;
    img.onload = () => {  
    body.style.backgroundImage = `url('${img.src}')`;
    }
    }



function getSlideNext() {
    for (let i = 0; i < 11; i++) {
        imgNum++;
    if (imgNum == 10) {
        imgNum = 1;
    }
}
    setBg();
    getQuotes();
}


function getSlidePrev() {
    for (let i = 0; i < 11; i++) {
        imgNum--;
    if (imgNum == 1) {
        imgNum = 10;
    }
}
    setBg();
    getQuotes();
}


const slidePrev = document.querySelector('.slide-prev.slider-icon');
const slideNext = document.querySelector('.slide-next.slider-icon');


//Weather

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');


async function getWeather() {
    let url = '';
    try {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    } else if (currentLanguage === 'en') {
        city.value = 'Minsk';
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=642c6906cb87f8bbd6fb881d3801b5ac&units=metric`;
    } else if (currentLanguage === 'ru') {
        city.value = 'Минск';
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=642c6906cb87f8bbd6fb881d3801b5ac&units=metric`;
    }

    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${currentLanguage === 'en'? 'Humidity' : 'Влажность'} ${data.main.humidity}%`;
    wind.textContent = `${currentLanguage === 'en'? 'Wind speed' : 'Скорость ветра'} ${Math.round(data.wind.speed)}m/s`;
    weatherError.textContent = null;
} catch (error) {
    console.log(error);
    weatherError.textContent = 'There is no such city';
    temperature.textContent = null;
    weatherDescription.textContent = null;
    humidity.textContent = null;
    wind.textContent = null;
    weatherIcon.className = null;
}
}

getWeather();


city.addEventListener('change', function() {
    localStorage.setItem('city', city.value);
    getWeather()
})


// Quotes

const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotesEn() {
    const quotes = './src/dataEn.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let random = Math.floor(Math.random() * (10 - 0) + 0);

    quoteElement.textContent = data[timeOfDay][random].text;
    authorElement.textContent = data[timeOfDay][random].author;

    changeQuote.addEventListener('click', function() {

        if (timeOfDay === 'morning' && currentLanguage === 'en') {
        let random = Math.floor(Math.random() * (10 - 0) + 0);
        quoteElement.textContent = data.morning[random].text;
        authorElement.textContent = data.morning[random].author;
        }
    })

    changeQuote.addEventListener('click', function() {

        if (timeOfDay === 'afternoon' && currentLanguage === 'en') {
        let random = Math.floor(Math.random() * (10 - 0) + 0);
        quoteElement.textContent = data.afternoon[random].text;
        authorElement.textContent = data.afternoon[random].author;
        }
    })

    changeQuote.addEventListener('click', function() {

        
        if (timeOfDay === 'evening' && currentLanguage === 'en') {
        let random = Math.floor(Math.random() * (10 - 0) + 0);
        quoteElement.textContent = data.evening[random].text;
        authorElement.textContent = data.evening[random].author;
        }
    })

    changeQuote.addEventListener('click', function() {

        
        if (timeOfDay === 'night' && currentLanguage === 'en') {
        let random = Math.floor(Math.random() * (10 - 0) + 0);
        quoteElement.textContent = data.night[random].text;
        authorElement.textContent = data.night[random].author;
        }
    })
    }

    getQuotesEn();


    async function getQuotesRu() {
        const quotes = './src/dataRu.json';
        const res = await fetch(quotes);
        const data = await res.json();
        let random = Math.floor(Math.random() * (10 - 0) + 0);
    
        quoteElement.textContent = data[timeOfDay][random].text;
        authorElement.textContent = data[timeOfDay][random].author;
    
        changeQuote.addEventListener('click', function() {
    
            if (timeOfDay === 'morning' && currentLanguage === 'ru') {
            let random = Math.floor(Math.random() * (10 - 0) + 0);
            quoteElement.textContent = data.morning[random].text;
            authorElement.textContent = data.morning[random].author;
            }
        })
    
        changeQuote.addEventListener('click', function() {
    
            if (timeOfDay === 'afternoon' && currentLanguage === 'ru') {
            let random = Math.floor(Math.random() * (10 - 0) + 0);
            quoteElement.textContent = data.afternoon[random].text;
            authorElement.textContent = data.afternoon[random].author;
            }
        })
    
        changeQuote.addEventListener('click', function() {
    
            
            if (timeOfDay === 'evening' && currentLanguage === 'ru') {
            let random = Math.floor(Math.random() * (10 - 0) + 0);
            quoteElement.textContent = data.evening[random].text;
            authorElement.textContent = data.evening[random].author;
            }
        })
    
        changeQuote.addEventListener('click', function() {
    
            
            if (timeOfDay === 'night' && currentLanguage === 'ru') {
            let random = Math.floor(Math.random() * (10 - 0) + 0);
            quoteElement.textContent = data.night[random].text;
            authorElement.textContent = data.night[random].author;
            console.log(random);
            }
        })
    }

        



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
 




// Audio

    let currentTrack = document.querySelector('.track-name');
    let progressBar = document.querySelector('.progress-bar');
    let volumeInput = document.querySelector('.volume');
    let currentDuration = document.querySelector('.current-duration');
    let totalDuration = document.querySelector('.total-duration');
    const playBtn = document.querySelector('.play');
    const playPrev = document.querySelector('.play-prev');
    const playNext = document.querySelector('.play-next');
    const audio = new Audio;
    let isPlay = false;

    playList.forEach((playListItem) => {
    const li = document.createElement('li');
    const ul = document.querySelector('.play-list');
    ul.append(li);
    li.textContent = playListItem.title;
    li.classList.add('play-item');
    })

    let songsTitles = document.querySelectorAll('.play-item');
    let prevSong = null;


    songsTitles.forEach((song, index) => {
        song.addEventListener('click', function() {
            playNum = index;
            playAudio();
            if (prevSong !== null  && prevSong !== song) {
                prevSong.classList.remove('item-active');
            }
            if (song.classList.contains('item-active')) {
                song.classList.remove('item-active');
            } else {
                song.classList.add('item-active');
            }
            prevSong = song;
        })
    })

    audio.addEventListener('pause', function() {
          song.classList.remove('item-active');
      });
    
    let playNum = 0;

    function updateTrack() {
        audio.src = playList[playNum].src;
        currentTrack.textContent = playList[playNum].title;
        audio.currentTime = 0;
        totalDuration.textContent = playList[playNum].duration;
        progressBar.value = 0;
    }

    function playAudio() {
        updateTrack();
        if (!isPlay) {
            audio.play();
            playBtn.classList.remove('play');
            playBtn.classList.add('pause');
            isPlay = true;
        } else {
            audio.pause()
            playBtn.classList.remove('pause');
            playBtn.classList.add('play');
            isPlay = false;
        }
        updateTime();
    } 

    playBtn.addEventListener('click', playAudio);

    playBtn.addEventListener('click', function() {
        if(audio.paused) {
            songsTitles.forEach((song) => {
                song.classList.remove('item-active');
            }) 
        }
    })

    audio.addEventListener('pause', function() {
        if (prevSong !== null) {
            prevSong.classList.remove('item-active');
        }
    });


    function playPrevAudio() {
        if(playNum - 1 >= 0) {
            playNum--;
            updateTrack();
        } else {
            playNum = 2
            updateTrack();
        } 
        if (playBtn.classList.contains('pause')) {
            audio.play();
        } else {
            audio.pause();
        }
        console.log(playNum)
    }

    function playNextAudio() {
        if (playNum + 1 < playList.length) {
            playNum++;
            updateTrack();
        } else {
            playNum = 0;
            updateTrack();
        }
        if (playBtn.classList.contains('pause')) {
            audio.play();
        } else {
            audio.pause();
        }
        console.log(playNum);
    }

    playNext.addEventListener('click', playNextAudio);
    playPrev.addEventListener('click', playPrevAudio);

    
    volumeInput.addEventListener('input', function() {
        audio.volume = volumeInput.value / 100;
    })
    
    function updateCurrentDuration() {
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        currentDuration.textContent = `${minutes < 10? '0' + minutes: minutes}:${seconds < 10? '0'+seconds: seconds}`;
    }

    let animationFrameId

    function updateTime() {
        updateCurrentDuration();
        animationFrameId = requestAnimationFrame(updateTime);
    }


    progressBar.addEventListener('change', function() {
        let pct = progressBar.value / 100;
        audio.currentTime = (audio.duration || 0) * pct;
    })


    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        if (playNum + 1 < playList.length) {
            playNum++;
            updateTrack();
        } else {
            playNum = 0;
            updateTrack();
        }
        if (playBtn.classList.contains('pause')) {
            audio.play();
        } else {
            audio.pause();
        }
    })


    document.querySelectorAll('.play-item').forEach((li) => {
        li.addEventListener('click', function() {
            for (let i = 0; i < playList.length; i++) {
                
            }
        })
    })

    document.querySelector('.no-volume-icon').addEventListener('click', function() {
        volumeInput.value = 0;
        audio.volume = 0;
    })

    document.querySelector('.volume-icon').addEventListener('click', function() {
        volumeInput.value = 100;
        audio.volume = 1;
    })




    //API images

    //Unsplash API

    let apiWords = document.querySelector('.api-input');

    
    apiWords.addEventListener('change', function() {
        if(apiWords.value === '') {
            url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=Chnu35uN-HASy55TRmOR1oHV0gpfYfbSnSjVTb7-RLI`
            getUnsplashImages();
        } else {
            url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${apiWords.value}&client_id=Chnu35uN-HASy55TRmOR1oHV0gpfYfbSnSjVTb7-RLI`
            getUnsplashImages();
        }
    })

    async function getUnsplashImages() {
        let url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=Chnu35uN-HASy55TRmOR1oHV0gpfYfbSnSjVTb7-RLI`
        const res = await fetch(url);
        const data = await res.json();
        const imgUrl = data.urls.regular;
    
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
        body.style.backgroundImage = `url(${imgUrl})`;
        body.style.transition = 'all ease 1s';
        }
    }



    //Flickr API

    let index = 0;
    let imgUrls = [];
    let flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f7f699c19eae630eeb94c55a83147095&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;

    apiWords.addEventListener('change', function() {
        if(apiWords.value === '') {
            flickrUrl =  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f7f699c19eae630eeb94c55a83147095&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
            getFlickrImage();
        } else {
            flickrUrl =  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f7f699c19eae630eeb94c55a83147095&tags=${apiWords.value}&extras=url_l&format=json&nojsoncallback=1`;
            getFlickrImage();
        }
    })

    async function getFlickrImage() {
    
        const res = await fetch(flickrUrl);
        const data = await res.json();
        const imgUrl = data.photos.photo[index].url_l;
        imgUrls.push(imgUrl);
        const img = new Image();
        img.src = imgUrl;

        img.onload = () => {

        body.style.backgroundImage = `url(${imgUrl})`;
        body.style.transition = 'all ease 1s';
        index = (index + 1);
        }
    }


    slideNext.addEventListener('click', function() {
    const selectedValue = select.value;
  
    if (selectedValue === 'github') {
        setBg();
    } else if (selectedValue === 'unsplash-api') {
        getUnsplashImages();
    } else if (selectedValue === 'flickr-api') {
        getFlickrImage();
    }
    })

    
    slidePrev.addEventListener('click', function() {
    const selectedValue = select.value;
  
    if (selectedValue === 'github') {
        setBg();
    } else if (selectedValue === 'unsplash-api') {
        getUnsplashImages();
    } else if (selectedValue === 'flickr-api') {
        getFlickrImage();
    }
    })

    const select = document.getElementById('select');


    select.addEventListener('change', function() {
    const selectedValue = this.value;
  
    if (selectedValue === 'github') {
        setBg();
    } else if (selectedValue === 'unsplash-api') {
        getUnsplashImages();
    } else if (selectedValue === 'flickr-api') {
        getFlickrImage();
    }
    });



    //Translation

    const englishBtn = document.querySelector('.english');
    const russianBtn= document.querySelector('.russian');
    const language = document.querySelector('.language');


    englishBtn.addEventListener('click', function() {
        currentLanguage = 'en';
        if (!englishBtn.classList.contains('clicked')) {
            englishBtn.classList.add('clicked');
            russianBtn.classList.remove('clicked');
        }
        if (timeOfDay === 'night' && currentLanguage === 'en') {
            greet.textContent = 'Good night';
        }
        if (timeOfDay === 'evening' && currentLanguage === 'en') {
            greet.textContent = 'Good evening';
        }
        if (timeOfDay === 'afternoon' && currentLanguage === 'en') {
            greet.textContent = 'Good afternoon';
        }
        if (timeOfDay === 'morning' && currentLanguage === 'en') {
            greet.textContent = 'Good morning';
        }
        if (currentLanguage === 'en') {
        language.textContent = 'Language';
        document.getElementsByName('enter-name')[0].placeholder = '[Enter name]';
        document.querySelector('.settingGreeting').textContent = 'Greeting';
        document.querySelector('.settingTime').textContent = 'Time';
        document.querySelector('.settingDate').textContent = 'Date';
        document.querySelector('.settingQuote').textContent = 'Quote';
        document.querySelector('.settingWeather').textContent = 'Weather';
        document.querySelector('.settingAudio').textContent = 'Audio';
        document.querySelector('.settingTodo').textContent = 'ToDo';
        document.querySelector('.source').textContent = 'Photo source';
        getQuotesEn();
        getWeather();
        }
    })


    russianBtn.addEventListener('click', function() {
        currentLanguage = 'ru';
        if (!russianBtn.classList.contains('clicked')) {
            russianBtn.classList.add('clicked');
            englishBtn.classList.remove('clicked');
        }

        if (timeOfDay === 'night' && currentLanguage === 'ru') {
            greet.textContent = 'Доброй ночи';
        }
        if (timeOfDay === 'evening' && currentLanguage === 'ru') {
            greet.textContent = 'Доброго вечера';
        }
        if (timeOfDay === 'afternoon' && currentLanguage === 'ru') {
            greet.textContent = 'Добрый день';
        }
        if (timeOfDay === 'morning' && currentLanguage === 'ru') {
            greet.textContent = 'Доброе утро';
        }
        if (currentLanguage === 'ru') {
        language.textContent = 'Язык';
        document.getElementsByName('enter-name')[0].placeholder = '[Введите имя]';
        document.querySelector('.settingGreeting').textContent = 'Приветствие';
        document.querySelector('.settingTime').textContent = 'Время';
        document.querySelector('.settingDate').textContent = 'Дата';
        document.querySelector('.settingQuote').textContent = 'Цитата';
        document.querySelector('.settingWeather').textContent = 'Погода';
        document.querySelector('.settingAudio').textContent = 'Аудио';
        document.querySelector('.settingTodo').textContent = 'ToDo';
        document.querySelector('.source').textContent = 'Источник фото';
        getQuotesRu();
        getWeather();
        }
    })









    //Settings

const settings = document.querySelector('.settings');
const settingsList = document.querySelector('.settings-list');

settings.addEventListener('click', function() {
  if(settingsList.classList.contains('settings-height')) {
    settingsList.classList.remove('settings-height');
    settingsList.classList.add('language_opacity');
  } else {
    settingsList.classList.add('settings-height');
    settingsList.classList.remove('language_opacity');
  }
})


document.querySelector('.checkbox-ios.one').addEventListener('click', function() {
    // if (document.querySelector('.greeting-container').classList.contains('hide')) {
    //     document.querySelector('.greeting-container').classList.remove('hide')
    // } else {
        document.querySelector('.greeting-container').classList.add('hide')
    // }
})

document.querySelector('.checkbox-ios.two').addEventListener('click', function() {
    time.classList.add('hide');
})

document.querySelector('.checkbox-ios.three').addEventListener('click', function() {
    dateEl.classList.add('hide');
})

document.querySelector('.checkbox-ios.four').addEventListener('click', function() {
    document.querySelector('.quote_wrapper').classList.add('hide')
})

document.querySelector('.checkbox-ios.five').addEventListener('click', function() {
    document.querySelector('.weather').classList.add('hide')
})

document.querySelector('.checkbox-ios.six').addEventListener('click', function() {
    document.querySelector('.player').classList.add('hide');
})

document.querySelector('.checkbox-ios.seven').addEventListener('click', function() {
    document.querySelector('.todo-list').classList.add('hide');
})