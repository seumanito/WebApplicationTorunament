async function realizarLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const res = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (!res.ok) throw new Error("Credenciales inválidas");

        const data = await res.json();

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('role', data.role);

        if (data.role === 'admin') {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('panel-control').style.display = 'block';
        } else {
            errorMsg.innerText = 'Acceso restringido: Solo el Administrador ve el panel.';
        }

    } catch (e) {
        errorMsg.innerText = "Usuario o contraseña incorrectos";
    }
}

function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.reload();
}