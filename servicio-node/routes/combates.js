const express = require('express');
const router = express.Router();
const Combate = require('../models/Combate');

router.post('/', async (req, res) => {
    try {
        const nuevoRegistro = new Combate(req.body);
        await nuevoRegistro.save();
        res.status(201).json({ mensaje: "Combate guardado", datos: nuevoRegistro });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const combates = await Combate.find();
        res.json(combates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;