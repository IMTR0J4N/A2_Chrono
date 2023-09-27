import '../css/style.css';
import '../css/reset.css';

const sec = document.getElementById('sec'), milisec = document.getElementById('milisec');

let isPaused = false;

let interval;

const initTime = () => {  
    if(!isPaused) {
        resetTime()
    }

    isPaused = false

    if(!interval) {
        interval = setInterval(() => {
            if(parseInt(milisec.innerText) === 100) {
                milisec.innerText = '00';
                if(sec === 60) {
    
                }
                parseInt(sec.innerText) < 9 ? sec.innerText = `0${parseInt(sec.innerText) + 1}` : sec.innerText++
            }
    
            parseInt(milisec.innerText) < 9 ? milisec.innerText = `0${parseInt(milisec.innerText) + 1}` : milisec.innerText++
        }, 10)
    }
}

const pauseTime = () => {
    isPaused = !isPaused;

    if(isPaused) {
        clearInterval(interval)
        interval = null;
    }
}

const resetTime = () => {
    sec.innerText = `00`;
    milisec.innerText = `00`;
}

const displayStoredTime = () => {
    if(isPaused && !interval) {
        const storedTime = getTime();

        if(storeTime) {
            sec.innerText = storedTime[0];
            milisec.innerText = storedTime[1];
        }
    }
}

const storeTime = (sec, milisec) => {
    if(isPaused) {
        localStorage.setItem('sec', sec);
        localStorage.setItem('milisec', milisec); 
    }
}

const getTime = () => {
    if(localStorage.getItem('sec') && localStorage.getItem('milisec')) {
        return [localStorage.getItem('sec'), localStorage.getItem('milisec')]
    }

    return false
}

document.getElementById('start').addEventListener('click', initTime);
document.getElementById('stop').addEventListener('click', pauseTime);
document.getElementById('erase').addEventListener('click', resetTime);
document.getElementById('store').addEventListener('click', () => { storeTime(sec.innerText, milisec.innerText) });
document.getElementById('restore').addEventListener('click', displayStoredTime)