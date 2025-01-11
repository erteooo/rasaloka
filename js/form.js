// Feedback utility
function showFeedback(message, isError = false) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = isError ? 'feedback-error' : 'feedback-success';
    feedbackContainer.textContent = message;
    document.body.insertBefore(feedbackContainer, document.body.firstChild);

    setTimeout(() => {
        feedbackContainer.remove();
    }, 3000);
}

// Admin emails
const adminEmails = [
    'raditoktaviano24@gmail.com',
    'elis.andksr@gmail.com',
    'mahendradanu895@gmail.com'
];

// Login form handling
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showFeedback('Email and Password cannot be empty.', true);
        return;
    }

    try {
        const response = await fetch('/backend/routes/authRoutes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            const redirectUrl = adminEmails.includes(email)
                ? '../html/admin-dashboard.html'
                : '../html/produk.html';

            showFeedback('Login successful! Redirecting...');
            window.location.href = redirectUrl;
        } else {
            showFeedback(data.message || 'Login failed. Please try again.', true);
        }
    } catch (error) {
        console.error('Login Error:', error);
        showFeedback('An error occurred. Please try again later.', true);
    }
});

// Signup form handling
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('fullname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (!username || !email || !password || !confirmPassword) {
        showFeedback('All fields must be filled.', true);
        return;
    }

    if (password !== confirmPassword) {
        showFeedback('Password and Confirm Password do not match.', true);
        return;
    }

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            showFeedback('Signup successful! Please login.');
            document.getElementById('signup-form').reset();
        } else {
            showFeedback(data.message || 'Signup failed. Please try again.', true);
        }
    } catch (error) {
        console.error('Signup Error:', error);
        showFeedback('An error occurred. Please try again later.', true);
    }
});

// Form switching
const signup = document.querySelector(".signup");
const login = document.querySelector(".login");
const slider = document.querySelector(".slider");
const formSection = document.querySelector(".form-section");
const loginForm = document.querySelector(".login-box");
const signupForm = document.querySelector(".signup-box");

// Initially show the login form and hide the signup form
signupForm.classList.add('hidden');

signup.addEventListener("click", () => {
    slider.style.transform = "translateX(100%)";
    loginForm.classList.add('hidden'); // Hide login form
    signupForm.classList.remove('hidden'); // Show signup form
});

login.addEventListener("click", () => {
    slider.style.transform = "translateX(0)";
    signupForm.classList.add('hidden'); // Hide signup form
    loginForm.classList.remove('hidden'); // Show login form
});

// Google login and signup functionality
document.querySelector('.google-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('https://accounts.google.com/.well-known/openid-configuration');
        const data = await response.json();
        console.log('Google Auth:', data);
        showFeedback('Google login feature is under development.');
    } catch (error) {
        console.error('Google Login Error:', error);
        showFeedback('An error occurred during Google login.', true);
    }
});
