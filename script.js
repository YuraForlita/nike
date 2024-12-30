/*function setView(viewType) {
    const products = document.getElementById('products');
    if (viewType === 'grid') {
        products.classList.add('grid');
        products.classList.remove('list');
    } else if (viewType === 'list') {
        products.classList.add('list');
        products.classList.remove('grid');
    }
}*/

function toggleOptions() {
    const options = document.getElementById("options");
    options.style.display = options.style.display === "none" || options.style.display === "" ? "block" : "none";
}

function setCustomView(view) {
    const currentIcon = document.getElementById("currentIcon");
    const currentText = document.getElementById("currentText");


    switch (view) {
        case "grid":
            currentIcon.className = "ri-layout-grid-line";
            currentText.textContent = "Grid";
            break;
        case "list":
            currentIcon.className = "ri-list-check-2";
            currentText.textContent = "Big list";
            break;
        case "compact-list":
            currentIcon.className = "ri-list-unordered";
            currentText.textContent = "Small list";
            break;
    }

    document.getElementById("options").style.display = "none";

    setView(view);
}

function setView(view) {
    const productContainer = document.getElementById('products');

    productContainer.classList.remove('grid', 'list', 'compact-list');

    productContainer.classList.add(view);
}



///////////////////////////////////////////////КОШИК////////////////////////////


let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Оновлюємо кількість товарів у кошику
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = JSON.parse(localStorage.getItem("cart")).length || 0;
    }
}

// Додаємо товар до кошика
function addToCart(name, price, imageUrl) {
    const product = { name, price, imageUrl };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Оновлюємо кількість товарів відразу після додавання
    renderCart(); // Оновлюємо відображення кошика
}

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Очищуємо контейнер перед додаванням елементів
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                <span>${item.name}</span>
                <span>${item.price} грн</span>
                <button onclick="removeFromCart(${index})">Видалити</button>
            `;
            total += item.price;
            cartItemsContainer.appendChild(itemElement);
        });

        document.getElementById('cart-total').textContent = total; // Оновлюємо загальну суму
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Оновлюємо кількість товарів відразу після видалення
    renderCart(); // Оновлюємо відображення кошика
}

// Оновлення кошика та кількості товарів при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || []; // Перевіряємо наявність кошика
    updateCartCount();
    renderCart(); // Відображаємо товари в кошику при завантаженні сторінки
});