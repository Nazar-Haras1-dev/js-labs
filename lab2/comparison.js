console.log(" ОПЕРАТОРИ ПОРІВНЯННЯ ===");

function getMinMax(arr) {
    if (arr.length === 0) return "Масив порожній";
    return { min: Math.min(...arr), max: Math.max(...arr) };
}
const myArr = [12, 5, 27, 8, 3];
console.log(`Масив: [${myArr}] -> Min/Max:`, getMinMax(myArr));

function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}

const userA = { name: "Nazar", role: "student" };
const userB = { name: "Nazadr", role: "student" };
console.log("Порівняння userA та userB:", compareObjects(userA, userB));