// ==============================================================================
// Enrutador Principal (general.routes.js)
// ==============================================================================
// En este archivo definimos las rutas de la aplicación utilizando express.Router().
// Asociamos cada endpoint HTTP con su respectiva función controladora.
// ==============================================================================

const express = require('express');
const router = express.Router();

// Importamos el controlador general
const generalController = require('../controllers/general.controller');

// Ruta GET / : Entrega la página de inicio en formato HTML
router.get('/', generalController.getHome);

// Ruta GET /status : Entrega el estado operativo del servidor en formato JSON
router.get('/status', generalController.getStatus);

module.exports = router;
