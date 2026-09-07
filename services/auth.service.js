// ==============================================================================
// Servicio de Autenticación (services/auth.service.js)
// ==============================================================================
// Encapsula la lógica de hashing de contraseñas con bcryptjs y la generación
// de tokens JSON Web Token (JWT) firmados con clave secreta y expiración.
// ==============================================================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Registra un nuevo usuario con contraseña encriptada de forma segura
 */
async function registerUser({ nombre, email, password, rol }) {
  // 1. Verificar si el correo ya está en uso
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('El correo electrónico ya está registrado.');
    error.status = 400;
    throw error;
  }

  // 2. Hashear la contraseña con salt de 10 rondas
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Crear el usuario en la base de datos
  const newUser = await User.create({
    nombre,
    email,
    password: hashedPassword,
    rol: rol || 'cliente'
  });

  const { password: _, ...userSafe } = newUser.toJSON();
  return userSafe;
}

/**
 * Autentica un usuario verificando credenciales y generando un token JWT
 */
async function loginUser({ email, password }) {
  // 1. Buscar usuario por email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error('Credenciales inválidas: correo o contraseña incorrectos.');
    error.status = 401;
    throw error;
  }

  // 2. Verificar la contraseña con bcrypt (o compatibilidad con texto plano de pruebas iniciales)
  let passwordValido = false;
  if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
    passwordValido = await bcrypt.compare(password, user.password);
  } else {
    // Compatibilidad para passwords creados antes del hashing
    passwordValido = (password === user.password);
  }

  if (!passwordValido) {
    const error = new Error('Credenciales inválidas: correo o contraseña incorrectos.');
    error.status = 401;
    throw error;
  }

  // 3. Generar la carga útil (payload) del token JWT
  const payload = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol
  };

  const secretKey = process.env.JWT_SECRET || 'clave_secreta_por_defecto';
  const expiresIn = process.env.JWT_EXPIRES_IN || '2h';

  // 4. Firmar el token JWT
  const token = jwt.sign(payload, secretKey, { expiresIn });

  const { password: _, ...userSafe } = user.toJSON();

  return {
    token,
    expiresIn,
    usuario: userSafe
  };
}

module.exports = {
  registerUser,
  loginUser
};
