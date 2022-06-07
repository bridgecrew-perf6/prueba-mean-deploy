const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    await mongoose
        .connect(process.env.DB_MONGO)
        .then((db) => console.log('Base de datos conectada'))
        .catch((err) => console.error(err));
}

module.exports = conectarDB;
