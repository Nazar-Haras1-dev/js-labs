// Годинник
setInterval(() => {
    const now = new Date();
    document.getElementById('hours').innerText = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').innerText = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('seconds').innerText = String(now.getSeconds()).padStart(2, '0');
}, 1000);

// Таймер
let countdownTimer;
document.getElementById('startCountdownBtn').addEventListener('click', () => {
    clearInterval(countdownTimer);
    const targetDate = new Date(document.getElementById('countdownInput').value).getTime();
    
    if (isNaN(targetDate)) return alert("Оберіть правильну дату!");

    countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdownDisplay').innerText = "Час вийшов!";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdownDisplay').innerText = `Залишилось: ${d} дн, ${h} год, ${m} хв, ${s} сек`;
    }, 1000);
});

// Календар
document.getElementById('calendarInput').addEventListener('change', (e) => {
    document.getElementById('calendarDisplay').innerText = e.target.value; 
});

// День народження
document.getElementById('bdayBtn').addEventListener('click', () => {
    const bdayStr = document.getElementById('bdayInput').value;
    if (!bdayStr) return alert("Введіть дату!");
    
    let bdayDate = new Date(bdayStr);
    const now = new Date();
    
    bdayDate.setFullYear(now.getFullYear());
    
    if (bdayDate < now) {
        bdayDate.setFullYear(now.getFullYear() + 1);
    }

    const diff = bdayDate - now;
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(daysTotal / 30.44);
    const days = Math.floor(daysTotal % 30.44);
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('bdayDisplay').innerText = 
        `До дня народження залишилось: ${months} міс, ${days} дн, ${h} год, ${m} хв, ${s} сек.`;
});