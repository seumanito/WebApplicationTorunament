const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/torneo');
        console.log("MongoDB conectado a través de Docker");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
        }
};

module.exports = conectarBD;