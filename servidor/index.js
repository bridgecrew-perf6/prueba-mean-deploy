const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// Creacion del servidor
const app = express();

// Conexión a la base de datos
conectarDB();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/productos', require('./routes/producto'));

app.listen(4000, () => {
    console.log('El servidor está escuchando en el puerto 4000');
});

