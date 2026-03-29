console.log("\n=== 2. ЛОГІЧНІ ОПЕРАТОРИ ===");

function isNumberInRange(num, min, max) {
    return num >= min && num <= max;
}
console.log("Число 15 в діапазоні [10, 20]:", isNumberInRange(15, 10, 20));

let isWorking = true;
console.log("Стан до NOT:", isWorking);
isWorking = !isWorking;
console.log("Стан після NOT:", isWorking);