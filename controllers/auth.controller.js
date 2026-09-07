// ==============================================================================
// Controlador de Autenticación (controllers/auth.controller.js)
// ==============================================================================
// Procesa las solicitudes de registro e inicio de sesión,
// validando las entradas y devolviendo respuestas estructuradas.
// ==============================================================================

const authService = require('../services/auth.service');

/**
 * POST /auth/register
 */
const register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Los campos nombre, email y password son obligatorios.'
      });
    }

    const nuevoUsuario = await authService.registerUser({ nombre, email, password, rol });

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente.',
      data: nuevoUsuario
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Debe ingresar email y password para iniciar sesión.'
      });
    }

    const resultado = await authService.loginUser({ email, password });

    res.status(200).json({
      status: 'success',
      message: 'Autenticación exitosa. Token generado correctamente.',
      data: resultado
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
