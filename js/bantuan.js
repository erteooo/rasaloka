    // Keranjang popup //
    document.addEventListener("DOMContentLoaded", function() {
        const cartIcon = document.querySelector(".rasaloka-cart");
        const cartPopup = document.getElementById('cart-popup');
        let isMouseInCartOrPopup = false;
    
        // Menampilkan popup
        const showCartPopup = () => {
            cartPopup.classList.add('active');
        };
    
        // Menyembunyikan popup
        const hideCartPopup = () => {
            cartPopup.classList.remove('active');
        };
    
        // Mouse berada di ikon keranjang
        cartIcon.addEventListener("mouseenter", function() {
            showCartPopup();
        });
    
        // Mouse meninggalkan ikon keranjang
        cartIcon.addEventListener("mouseleave", function() {
            setTimeout(() => {
                if (!isMouseInCartOrPopup) {
                    hideCartPopup();
                }
            }, 200);
        });
    
        // Mouse berada di popup keranjang
        cartPopup.addEventListener("mouseenter", function() {
            isMouseInCartOrPopup = true;
        });
    
        // Mouse meninggalkan popup keranjang
        cartPopup.addEventListener("mouseleave", function() {
            isMouseInCartOrPopup = false;
            hideCartPopup();
        });
    });
    