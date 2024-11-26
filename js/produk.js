document.addEventListener("DOMContentLoaded", function () {
    // Variabel untuk ikon keranjang dan pop-up
    const cartIcon = document.querySelector(".rasaloka-cart");
    const cartPopup = document.getElementById("cart-popup");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    let isMouseInCartOrPopup = false;

    let cart = []; // Array untuk menyimpan item keranjang

    // Menampilkan pop-up keranjang
    const showCartPopup = () => {
        cartPopup.classList.add("active");
    };

    // Menyembunyikan pop-up keranjang
    const hideCartPopup = () => {
        cartPopup.classList.remove("active");
    };

    // Event mouse pada ikon keranjang
    cartIcon.addEventListener("mouseenter", showCartPopup);
    cartIcon.addEventListener("mouseleave", function () {
        setTimeout(() => {
            if (!isMouseInCartOrPopup) {
                hideCartPopup();
            }
        }, 200);
    });

    // Event mouse pada pop-up keranjang
    cartPopup.addEventListener("mouseenter", () => (isMouseInCartOrPopup = true));
    cartPopup.addEventListener("mouseleave", () => {
        isMouseInCartOrPopup = false;
        hideCartPopup();
    });

    // Fungsi menambah item ke keranjang
    function addToCart(productName, productPrice, productImage) {
        const existingProductIndex = cart.findIndex(
            (item) => item.name === productName
        );

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage,
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
                    </div>
                    <div class="quantity">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" value="${item.quantity}" readonly />
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>`;
            });

            cartItemsContainer.innerHTML += `
            <div class="cart-total">
                <h3>Total: Rp <span id="total">${total.toLocaleString("id-ID")}</span></h3>
                <a class="btn" href="#">Buat Pesanan</a>
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
    document.getElementById("searchInput").addEventListener("input", function () {
        const input = this.value.toLowerCase();
        const products = document.querySelectorAll(".product");
        products.forEach((product) => {
            const productName = product.getAttribute("data-name").toLowerCase();
            if (productName.includes(input)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

    // Debug untuk testing klik produk
    document.querySelectorAll(".product").forEach((product) => {
        product.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            const image = this.querySelector("img").src;
            addToCart(name, price, image);
        });
    });
});
