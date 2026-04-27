
const storeCatalog = new Map(); 
const activeCategories = new Set(); 
const productHistory = new WeakMap(); 
const activeCustomers = new WeakSet(); 

class Store {
    addProduct(id, name, price, stock, category) {
        const product = { id, name, price, stock, category };
        storeCatalog.set(id, product);
        activeCategories.add(category);
        
        productHistory.set(product, [`Додано з ціною ${price} та кількістю ${stock}`]);
        console.log(`[+] Додано продукт: ${name}`);
    }

    removeProduct(id) {
        const product = storeCatalog.get(id);
        if (product) {
            storeCatalog.delete(id);
            console.log(`[-] Видалено продукт: ${product.name}`);
        }
    }

    updateProduct(id, newPrice, newStock) {
        const product = storeCatalog.get(id);
        if (product) {
            product.price = newPrice;
            product.stock = newStock;
            
            const history = productHistory.get(product);
            history.push(`Оновлено: нова ціна ${newPrice}, залишок ${newStock}`);
            
            console.log(`[~] Оновлено продукт: ${product.name} (Залишок: ${newStock})`);
        }
    }

    findProductByName(searchName) {
        for (let [id, product] of storeCatalog.entries()) {
            if (product.name.toLowerCase() === searchName.toLowerCase()) {
                console.log(`[?] Знайдено: ${product.name} (Ціна: ${product.price}, На складі: ${product.stock})`);
                return product;
            }
        }
        console.log(`[?] Продукт "${searchName}" не знайдено.`);
        return null;
    }

    placeOrder(customerObj, productId, quantity) {
        activeCustomers.add(customerObj); 

        const product = storeCatalog.get(productId);
        if (product && product.stock >= quantity) {
            product.stock -= quantity; 
            console.log(`[!] Замовлення успішне! Клієнт ${customerObj.name} купив ${quantity}x "${product.name}". Залишилось: ${product.stock}`);
            
            productHistory.get(product).push(`Продано ${quantity} шт.`);
        } else {
            console.log(`[X] Помилка замовлення. Продукту немає в достатній кількості.`);
        }
    }
    
    showProductHistory(id) {
        const product = storeCatalog.get(id);
        if (product) {
            console.log(`Історія "${product.name}":`, productHistory.get(product));
        }
    }
}

const myStore = new Store();
myStore.addProduct(101, "Ноутбук Asus", 25000, 10, "Електроніка");
myStore.addProduct(102, "Миша Logitech", 1500, 50, "Аксесуари");
myStore.addProduct(103, "Клавіатура Keychron", 4000, 15, "Аксесуари");

myStore.findProductByName("Миша Logitech");
myStore.updateProduct(101, 24000, 12);

const customer1 = { name: "Іван", id: "user_001" };
myStore.placeOrder(customer1, 101, 2); 
myStore.placeOrder(customer1, 103, 20); 

myStore.removeProduct(102);
myStore.showProductHistory(101);