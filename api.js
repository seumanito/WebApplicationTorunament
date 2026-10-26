async function cargarPython() {
    try {
        const res = await fetch('http://localhost:8000/integrantes'); 
        const data = await res.json();
        document.getElementById('res-python').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-python').innerText = 'Error: No se pudo conectar al servicio Python (:8000).';
    }
}

async function cargarNode() {
    try {
        const res = await fetch('http://localhost:3000/combates');
        const data = await res.json();
        document.getElementById('res-node').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-node').innerText = 'Error: No se pudo conectar al servicio Node.js (:3000).';
    }
}

async function cargarGo() {
    try {
        const res = await fetch('http://localhost:8004/equipos');
        const data = await res.json();
        document.getElementById('res-go').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-go').innerText = 'Error: No se pudo conectar al servicio Go (:8004).';
    }
}

async function cargarJava() {
    try {
        const res = await fetch('http://localhost:8005/jugadores');
        const data = await res.json();
        document.getElementById('res-java').innerText = JSON.stringify(data, null, 2);
    } catch (e) {
        document.getElementById('res-java').innerText = 'Error: No se pudo conectar al servicio Java (:8005).';
    }
}

async function crearJugador() {
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