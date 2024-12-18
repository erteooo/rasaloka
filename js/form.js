function showFeedback(message, isError = false) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = isError ? 'feedback-error' : 'feedback-success';
    feedbackContainer.textContent = message;
    document.body.insertBefore(feedbackContainer, document.body.firstChild);
    
    setTimeout(() => {
        feedbackContainer.remove();
    }, 3000);
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showFeedback('Email and Password cannot be empty.', true);
        return;
    }

    console.log('Login submitted:', { email, password });
    showFeedback('Login successful! Welcome to RASALOKA.');
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
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

    console.log('Signup submitted:', { username, email, password });
    showFeedback('Signup successful! Please login.');
});

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

// Google login and signup functionality will be implemented here
document.querySelector('.google-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('https://accounts.google.com/.well-known/openid-configuration');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});