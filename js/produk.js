function increaseQuantity(button) {
    var input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    updateTotal();
}

function decreaseQuantity(button) {
    var input = button.nextElementSibling;
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateTotal();
    }
}

function updateTotal() {
    var total = 0;
    var cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(function(item) {
        var price = parseInt(item.querySelector('.item-info p').innerText.replace('Rp ', '').replace('.', ''));
        var quantity = parseInt(item.querySelector('.quantity input').value);
        total += price * quantity;
    });
    document.getElementById('total').innerText = total.toLocaleString('id-ID');
}

window.onclick = function(event) {
    var profileModal = document.getElementById('profileModal');
    var cartModal = document.getElementById('cartModal');
    if (event.target == profileModal) {
        profileModal.style.display = "none";
    }
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

function searchProduct() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var products = document.querySelectorAll('.product');
    products.forEach(function(product) {
        var productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}