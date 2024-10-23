    // Profil ikon popup //
document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.querySelector(".rasaloka-profile");
    const authPopup = document.getElementById('auth-popup');
    
    let isMouseInProfileOrPopup = false;

    // Menampilkan popup
    const showPopup = () => {
        authPopup.classList.add('active');
    };

    // Menyembunyikan popup
    const hidePopup = () => {
        authPopup.classList.remove('active');
    };

    // Mouse berada di ikon profil
    profileIcon.addEventListener("mouseenter", function() {
        showPopup();
    });

    // Mouse meninggalkan ikon profil
    profileIcon.addEventListener("mouseleave", function() {
        setTimeout(() => {
            if (!isMouseInProfileOrPopup) {
                hidePopup();
            }
        }, 200);
    });

    // Mouse berada di popup
    authPopup.addEventListener("mouseenter", function() {
        isMouseInProfileOrPopup = true;
    });

    // Mouse meninggalkan popup
    authPopup.addEventListener("mouseleave", function() {
        isMouseInProfileOrPopup = false;
        hidePopup();
    });
});

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
