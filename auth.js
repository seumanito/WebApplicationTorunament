if (window.location.pathname.includes('dashboard.html') && !localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

async function doLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const res = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (!res.ok) throw new Error("Credenciales invalidas");

        const data = await res.json();

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);

        window.location.href = 'dashboard.html';

    } catch (e) {
        errorMsg.innerText = "Usuario o contraseña incorrectos";
    }
}

function closeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'login.html'
}