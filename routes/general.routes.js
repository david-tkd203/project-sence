// ==============================================================================
// Enrutador Principal (general.routes.js)
// ==============================================================================
// En este archivo definimos las rutas generales de la aplicación.
// ==============================================================================

const express = require('express');
const router = express.Router();
const generalController = require('../controllers/general.controller');

// Ruta GET / : Entrega la consola interactiva de la API
router.get('/', generalController.getHome);

// Ruta GET /portfolio : Entrega la página web del Portafolio Técnico y Caso de Estudio
router.get('/portfolio', generalController.getPortfolio);

// Ruta GET /status : Entrega el estado operativo del servidor en formato JSON
router.get('/status', generalController.getStatus);

module.exports = router;
