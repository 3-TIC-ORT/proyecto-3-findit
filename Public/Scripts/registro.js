window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        window.location.href = 'index.html';
    }
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
    return password.length >= 8 && /\d/.test(password);
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    postData('login', { username, password }, (response) => {
        if (response.success) {
            localStorage.setItem('username', response.username);
            window.location.href = 'index.html';
        } else {
            displayMessage(response.message);
        }
    });
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!isValidUsername(username)) {
        displayMessage('El nombre de usuario solo puede contener letras y números');
        return;
    }
    
    if (!isValidPassword(password)) {
        displayMessage('La contraseña debe tener al menos 8 caracteres y contener al menos un número');
        return;
    }
    
    postData('register', { username, password }, (response) => {
        displayMessage(response.message);

    postData('login', { username, password }, (response) => {
            if (response.success) {
                localStorage.setItem('username', response.username);
                window.location.href = 'index.html';
            } else {
                displayMessage(response.message);
            }
        });
    });
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = message.includes('exitoso') ? 'green' : 'red';
}