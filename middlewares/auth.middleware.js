// ==============================================================================
// Middleware de Autenticación JWT (middlewares/auth.middleware.js)
// ==============================================================================
// Valida la existencia, firma y vigencia del token JSON Web Token (JWT)
// enviado en el encabezado HTTP 'Authorization: Bearer <token>'.
// Si el token es válido, inyecta la carga útil (payload) en req.user.
// Si no es válido o ha expirado, bloquea la petición con código 401 o 403.
// ==============================================================================

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Obtener la cabecera Authorization
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Acceso no autorizado: No se proporcionó el token de autenticación.',
      instrucciones: 'Debe incluir la cabecera "Authorization: Bearer <su_token>"'
    });
  }

  // 2. Extraer el formato 'Bearer <token>'
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      status: 'fail',
      message: 'Formato de token inválido. El formato esperado es: Bearer <token>'
    });
  }

  const token = parts[1];
  const secretKey = process.env.JWT_SECRET || 'clave_secreta_por_defecto';

  // 3. Verificar validez y expiración del token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'fail',
          message: 'El token de autenticación ha expirado. Por favor inicie sesión nuevamente.',
          expiredAt: err.expiredAt
        });
      }

      return res.status(403).json({
        status: 'fail',
        message: 'Token de autenticación no válido o corrupto.'
      });
    }

    // Inyectar datos del usuario autenticado en la petición
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken
};
