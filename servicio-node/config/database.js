const mongoose = require('mongoose');
require('dotenv').config();

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB conectado a través de Docker");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
        }
};

module.exports = conectarBD;