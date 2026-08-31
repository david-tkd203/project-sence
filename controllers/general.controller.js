// ==============================================================================
// Controlador General (general.controller.js)
// ==============================================================================
// Este archivo contiene las funciones controladoras que procesan la lógica
// de respuesta para las rutas públicas de la aplicación.
// Modularizar la lógica en controladores mantiene las rutas limpias y ordenadas.
// ==============================================================================

const path = require('path');

/**
 * Controlador para la ruta principal ('/')
 * Responde sirviendo contenido HTML (o redireccionando al archivo estático).
 * @param {import('express').Request} req - Objeto de solicitud
 * @param {import('express').Response} res - Objeto de respuesta
 */
const getHome = (req, res) => {
  // Enviamos el archivo HTML principal ubicado en la carpeta /public
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile(indexPath);
};

/**
 * Controlador para la ruta de estado ('/status')
 * Responde entregando un objeto JSON con el estado del servidor y metadatos.
 * @param {import('express').Request} req - Objeto de solicitud
 * @param {import('express').Response} res - Objeto de respuesta
 */
const getStatus = (req, res) => {
  // Retornamos un estado 200 con un formato consistente (status, message, data)
  res.status(200).json({
    status: 'OK',
    message: 'El servidor Express está funcionando correctamente.',
    data: {
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = {
  getHome,
  getStatus
};
