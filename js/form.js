function showFeedback(message, isError = false) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = isError ? 'feedback-error' : 'feedback-success';
    feedbackContainer.textContent = message;
    document.body.insertBefore(feedbackContainer, document.body.firstChild);
    
    setTimeout(() => {
        feedbackContainer.remove();
    }, 3000);
}

document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showFeedback('Email dan Password tidak boleh kosong.', true);
        return;
    }

    console.log('Login submitted:', { email, password });
    showFeedback('Login berhasil! Selamat datang di RASALOKA.');
});

document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword) {
        showFeedback('Semua field harus diisi.', true);
        return;
    }

    if (password !== confirmPassword) {
        showFeedback('Password dan Konfirmasi Password tidak cocok.', true);
        return;
    }

    console.log('Signup submitted:', { username, password });
    showFeedback('Pendaftaran berhasil! Silakan login.');
});