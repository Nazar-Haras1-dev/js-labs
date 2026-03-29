const bulb = document.getElementById('bulb');
const toggleBtn = document.getElementById('toggleBulbBtn');
const bulbType = document.getElementById('bulbType');
const brightnessBtn = document.getElementById('brightnessBtn');

let isOn = false;
let inactivityTimer;

function toggleBulb() {
    isOn = !isOn;
    if (isOn) {
        bulb.classList.remove('off');
        bulb.classList.add('on', bulbType.value);
        toggleBtn.innerText = "Виключити";
        resetInactivityTimer();
    } else {
        bulb.className = 'bulb off'; 
        bulb.style.filter = ''; 
        toggleBtn.innerText = "Включити";
        clearTimeout(inactivityTimer);
    }
}

function resetInactivityTimer() {
    if (!isOn) return;
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (isOn) toggleBulb();
        console.log("Лампочка вимкнена через бездіяльність (5 хв).");
    }, 5 * 60 * 1000); 
}

toggleBtn.addEventListener('click', toggleBulb);

bulbType.addEventListener('change', () => {
    if (isOn) {
        bulb.className = `bulb on ${bulbType.value}`;
    }
});

brightnessBtn.addEventListener('click', () => {
    if (!isOn) return alert("Спочатку увімкніть лампочку!");
    let val = prompt("Введіть яскравість від 10 до 100:", "100");
    if (val && !isNaN(val) && val >= 10 && val <= 100) {
        bulb.style.filter = `brightness(${val}%)`;
    }
});

document.addEventListener('mousemove', resetInactivityTimer);