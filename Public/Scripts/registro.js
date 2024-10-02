function isValidUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
    return password.length >= 8 && /\d/.test(password);
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
        if (response.success) {
            setTimeout(() => {
                window.location.href = 'iniciar-sesion.html';
            }, 2000);
        }
    });
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = message.includes('exitoso') ? 'green' : 'red';
}
