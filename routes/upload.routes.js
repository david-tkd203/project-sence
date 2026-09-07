// ==============================================================================
// Enrutador de Subida de Archivos (routes/upload.routes.js)
// ==============================================================================
// Define el endpoint para subir archivos utilizando el middleware Multer.
// Está protegido con verifyToken para garantizar que solo usuarios autenticados suban archivos.
// ==============================================================================

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../middlewares/upload.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');

// Endpoint protegido: Subida de archivo individual en el campo 'archivo'
router.post('/', verifyToken, upload.single('archivo'), uploadController.uploadFile);

module.exports = router;
