document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const loginLink = document.querySelector('.cuentas1');
    const registerLink = document.querySelector('.cuentas2');
    
    function createLogoutButton() {
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Cerrar sesión';
        logoutButton.className = 'logout-btn';
        logoutButton.addEventListener('click', handleLogout);
        return logoutButton;
    }

    function handleLogout() {
        postData('logout', { username: localStorage.getItem('username') }, (response) => {
            localStorage.removeItem('username');
            window.location.reload();
        });
    }

    function checkSession() {
        const username = localStorage.getItem('username');
        if (username) {
            postData('checkSession', { username }, (response) => {
                if (response.success) {
                    if (loginLink) loginLink.style.display = 'none';
                    if (registerLink) registerLink.style.display = 'none';
                    if (!document.querySelector('.logout-btn')) {
                        nav.appendChild(createLogoutButton());
                    }
                } else {
                    localStorage.removeItem('username');
                    if (loginLink) loginLink.style.display = '';
                    if (registerLink) registerLink.style.display = '';
                }
            });
        } else {
            if (loginLink) loginLink.style.display = '';
            if (registerLink) registerLink.style.display = '';
        }
    }

    checkSession();
});