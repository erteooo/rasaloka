document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".rasaloka-cart");
    const cartPopup = document.getElementById("cart-popup");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".search-bar button");
    const products = document.querySelectorAll(".product");

    let cart = []; // Array untuk menyimpan data keranjang

    // Fungsi menampilkan pop-up keranjang
    const showCartPopup = () => {
        cartPopup.classList.add("active");
    };

    // Fungsi menyembunyikan pop-up keranjang
    const hideCartPopup = () => {
        cartPopup.classList.remove("active");
    };

    // Event hover untuk pop-up keranjang
    cartIcon.addEventListener("mouseenter", showCartPopup);
    cartIcon.addEventListener("mouseleave", hideCartPopup);

    // Fungsi menambah produk ke keranjang
    function addToCart(productImage, productName, productPrice) {
        const existingProductIndex = cart.findIndex(
            (item) => item.name === productName
        );

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({
                image: productImage,
                name: productName,
                price: productPrice,
                quantity: 1,
            });
        }

        updateCart();
    }

    // Fungsi memperbarui tampilan keranjang
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p id="cartEmptyMessage">Keranjang kosong</p>`;
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="50" height="50" />
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price.toLocaleString("id-ID")}</p>
                        <p>Jumlah: ${item.quantity}</p>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" value="${item.quantity}" readonly />
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>`;
            });

            cartItemsContainer.innerHTML += `
            <div class="cart-total">
                <h3>Total: Rp <span id="total">${total.toLocaleString(
                    "id-ID"
                )}</span></h3>
                <a class="btn" href="#" onclick="checkout()">Buat Pesanan</a>
            </div>`;
        }
    }

    // Fungsi menambah kuantitas produk
    window.increaseQuantity = function (index) {
        cart[index].quantity++;
        updateCart();
    };

    // Fungsi mengurangi kuantitas produk
    window.decreaseQuantity = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1); // Hapus item dari keranjang
        }
        updateCart();
    };

        // Fungsi pencarian produk
        function searchProduct() {
            const input = searchInput.value.toLowerCase();
            products.forEach((product) => {
                const productName = product.getAttribute("data-name").toLowerCase();
                if (productName.includes(input)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        }
    
        // Event untuk tombol *Cari*
        searchButton.addEventListener("click", function () {
            searchProduct();
        });
    
        // Event untuk tombol *Enter* di input pencarian
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Mencegah refresh halaman
                searchProduct();
            }
        });
    });