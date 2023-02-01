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
    const date = new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options)
    dateEl.textContent = currentDate;
}


//Greeting

const greet = document.querySelector('.greeting')

const date = new Date()
const hours = date.getHours()

const greetWord = ['morning', 'afternoon', 'evening', 'night']

function getTimeOfDay() {
    let position = hours / 6;
    if (position < 6) {
        return 'night'
    }
    if (12 > position > 6) {
        return 'morning'
    }
    if (18 > position > 12) {
        return 'evening'
    }
    if (24 > position > 18) {
        return 'afternoon'
    }
}

const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greet.textContent = greetingText;

const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorage)



