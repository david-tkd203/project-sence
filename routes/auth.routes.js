// ==============================================================================
// Enrutador de Autenticación (routes/auth.routes.js)
// ==============================================================================
// Define los endpoints públicos para registro y login con emisión de tokens JWT.
// ==============================================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta pública para registrar nuevos usuarios
router.post('/register', authController.register);

// Ruta pública para iniciar sesión y obtener un token JWT
router.post('/login', authController.login);

module.exports = router;
