document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const loginLink = document.querySelector('.cuentas1');
    const registerLink = document.querySelector('.cuentas2');
    
    function crearLogoutButton() {
        const logoutButton = document.crearElement('button');
        logoutButton.textContent = 'Cerrar sesión';
        logoutButton.className = 'logout-btn';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.reload();
        });
        return logoutButton;
    }

    function checkSession() {
        const username = localStorage.getItem('username');
        if (username) {
            fetchData('checkSession', { username }, (response) => {
                if (response.success) {
                    if (loginLink) loginLink.style.display = 'none';
                    if (registerLink) registerLink.style.display = 'none';
                
                    if (!document.querySelector('.logout-btn')) {
                        nav.appendChild(crearLogoutButton());
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