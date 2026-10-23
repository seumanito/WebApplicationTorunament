const express = require('express');
const conectarBD = require('./config/database');
const rutasCombates = require('./routes/combates');

const app = express();
const PORT = 3000;

conectarBD();

app.use(express.json());

app.use('/combates', rutasCombates);

app.listen(PORT);