const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/torneo');

const combateSchema = new mongoose.Schema({
    jugador1: { type: String, required: true },
    jugador2: { type: String, required: true },
    ganador: { type: String, required: true },
    vidaRestante: Number,
    bloqueosEscudo: Number,
    fechaRegistro: { type: Date, default: Date.now } 
});

const Combate = mongoose.model('Combate', combateSchema);

app.get('/combates', (req, res) => {
    res.json({ combates: historialCombates });
});

app.post('/combates', (req, res) => {
    const nuevoCombate = req.body;
    
    historialCombates.push(nuevoCombate);
    
    res.status(201).json({ mensaje: "Estadísticas del combate guardadas", datos: nuevoCombate });
});

const PORT = 3000;
app.listen(PORT);