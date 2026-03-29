const circles = {
    red: document.getElementById('tl-red'),
    yellow: document.getElementById('tl-yellow'),
    green: document.getElementById('tl-green')
};
const statusText = document.getElementById('tl-status');

let tlTimes = { red: 5000, yellow: 3000, green: 7000 };
let currentTlState = 0; 
let tlTimeout;
let isTlRunning = false;

function clearLights() {
    Object.values(circles).forEach(c => c.classList.remove('active'));
}

function setTrafficLightState(stateIndex) {
    clearLights();
    clearTimeout(tlTimeout);
    currentTlState = stateIndex;

    if (stateIndex === 0) {
        circles.red.classList.add('active');
        statusText.innerText = "Червоний";
        statusText.style.color = "#ff3b3b";
        tlTimeout = setTimeout(() => setTrafficLightState(1), tlTimes.red);
    } 
    else if (stateIndex === 1) {
        circles.yellow.classList.add('active');
        statusText.innerText = "Жовтий";
        statusText.style.color = "#ffeb3b";
        tlTimeout = setTimeout(() => setTrafficLightState(2), tlTimes.yellow);
    } 
    else if (stateIndex === 2) {
        circles.green.classList.add('active');
        statusText.innerText = "Зелений";
        statusText.style.color = "#4caf50";
        tlTimeout = setTimeout(() => setTrafficLightState(3), tlTimes.green);
    } 
    else if (stateIndex === 3) {
        statusText.innerText = "Жовтий (мигає)";
        statusText.style.color = "#ffeb3b";
        let blinks = 0;
        let blinkInterval = setInterval(() => {
            circles.yellow.classList.toggle('active');
            blinks++;
            if (blinks >= 6) { 
                clearInterval(blinkInterval);
                setTrafficLightState(0); 
            }
        }, 500); 
        tlTimeout = blinkInterval; 
    }
}

document.getElementById('tl-start').addEventListener('click', () => {
    if (!isTlRunning) {
        isTlRunning = true;
        setTrafficLightState(0); 
    }
});

document.getElementById('tl-next').addEventListener('click', () => {
    if (!isTlRunning) return;
    clearTimeout(tlTimeout); 
    let nextState = (currentTlState + 1) % 4;
    setTrafficLightState(nextState);
});

document.getElementById('tl-settings').addEventListener('click', () => {
    let r = prompt("Час червоного (секунди):", tlTimes.red / 1000);
    let y = prompt("Час жовтого (секунди):", tlTimes.yellow / 1000);
    let g = prompt("Час зеленого (секунди):", tlTimes.green / 1000);
    
    if (r && y && g && !isNaN(r) && !isNaN(y) && !isNaN(g)) {
        tlTimes.red = r * 1000;
        tlTimes.yellow = y * 1000;
        tlTimes.green = g * 1000;
        alert("Час оновлено! Зміни вступлять в силу з наступного циклу.");
    }
});