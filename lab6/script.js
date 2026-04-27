// ==========================================
// 1. СТАН ДОДАТКУ (State)
// ==========================================
let products = [];
let currentFilter = null;
let currentSort = null;

// ==========================================
// 2. ЧИСТІ ФУНКЦІЇ (Pure Functions)
// Вони нічого не знають про DOM. Вони просто беруть дані, обробляють їх і повертають нові дані.
// ==========================================
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Додає товар у масив, не змінюючи оригінальний масив (повертає новий)
const addProduct = (state, product) => [...state, { ...product, id: generateId(), dateCreated: Date.now(), dateUpdated: Date.now() }];

// Фільтрує масив (видаляє товар)
const deleteProduct = (state, id) => state.filter(p => p.id !== id);

// Оновлює товар у масиві
const updateProduct = (state, updatedProduct) => state.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct, dateUpdated: Date.now() } : p);

// Рахує загальну суму
const calculateTotal = (state) => state.reduce((sum, p) => sum + Number(p.price), 0);

// Фільтрація
const filterProducts = (state, category) => category ? state.filter(p => p.category === category) : state;

// Сортування
const sortProducts = (state, key) => {
    if (!key) return state;
    return [...state].sort((a, b) => Number(a[key]) - Number(b[key]));
};

// ==========================================
// 3. ДОСТУП ДО DOM (Знаходимо елементи на сторінці)
// ==========================================
const listEl = document.getElementById('product-list');
const emptyMsgEl = document.getElementById('empty-message');
const totalEl = document.getElementById('total-price');
const modal = document.getElementById('modal');
const form = document.getElementById('product-form');
const snackbar = document.getElementById('snackbar');

// ==========================================
// 4. МАНІПУЛЯЦІЇ З DOM ТА UI
// Функції, які безпосередньо змінюють HTML
// ==========================================

// Показує Snackbar, додаючи клас до елемента DOM
const showSnackbar = (msg) => {
    snackbar.textContent = msg; // Змінюємо текстовий вузол
    snackbar.classList.add('show'); // Змінюємо клас (DOM)
    setTimeout(() => { snackbar.classList.remove('show'); }, 3000);
};

// Головна функція відмальовки сторінки. Викликається щоразу, коли змінюються дані.
const render = () => {
    // 1. Отримуємо дані для відображення (використовуючи чисті функції)
    const processedList = sortProducts(filterProducts(products, currentFilter), currentSort);
    
    // 2. Очищаємо попередній вміст DOM
    listEl.innerHTML = '';
    
    // 3. Змінюємо стилі DOM-елемента залежно від наявності товарів
    emptyMsgEl.style.display = products.length === 0 ? 'block' : 'none';
    
    // 4. Змінюємо текстовий вузол DOM (загальна вартість)
    totalEl.textContent = `Загальна вартість: ${calculateTotal(processedList)} ₴`;

    // 5. Створюємо нові DOM-вузли для кожного товару
    processedList.forEach(p => {
        const card = document.createElement('div'); // Створюємо новий елемент <div>
        card.className = 'product-card'; // Додаємо клас
        
        // Наповнюємо елемент HTML-розміткою
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>ID: ${p.id}</p>
            <p>Категорія: ${p.category}</p>
            <p><strong>Ціна: ${p.price} ₴</strong></p>
            <div class="card-actions">
                <button class="btn-edit" data-id="${p.id}">Редагувати</button>
                <button class="btn-delete" data-id="${p.id}">Видалити</button>
            </div>
        `;
        listEl.appendChild(card); // Вставляємо створену картку в DOM-дерево
    });
};

// ==========================================
// 5. ОБРОБНИКИ ПОДІЙ DOM (Event Listeners)
// ==========================================

// Обробка кліків по списку товарів (Делегування подій DOM)
listEl.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    
    if (e.target.classList.contains('btn-delete')) {
        products = deleteProduct(products, id); // Оновлюємо стан чистою функцією
        showSnackbar('Товар успішно видалено');
        render(); // Перемальовуємо DOM
    }
    
    if (e.target.classList.contains('btn-edit')) {
        const product = products.find(p => p.id === id);
        if (product) {
            // Заповнюємо значення input-ів у DOM
            document.getElementById('prod-id').value = product.id;
            document.getElementById('prod-name').value = product.name;
            document.getElementById('prod-price').value = product.price;
            document.getElementById('prod-category').value = product.category;
            document.getElementById('prod-img').value = product.img;
            document.getElementById('modal-title').textContent = 'Редагувати товар';
            modal.classList.add('active'); // Змінюємо клас для показу модалки
        }
    }
});

// Відкриття модалки додавання
document.getElementById('btn-add').addEventListener('click', () => {
    form.reset(); // Очищаємо форму (вбудований метод DOM)
    document.getElementById('prod-id').value = '';
    document.getElementById('modal-title').textContent = 'Додати товар';
    modal.classList.add('active'); // Показуємо модалку
});

// Закриття модалки
document.getElementById('btn-close-modal').addEventListener('click', () => {
    modal.classList.remove('active'); // Ховаємо модалку
});

// Обробка відправки форми (сабміту)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки
    
    // Зчитуємо значення з DOM
    const id = document.getElementById('prod-id').value;
    const newProduct = {
        name: document.getElementById('prod-name').value,
        price: document.getElementById('prod-price').value,
        category: document.getElementById('prod-category').value,
        img: document.getElementById('prod-img').value,
    };

    if (id) {
        products = updateProduct(products, { ...newProduct, id });
        showSnackbar(`Оновлено: ${id} - ${newProduct.name}`);
    } else {
        products = addProduct(products, newProduct);
        showSnackbar('Товар успішно додано');
    }
    modal.classList.remove('active'); // Ховаємо модалку (маніпуляція DOM)
    render(); // Перемальовуємо список
});

// Фільтрація (використовуємо делегування)
document.getElementById('filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        currentFilter = e.target.getAttribute('data-category');
        render();
    }
});

document.getElementById('btn-reset-filter').addEventListener('click', () => {
    currentFilter = null;
    currentSort = null;
    render();
});

// Сортування
document.getElementById('sorting').addEventListener('click', (e) => {
    if (e.target.classList.contains('sort-btn')) {
        currentSort = e.target.getAttribute('data-sort');
        render();
    }
});

// Первинна відмальовка при завантаженні скрипта
render();