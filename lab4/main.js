
function task1_fruits() {
    console.log("%c=== Завдання 1 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let fruits = ["банан", "апельсин", "яблуко", "ківі", "груша"];
    
    fruits.pop(); 
    console.log("Після видалення останнього:", fruits);
    
    fruits.unshift("ананас"); 
    console.log("Після додавання 'ананас':", fruits);
    
    fruits.sort().reverse(); 
    console.log("У зворотньому алфавітному порядку:", fruits);
    
    let appleIndex = fruits.indexOf("яблуко");
    console.log("Індекс елемента 'яблуко':", appleIndex);
}

function task2_colors() {
    console.log("%c\n=== Завдання 2 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let colors = ["червоний", "темно-синій", "зелений", "синій", "світло-синій", "жовтий"];
    
    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);
    console.log(`Найдовший: ${longest} | Найкоротший: ${shortest}`);
    
    let blueColors = colors.filter(color => color.includes("синій"));
    console.log("Тільки сині кольори:", blueColors);
    
    let joinedColors = blueColors.join(", ");
    console.log("Об'єднаний рядок:", joinedColors);
}


function task3_employees() {
    console.log("%c\n=== Завдання 3 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let employees = [
        { name: "Остап", age: 30, position: "менеджер" },
        { name: "Анна", age: 25, position: "розробник" },
        { name: "Богдан", age: 45, position: "директор" },
        { name: "Вікторія", age: 28, position: "розробник" }
    ];
    
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Відсортовані за іменами:", [...employees]);
    
    let developers = employees.filter(emp => emp.position === "розробник");
    console.log("Всі розробники:", developers);
    
    employees = employees.filter(emp => emp.age <= 40);
    console.log("Після видалення працівників старше 40:", [...employees]);
    
    employees.push({ name: "Тарас", age: 23, position: "тестувальник" });
    console.log("Оновлений масив працівників:", employees);
}

function task4_students() {
    console.log("%c\n=== Завдання 4 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Олена", age: 19, course: 1 },
        { name: "Дмитро", age: 21, course: 3 }
    ];
    
    students = students.filter(student => student.name !== "Олексій");
    console.log("Після видалення Олексія:", [...students]);
    
    students.push({ name: "Марія", age: 22, course: 4 });
    console.log("Після додавання Марії:", [...students]);
    
    students.sort((a, b) => b.age - a.age);
    console.log("Відсортовані за віком:", [...students]);
    
    let thirdCourseStudent = students.find(student => student.course === 3);
    console.log("Студент 3-го курсу:", thirdCourseStudent);
}

function task5_numbers() {
    console.log("%c\n=== Завдання 5 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let numbers = [1, 2, 3, 4, 5, 6];
    
    let squared = numbers.map(num => num ** 2);
    console.log("Квадрати чисел:", squared);
    
    let evens = numbers.filter(num => num % 2 === 0);
    console.log("Парні числа:", evens);
    
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log("Сума елементів:", sum);
    
    let extraNumbers = [7, 8, 9, 10, 11];
    let combinedArray = numbers.concat(extraNumbers);
    console.log("Об'єднаний масив:", [...combinedArray]);
    
    combinedArray.splice(0, 3); 
    console.log("Після splice (видалено перші 3):", combinedArray);
}

function task6_libraryManagement() {
    console.log("%c\n=== Завдання 6 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    function libraryManagement() {
        let books = [
            { title: "1984", author: "Джордж Орвелл", genre: "Антиутопія", pages: 328, isAvailable: true },
            { title: "Кобзар", author: "Тарас Шевченко", genre: "Поезія", pages: 700, isAvailable: false }
        ];
        
        return {
            addBook(title, author, genre, pages) {
                books.push({ title, author, genre, pages, isAvailable: true });
                console.log(`Додано книгу: "${title}"`);
            },
            removeBook(title) {
                books = books.filter(book => book.title !== title);
                console.log(`Книгу "${title}" видалено.`);
            },
            findBooksByAuthor(author) {
                return books.filter(book => book.author === author);
            },
            toggleBookAvailability(title, isBorrowed) {
                let book = books.find(b => b.title === title);
                if (book) {
                    book.isAvailable = !isBorrowed;
                    console.log(`Статус книги "${title}" змінено на: ${book.isAvailable ? 'доступна' : 'взята'}`);
                }
            },
            sortBooksByPages() {
                books.sort((a, b) => a.pages - b.pages);
                console.log("Книги відсортовано за кількістю сторінок.");
            },
            getBooksStatistics() {
                let totalBooks = books.length;
                let availableBooks = books.filter(b => b.isAvailable).length;
                let borrowedBooks = totalBooks - availableBooks;
                let totalPages = books.reduce((sum, b) => sum + b.pages, 0);
                let averagePages = totalBooks > 0 ? Math.round(totalPages / totalBooks) : 0;
                
                return { totalBooks, availableBooks, borrowedBooks, averagePages };
            },
            getAllBooks: () => [...books] 
        };
    }

    const myLib = libraryManagement();
    
    myLib.addBook("Тіні забутих предків", "Михайло Коцюбинський", "Повість", 120);
    myLib.toggleBookAvailability("1984", true); 
    
    console.log("Книги Орвелла:", myLib.findBooksByAuthor("Джордж Орвелл"));
    
    myLib.sortBooksByPages();
    console.log("Всі книги:", myLib.getAllBooks());
    console.log("Статистика:", myLib.getBooksStatistics());
}

function task7_studentObject() {
    console.log("%c\n=== Завдання 7 ===", "color: blue; font-weight: bold; font-size: 14px;");
    
    let student = {
        name: "Назар",
        age: 19,
        course: 2
    };
    
    student.subjects = ["Програмування", "Бази даних", "Алгоритми", "Веб-розробка"];
    
    delete student.age;
    
    console.log("Оновлений об'єкт студента:", student);
}
task1_fruits();
task2_colors();
task3_employees();
task4_students();
task5_numbers();
task6_libraryManagement();
task7_studentObject();

