const mongoose = require('mongoose');

const combateSchema = new mongoose.Schema({
    jugador1: { type: String, required: true },
    jugador2: { type: String, required: true },
    ganador: { type: String, required: true },
    vidaRestante: { type: Number, required: true },
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Combate', combateSchema);