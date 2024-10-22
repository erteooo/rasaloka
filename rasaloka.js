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
