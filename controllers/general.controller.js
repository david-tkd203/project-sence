// ==============================================================================
// Controlador General (general.controller.js)
// ==============================================================================
// Contiene las funciones controladoras que procesan la lógica
// de respuesta para las rutas públicas de la aplicación y vistas de portafolio.
// ==============================================================================

const path = require('path');

/**
 * Controlador para la ruta principal ('/')
 * Responde sirviendo el panel HTML interactivo ubicado en /public
 */
const getHome = (req, res) => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile(indexPath);
};

/**
 * Controlador para la vista del Portafolio ('/portfolio')
 * Sirve la página de presentación profesional, proyectos y caso de estudio.
 */
const getPortfolio = (req, res) => {
  const portfolioPath = path.join(__dirname, '..', 'public', 'portfolio.html');
  res.sendFile(portfolioPath);
};

/**
 * Controlador para la ruta de estado ('/status')
 * Responde entregando un objeto JSON con el estado del servidor y metadatos.
 */
const getStatus = (req, res) => {
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
  getPortfolio,
  getStatus
};
