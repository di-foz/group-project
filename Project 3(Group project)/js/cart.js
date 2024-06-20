
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; 
        totalPrice = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Rs${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="0">
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <div class="cart-item-total">Rs${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });
        cartTotalElement.textContent = totalPrice.toFixed(2);
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    function updateQuantity(index, delta) {
        cartItems[index].quantity += delta;
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }
        displayCartItems();
        updateCartCount();
    }

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase')) {
            const index = event.target.getAttribute('data-index');
            updateQuantity(index, 1);
        }

        if (event.target.classList.contains('decrease')) {
            const index = event.target.getAttribute('data-index');
            updateQuantity(index, -1);
        }
    });

    displayCartItems();
    updateCartCount();

    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
});
