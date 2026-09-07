// ==============================================================================
// Middleware Centralizado de Manejo de Errores (middlewares/error.middleware.js)
// ==============================================================================
// Intercepta cualquier error ocurrido durante el ciclo de peticiones
// y devuelve una respuesta en formato JSON estructurada y predecible.
// ==============================================================================

/**
 * Middleware para capturar y formatear errores en la API
 */
const errorHandler = (err, req, res, next) => {
  console.error('⚠️ Error capturado por el middleware:', err);

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const mensajes = err.errors.map(e => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Error de validación en los datos ingresados.',
      errors: mensajes
    });
  }

  // Error de clave foránea en Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Error de referencia: el recurso asociado no existe.'
    });
  }

  // Otros errores del servidor
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor.'
  });
};

module.exports = errorHandler;
