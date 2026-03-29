console.log("\n=== 3. УМОВНІ ОПЕРАТОРИ ===");

function getGradeWord(score) {
    if (score >= 90 && score <= 100) return "відмінно";
    if (score >= 75 && score < 90) return "добре";
    if (score >= 60 && score < 75) return "задовільно";
    if (score >= 0 && score < 60) return "незадовільно";
    return "некоректна оцінка";
}
console.log("Оцінка 82 бали — це:", getGradeWord(82));

function getSeasonWithIf(month) {
    if (month >= 1 && month <= 12) {
        if (month === 12 || month <= 2) return "Зима";
        if (month >= 3 && month <= 5) return "Весна";
        if (month >= 6 && month <= 8) return "Літо";
        return "Осінь";
    }
    return "Некоректний місяць";
}
console.log("8-й місяць (через if) — це:", getSeasonWithIf(8));

function getSeasonWithTernary(month) {
    return (month >= 1 && month <= 12) 
        ? (month === 12 || month <= 2) ? "Зима" 
        : (month >= 3 && month <= 5) ? "Весна" 
        : (month >= 6 && month <= 8) ? "Літо" 
        : "Осінь"
        : "Некоректний місяць";
}
console.log("2-й місяць (через ?) — це:", getSeasonWithTernary(2));