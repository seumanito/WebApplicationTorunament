async function loadPython() {
    try {
        const res = await fetch('http://localhost:8000/torneos', {
            method: 'GET',
            headers: obtenerHeaders() 
        });
        
        if (res.status === 401) {
            alert('Sesión expirada o no autorizada. Inicia sesión nuevamente.');
            window.location.href = 'index.html'; 
            return;
        }

        const data = await res.json();
        document.getElementById('res-python').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-python').innerText = 'Error: No se pudo conectar al servicio Python (:8000).';
    }
}

async function loadNode() {
    try {
        const res = await fetch('http://localhost:3000/combates');
        const data = await res.json();
        document.getElementById('res-node').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-node').innerText = 'Error: No se pudo conectar al servicio Node.js (:3000).';
    }
}

async function loadGo() {
    try {
        const res = await fetch('http://localhost:8004/equipos');
        const data = await res.json();
        document.getElementById('res-go').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-go').innerText = 'Error: No se pudo conectar al servicio Go (:8004).';
    }
}

async function loadJava() {
    try {
        const res = await fetch('http://localhost:8005/jugadores');
        const data = await res.json();
        document.getElementById('res-java').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-java').innerText = 'Error: No se pudo conectar al servicio Java (:8005).';
    }
}

async function addJava() {
    const nombre = document.getElementById('nombre').value;
    const juego = document.getElementById('juego').value;
    
    if(!nombre || !juego) {
        alert('Por favor completa ambos campos');
        return;
    }

    try {
        const res = await fetch('http://localhost:8005/jugadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, juego })
        });
        
        if(!res.ok) throw new Error("Error al guardar");

        alert('¡Jugador registrado con éxito en MongoDB (Java)!');
        document.getElementById('nombre').value = '';
        document.getElementById('juego').value = '';
        cargarJava();
    } catch (e) {
        alert('Error al registrar el jugador.');
    }
}

async function addPython() {
    const nombre = document.getElementById('name-tournament').value;
    const juego = document.getElementById('game-tournament').value;

    if (!nombre || !juego) {
        alert('Por favor completa todos los campos del torneo');
        return;
    }

    try {
        const res = await fetch('http://localhost:8000/torneos', {
            method: 'POST',
            headers: obtenerHeaders(),
            body: JSON.stringify({ nombre, juego })
        });

        if (!res.ok) throw new Error("Error al registrar torneo");

        alert('¡Torneo registrado con éxito en Python!');
        document.getElementById('nombre-torneo').value = '';
        document.getElementById('juego-torneo').value = '';
        cargarPython();
    } catch (e) {
        alert('Error al conectar con el servicio de Python.');
    }

    loadPython();
}

async function addNode() {
    const peleador1 = document.getElementById('peleador1').value;
    const peleador2 = document.getElementById('peleador2').value;

    if (!peleador1 || !peleador2) {
        alert('Por favor ingresa ambos peleadores');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/combates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ peleador1, peleador2 })
        });

        if (!res.ok) throw new Error("Error al registrar combate");

        alert('¡Combate registrado con éxito en Node.js!');
        document.getElementById('peleador1').value = '';
        document.getElementById('peleador2').value = '';
        cargarNode();
    } catch (e) {
        alert('Error al conectar con el servicio Node.js.');
    }
}

async function addGo() {
    const nombre = document.getElementById('nombre-equipo').value;
    const tag = document.getElementById('tag-equipo').value;

    if (!nombre || !tag) {
        alert('Por favor completa los datos del equipo');
        return;
    }

    try {
        const res = await fetch('http://localhost:8004/equipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, tag })
        });

        if (!res.ok) throw new Error("Error al registrar equipo");

        alert('¡Equipo registrado con éxito en Go!');
        document.getElementById('nombre-equipo').value = '';
        document.getElementById('tag-equipo').value = '';
        cargarGo();
    } catch (e) {
        alert('Error al conectar con el servicio Go.');
    }
}

function obtenerHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // <--- ¡Aquí viaja el pase VIP de seguridad!
    };
}

async function loadPendingInscriptions() {
    const container = document.getElementById('container-pendientes');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:8000/inscripciones/pendientes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Error al cargar solicitudes');

        const solicitudes = await response.json();

        if (solicitudes.length === 0) {
            container.innerHTML = '<p style="color: #8b949e;">No hay solicitudes pendientes en este momento.</p>';
            return;
        }

        let html = '<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">';
        html += '<tr style="border-bottom: 1px solid #30363d; color: #58a6ff;"><th>ID</th><th>Torneo ID</th><th>Equipo</th><th>Acción</th></tr>';
        
        solicitudes.forEach(item => {
            html += `<tr style="border-bottom: 1px solid #21262d;">
                <td style="padding: 8px;">${item.id}</td>
                <td style="padding: 8px;">${item.torneo_id}</td>
                <td style="padding: 8px;">${item.team_id}</td>
                <td style="padding: 8px;"><button onclick="aprobarInscripcion(${item.id})" class="btn-primary" style="padding: 5px 10px; font-size: 0.8rem; background-color: #238636;">Aprobar</button></td>
            </tr>`;
        });
        html += '</table>';

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<p style="color: #f85149;">${error.message}</p>`;
    }
}

async function aprobarInscripcion(id) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:8000/inscripciones/${id}/aprobar`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('No se pudo aprobar la inscripción');

        // Recargamos la lista automáticamente
        loadPendingInscriptions();

    } catch (error) {
        alert(error.message);
    }
}

async function enviarInscripcion(event) {
    event.preventDefault();
    
    const torneoId = document.getElementById('torneoIdInput').value;
    const teamId = document.getElementById('teamIdInput').value;
    const mensaje = document.getElementById('mensaje-inscripcion');
    const token = localStorage.getItem('token'); // Si el endpoint requiere autenticación

    try {
        const response = await fetch(`http://localhost:8000/torneos/${torneoId}/inscribir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Opcional según tu diseño de seguridad
            },
            body: JSON.stringify({ team_id: teamId })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.detail || 'Error al enviar la inscripción');

        mensaje.style.color = '#3fb950';
        mensaje.textContent = `¡Éxito! Solicitud enviada para el equipo "${teamId}" (Estado: pendiente).`;
        
        // Limpiar formulario
        document.getElementById('form-inscripcion').reset();

    } catch (error) {
        mensaje.style.color = '#f85149';
        mensaje.textContent = error.message;
    }
}