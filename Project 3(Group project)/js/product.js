document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            name: 'Recycled Paper Pencil 2 Dozens (24 Pencils)',
            price: 250,
            image: 'images/product1.jpg'
        },
        {
            name: 'Recycled Paper Pencil with Eraser tip 2 Dozens (24 Pencils)',
            price: 280,
            image: 'images/product2.jpg'
        },
        {
            name: 'Recycled Paper Pencil in colourful sleeve 2 Dozens (24 Pencils)',
            price: 300,
            image: 'images/product3.jpg'
        },
        {
            name: 'Velvet Pencil made from Recycled newspaper',
            price: 360,
            image: 'images/product4.jpg'
        },
        {
            name: 'Loktha Paper Pencil made from recycled newspaper',
            price: 480,
            image: 'images/product5.jpg'
        }
    ];

    const productGrid = document.querySelector('.product-grid');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    const modalImage = document.createElement('img');
    modalContent.appendChild(modalImage);

    const modalDetails = document.createElement('div');
    modalDetails.classList.add('modal-details');
    modalContent.appendChild(modalDetails);

    const modalName = document.createElement('h3');
    modalDetails.appendChild(modalName);

    const modalPrice = document.createElement('p');
    modalDetails.appendChild(modalPrice);

    const modalQuantity = document.createElement('div');
    modalQuantity.classList.add('product-quantity');
    modalQuantity.innerHTML = `
        <button class="quantity-decrease">-</button>
        <input type="number" value="1" min="1">
        <button class="quantity-increase">+</button>
    `;
    modalContent.appendChild(modalQuantity);

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.textContent = 'Add to Cart';
    modalContent.appendChild(addToCartButton);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addProductToCart = (product, quantity) => {
        const cartItemIndex = cart.findIndex(item => item.name === product.name);
        if (cartItemIndex !== -1) {
            cart[cartItemIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    const updateCartCount = () => {
        const cartCount = document.querySelector('.cart-count');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        if (count > 0) {
            cartCount.classList.remove('hidden');
            cartCount.classList.add('visible');
            cartCount.textContent = count;
        } else {
            cartCount.classList.remove('visible');
            cartCount.classList.add('hidden');
        }
    };

    if (productGrid) {
        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rs${product.price}</p>
                <div class="product-quantity">
                    <button class="quantity-decrease">-</button>
                    <input type="number" value="1" min="1">
                    <button class="quantity-increase">+</button>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            `;
            productGrid.appendChild(productItem);

            productItem.querySelector('img').addEventListener('click', () => {
                modalImage.src = product.image;
                modalImage.alt = product.name;
                modalName.textContent = product.name;
                modalPrice.textContent = `Rs${product.price}`;
                modalQuantity.querySelector('input').value = 1;
                modal.style.display = 'flex';
            });

            productItem.querySelector('.quantity-increase').addEventListener('click', () => {
                const input = productItem.querySelector('input');
                input.value = parseInt(input.value) + 1;
            });

            productItem.querySelector('.quantity-decrease').addEventListener('click', () => {
                const input = productItem.querySelector('input');
                if (input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });

            productItem.querySelector('.add-to-cart').addEventListener('click', () => {
                const quantity = parseInt(productItem.querySelector('input').value);
                addProductToCart(product, quantity);
            });
        });
    }

    modalQuantity.querySelector('.quantity-increase').addEventListener('click', () => {
        const input = modalQuantity.querySelector('input');
        input.value = parseInt(input.value) + 1;
    });

    modalQuantity.querySelector('.quantity-decrease').addEventListener('click', () => {
        const input = modalQuantity.querySelector('input');
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });

    addToCartButton.addEventListener('click', () => {
        const quantity = parseInt(modalQuantity.querySelector('input').value);
        const productName = modalImage.alt;
        const product = products.find(item => item.name === productName);
        addProductToCart(product, quantity);
        modal.style.display = 'none';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    updateCartCount();
});
