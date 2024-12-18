document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    const email = document.getElementById("email").value;

    if (!validateEmail(email)) {
        event.preventDefault();
        alert("Masukkan email yang valid.");
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
