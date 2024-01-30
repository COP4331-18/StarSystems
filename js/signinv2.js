document.addEventListener('DOMContentLoaded', function () {
    const registerLink = document.getElementById('open-register');
    const loginLink = document.getElementById('open-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});
