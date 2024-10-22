document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.querySelector(".rasaloka-profile");
    const authPopup = document.getElementById('auth-popup');
    
    let isMouseInProfileOrPopup = false;

    // Fungsi untuk menampilkan popup
    const showPopup = () => {
        authPopup.style.display = 'block'; // Tampilkan popup
        isMouseInProfileOrPopup = true; // Kursor berada di dalam area
    };

    // Fungsi untuk menyembunyikan popup
    const hidePopup = () => {
        authPopup.style.display = 'none'; // Sembunyikan popup
        isMouseInProfileOrPopup = false; // Kursor meninggalkan area
    };

    // Event ketika mouse berada di atas ikon profil
    profileIcon.addEventListener("mouseover", function() {
        showPopup();
    });

    // Event ketika mouse meninggalkan ikon profil
    profileIcon.addEventListener("mouseout", function() {
        // Tunggu sebentar sebelum menutup untuk memastikan kursor tidak ke popup
        setTimeout(() => {
            if (!isMouseInProfileOrPopup) {
                hidePopup();
            }
        }, 200); // Delay singkat untuk transisi
    });

    // Event ketika mouse berada di atas popup
    authPopup.addEventListener("mouseover", function() {
        isMouseInProfileOrPopup = true; // Kursor berada di dalam popup
    });

    // Event ketika mouse meninggalkan popup
    authPopup.addEventListener("mouseout", function() {
        // Tunggu sebentar sebelum menutup untuk memastikan kursor tidak kembali ke ikon profil
        setTimeout(() => {
            if (!isMouseInProfileOrPopup) {
                hidePopup();
            }
        }, 300); // Delay singkat untuk transisi
    });
});
window.onload = function() {
    document.getElementById('loading-screen').style.display = 'none';
};