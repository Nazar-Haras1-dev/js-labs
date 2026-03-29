// ==========================================
// Завдання 1: Сума перших 50 натуральних чисел
// ==========================================
function task1_sumOfFirst50() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
        sum += i;
        i++;
    }
    return sum;
}

// ==========================================
// Завдання 2: Факторіал числа
// ==========================================
function task2_factorial(n) {
    if (isNaN(n) || n < 0) return "Помилка: введіть додатне число.";
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// ==========================================
// Завдання 3: Визначення місяця за номером
// ==========================================
function task3_getMonthName(monthNum) {
    switch (parseInt(monthNum)) {
        case 1: return "Січень";
        case 2: return "Лютий";
        case 3: return "Березень";
        case 4: return "Квітень";
        case 5: return "Травень";
        case 6: return "Червень";
        case 7: return "Липень";
        case 8: return "Серпень";
        case 9: return "Вересень";
        case 10: return "Жовтень";
        case 11: return "Листопад";
        case 12: return "Грудень";
        default: return "Некоректний номер місяця";
    }
}

// ==========================================
// Завдання 4: Сума парних чисел у масиві
// ==========================================
function task4_sumOfEvenNumbers(arr) {
    let sum = 0;
    
    for (let num of arr) {
        if (num % 2 === 0) { 
            sum += num;
        }
    }
    
    return sum;
}

// ==========================================
// Завдання 5: Стрілкова функція (голосні)
// ==========================================
const task5_countVowels = (str) => {
    const vowels = 'aeiouyаеєиіїоуюяAEIOUYАЕЄИІЇОУЮЯ';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
};

// ==========================================
// Завдання 6: Піднесення до степеня
// ==========================================
function task6_power(base, exponent) {
    return base ** exponent; 
}

// Підказка для консолі
console.log("%cУсі функції завантажено!");
