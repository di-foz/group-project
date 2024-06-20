document.addEventListener('DOMContentLoaded', () => {
   
    const orderId = 'ORDER-' + Math.floor(Math.random() * 1000000);
    document.getElementById('order-id').textContent = orderId;

    // 2
    const totalPrice = localStorage.getItem('totalPrice') || '0';
    document.getElementById('total-price').textContent = totalPrice;

    const modal = document.getElementById('deliveryModal');
    const btn = document.querySelector('.checkout-btn');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    const confirmationModal = document.getElementById('confirmationModal');
    const closeConfirmationButton = confirmationModal.querySelector('.close-confirmation');

    closeConfirmationButton.onclick = function() {
        confirmationModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    }

    function showConfirmation(message) {
        document.getElementById('confirmationMessage').textContent = message;
        confirmationModal.style.display = 'block';
    }

    document.getElementById('homeDelivery').addEventListener('click', () => {
        showConfirmation('Your order has been recorded. We will reach out with order details for address and confirmation.');
        modal.style.display = 'none';
    });

    document.getElementById('pickup').addEventListener('click', () => {
        showConfirmation('Your order has been received. We will notify you after the order is ready for pickup.');
        modal.style.display = 'none';
    });
});
