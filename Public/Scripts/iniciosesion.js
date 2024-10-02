window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        window.location.href = 'index.html';
    }
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

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = message.includes('exitoso') ? 'green' : 'red';
}