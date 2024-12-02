function toggleCartModal() {
    document.getElementById('cartModal').style.display = 'block';
}

function increaseQuantity(button) {
    const input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    updateTotal();
}

function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateTotal();
    }
}

function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(function(item) {
        const price = parseInt(item.querySelector('.item-info p').innerText.replace('Rp ', '').replace('.', ''));
        const quantity = parseInt(item.querySelector('.quantity input').value);
        total += price * quantity;
    });
    document.getElementById('total').innerText = total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}