function increaseQuantity() {
    var input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    var input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function increaseCartQuantity(button) {
    var input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    updateTotal();
}

function decreaseCartQuantity(button) {
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

function addToCart() {
    var quantity = document.getElementById('quantity').value;
    var cartItems = document.getElementById('cartItems');
    var emptyCartMessage = document.getElementById('emptyCartMessage');
    if (emptyCartMessage) {
        emptyCartMessage.remove();
    }
    var newItem = document.createElement('div');
    newItem.className = 'cart-item';
    newItem.innerHTML = `
        <img alt="Andaliman" src="andaliman.jpg"/>
        <div class="item-info">
            <h4>Produk 1</h4>
            <p>Rp 100.000</p>
        </div>
        <div class="quantity">
            <button onclick="decreaseCartQuantity(this)">-</button>
            <input readonly type="number" value="${quantity}"/>
            <button onclick="increaseCartQuantity(this)">+</button>
        </div>
    `;
    cartItems.appendChild(newItem);
    updateTotal();
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