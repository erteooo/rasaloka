document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.querySelector(".rasaloka-profile");
    const authPopup = document.getElementById('auth-popup');
    
    let isMouseInProfileOrPopup = false;

    // Fungsi untuk menampilkan popup
    const showPopup = () => {
        authPopup.classList.add('active');
    };

    // Fungsi untuk menyembunyikan popup
    const hidePopup = () => {
        authPopup.classList.remove('active');
    };

    // Event ketika mouse berada di atas ikon profil
    profileIcon.addEventListener("mouseenter", function() {
        showPopup();
    });

    // Event ketika mouse meninggalkan ikon profil
    profileIcon.addEventListener("mouseleave", function() {
        setTimeout(() => {
            if (!isMouseInProfileOrPopup) {
                hidePopup();
            }
        }, 200);
    });

    // Event ketika mouse berada di atas popup
    authPopup.addEventListener("mouseenter", function() {
        isMouseInProfileOrPopup = true;
    });

    // Event ketika mouse meninggalkan popup
    authPopup.addEventListener("mouseleave", function() {
        isMouseInProfileOrPopup = false;
        hidePopup();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".rasaloka-cart");
    const cartPopup = document.getElementById('cart-popup');
    let isMouseInCartOrPopup = false;

    // Fungsi untuk menampilkan popup
    const showCartPopup = () => {
        cartPopup.classList.add('active');
    };

    // Fungsi untuk menyembunyikan popup
    const hideCartPopup = () => {
        cartPopup.classList.remove('active');
    };

    // Event ketika mouse berada di atas ikon keranjang
    cartIcon.addEventListener("mouseenter", function() {
        showCartPopup();
    });

    // Event ketika mouse meninggalkan ikon keranjang
    cartIcon.addEventListener("mouseleave", function() {
        setTimeout(() => {
            if (!isMouseInCartOrPopup) {
                hideCartPopup();
            }
        }, 200);
    });

    // Event ketika mouse berada di atas popup keranjang
    cartPopup.addEventListener("mouseenter", function() {
        isMouseInCartOrPopup = true;
    });

    // Event ketika mouse meninggalkan popup keranjang
    cartPopup.addEventListener("mouseleave", function() {
        isMouseInCartOrPopup = false;
        hideCartPopup();
    });
});
