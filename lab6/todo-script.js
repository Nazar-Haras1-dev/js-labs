// ==========================================
// 1. СТАН
// ==========================================
let tasks = [];
let currentSort = null;

// ==========================================
// 2. ЧИСТІ ФУНКЦІЇ (Бізнес-логіка)
// ==========================================
const createTask = (text) => ({ id: Date.now().toString(), text, completed: false, dateAdded: Date.now(), dateUpdated: Date.now() });

const addTask = (state, text) => [...state, createTask(text)];

const removeTask = (state, id) => state.filter(t => t.id !== id);

const toggleTaskStatus = (state, id) => state.map(t => t.id === id ? { ...t, completed: !t.completed, dateUpdated: Date.now() } : t);

const sortTasks = (state, sortBy) => {
    const sorted = [...state];
    if (sortBy === 'dateAdded') sorted.sort((a, b) => a.dateAdded - b.dateAdded);
    if (sortBy === 'dateUpdated') sorted.sort((a, b) => a.dateUpdated - b.dateUpdated);
    // Сортуємо: спочатку невиконані, потім виконані
    if (sortBy === 'status') sorted.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
    return sorted;
};

// ==========================================
// 3. РОБОТА З DOM ТА ПОДІЯМИ
// ==========================================
const listEl = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');

// МАНІПУЛЯЦІЯ DOM: Функція відображення
const render = () => {
    listEl.innerHTML = ''; // Очищаємо список в HTML
    const processedTasks = sortTasks(tasks, currentSort);

    processedTasks.forEach(t => {
        const li = document.createElement('li'); // Створюємо <li>
        if (t.completed) li.classList.add('completed'); // Змінюємо клас в DOM, якщо завдання виконано
        
        li.innerHTML = `
            <span class="task-text" data-id="${t.id}">${t.text}</span>
            <div class="task-actions">
                <button class="btn-edit" data-id="${t.id}">✎</button>
                <button class="btn-del" data-id="${t.id}">✖</button>
            </div>
        `;
        listEl.appendChild(li); // Вставляємо <li> в <ul>
    });
};

// ПОДІЇ DOM: Обробка кліків по списку (видалення, редагування, статус)
listEl.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    if (!id) return;

    if (e.target.classList.contains('btn-del')) {
        tasks = removeTask(tasks, id);
        render();
    } else if (e.target.classList.contains('btn-edit')) {
        const task = tasks.find(t => t.id === id);
        input.value = task.text; // Вставляємо текст завдання в input у DOM
        tasks = removeTask(tasks, id); // Видаляємо старе, щоб при збереженні воно стало новим
        render();
        input.focus(); // DOM API: ставимо фокус на поле вводу
    } else if (e.target.classList.contains('task-text')) {
        // Клік по самому тексту завдання - перемикаємо статус
        tasks = toggleTaskStatus(tasks, id);
        render();
    }
});

// ПОДІЇ DOM: Сортування
document.getElementById('sort-controls').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentSort = e.target.getAttribute('data-sort');
        render();
    }
});

// ПОДІЇ DOM: Відправка форми
form.addEventListener('submit', (e) => {
    e.preventDefault();
    tasks = addTask(tasks, input.value); // Читаємо value з DOM і передаємо в чисту функцію
    input.value = ''; // Очищаємо поле в DOM
    render();
});