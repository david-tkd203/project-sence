// ==============================================================================
// Servicio de Usuarios y Pedidos (services/user.service.js)
// ==============================================================================
// Contiene la lógica de negocio y acceso a datos mediante Sequelize ORM.
// Implementa CRUD, transaccionalidad con rollback garantizado, relaciones 1:N
// y consultas SQL tradicionales para fines comparativos.
// ==============================================================================

const { User, Order, sequelize } = require('../models');
const { Op, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'log.txt');

/**
 * Función auxiliar para registrar transacciones fallidas en logs/log.txt (Tarea PLUS Lección 4)
 */
function logFailedTransaction(motivo, detalles) {
  const now = new Date();
  const fecha = now.toISOString().split('T')[0];
  const hora = now.toTimeString().split(' ')[0];
  const line = `[${fecha} ${hora}] [TRANSACCIÓN FALLIDA - ROLLBACK EJECUTADO] Motivo: ${motivo} | Datos: ${JSON.stringify(detalles)}\n`;
  
  fs.appendFile(logFilePath, line, 'utf8', (err) => {
    if (err) console.error('Error registrando transacción fallida en log:', err);
  });
}

/**
 * 1. Obtener todos los usuarios (Lección 2)
 * Protege datos sensibles excluyendo el campo 'password'.
 * Permite filtrado opcional mediante query params (?nombre=... &rol=...).
 */
async function getAllUsers(filtros = {}) {
  const where = {};

  // Filtro por nombre (búsqueda parcial)
  if (filtros.nombre) {
    where.nombre = { [Op.like]: `%${filtros.nombre}%` };
  }

  // Filtro exacto por rol
  if (filtros.rol) {
    where.rol = filtros.rol;
  }

  // Consulta al ORM excluyendo contraseñas y datos sensibles
  const users = await User.findAll({
    where,
    attributes: { exclude: ['password'] },
    order: [['id', 'ASC']]
  });

  return users;
}

/**
 * 2. Obtener un usuario por su ID (excluyendo password)
 */
async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
  return user;
}

/**
 * 3. Crear un nuevo usuario
 */
async function createUser(userData) {
  const newUser = await User.create({
    nombre: userData.nombre,
    email: userData.email,
    password: userData.password, // En producción se aplicaría bcrypt.hash
    rol: userData.rol || 'cliente',
    activo: userData.activo !== undefined ? userData.activo : true
  });

  // Omitimos la contraseña en el retorno del objeto creado
  const { password, ...usuarioSinPassword } = newUser.toJSON();
  return usuarioSinPassword;
}

/**
 * 4. Actualizar usuario (Lección 3)
 * Solo se permite modificar ciertos campos seguros (nombre, rol, activo).
 * Se valida previamente la existencia del registro.
 */
async function updateUser(id, updateData) {
  const user = await User.findByPk(id);
  if (!user) {
    return null; // El controlador retornará 404
  }

  // Filtro de campos permitidos para evitar sobreescritura maliciosa de id o password
  const camposPermitidos = {};
  if (updateData.nombre !== undefined) camposPermitidos.nombre = updateData.nombre;
  if (updateData.rol !== undefined) camposPermitidos.rol = updateData.rol;
  if (updateData.activo !== undefined) camposPermitidos.activo = updateData.activo;

  await user.update(camposPermitidos);

  const { password, ...usuarioActualizado } = user.toJSON();
  return usuarioActualizado;
}

/**
 * 5. Eliminar usuario (Lección 3)
 * Valida previamente la existencia antes de proceder.
 */
async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    return false; // No encontrado
  }

  await user.destroy();
  return true;
}

/**
 * 6. Transaccionalidad asegurada con Rollback (Lección 4)
 * Ejecuta dos acciones consecutivas:
 * Acción 1: Crear un usuario.
 * Acción 2: Crear su pedido o historial de bienvenida.
 * Si alguna falla (o si se fuerza el error), se realiza rollback inmediato.
 */
async function createUsuarioConPedidoTransaccion({ usuarioData, pedidoData, forzarError = false }) {
  // Iniciamos la transacción gestionada por Sequelize
  const t = await sequelize.transaction();

  try {
    console.log('🔄 Iniciando transacción en base de datos...');

    // Acción 1: Crear usuario dentro de la transacción
    const nuevoUsuario = await User.create({
      nombre: usuarioData.nombre,
      email: usuarioData.email,
      password: usuarioData.password || 'password123',
      rol: usuarioData.rol || 'cliente'
    }, { transaction: t });

    // Verificación de simulación de error forzado para evidenciar rollback
    if (forzarError) {
      throw new Error('Simulación de error forzado: Falló la creación del pedido, ejecutando Rollback.');
    }

    // Acción 2: Crear pedido asociado dentro de la transacción
    const nuevoPedido = await Order.create({
      descripcion: pedidoData.descripcion || 'Pedido inicial de bienvenida',
      monto: pedidoData.monto || 100.00,
      estado: pedidoData.estado || 'completado',
      userId: nuevoUsuario.id
    }, { transaction: t });

    // Si todo salió bien, confirmamos la transacción (COMMIT)
    await t.commit();
    console.log(' Transacción confirmada (COMMIT). Usuario y Pedido creados exitosamente.');

    const { password, ...userSafe } = nuevoUsuario.toJSON();
    return {
      exito: true,
      usuario: userSafe,
      pedido: nuevoPedido
    };
  } catch (error) {
    // Si algo falló, revertimos todos los cambios (ROLLBACK)
    await t.rollback();
    console.error('❌ Error en transacción. ROLLBACK ejecutado correctamente:', error.message);

    // Registramos la falla en logs/log.txt (Tarea PLUS)
    logFailedTransaction(error.message, { usuario: usuarioData?.email });

    throw error;
  }
}

/**
 * 7. Consulta con Relaciones 1:N (Lección 6)
 * Obtiene un usuario junto con todos sus pedidos utilizando 'include'.
 */
async function getUserWithOrders(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Order,
        as: 'pedidos',
        attributes: ['id', 'descripcion', 'monto', 'estado', 'createdAt']
      }
    ]
  });

  return user;
}

/**
 * 8. Comparación de Resultados entre SQL Manual y ORM (Lección 5)
 */
async function compareSqlAndOrm() {
  const startTimeOrm = process.hrtime();
  // Consulta con Métodos del ORM
  const ormResult = await User.findAll({
    attributes: ['id', 'nombre', 'email', 'rol'],
    limit: 5
  });
  const diffOrm = process.hrtime(startTimeOrm);
  const timeOrmMs = (diffOrm[0] * 1000 + diffOrm[1] / 1e6).toFixed(3);

  const startTimeSql = process.hrtime();
  // Consulta con SQL Manual Tradicional
  const sqlQuery = 'SELECT id, nombre, email, rol FROM usuarios LIMIT 5;';
  const sqlResult = await sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT
  });
  const diffSql = process.hrtime(startTimeSql);
  const timeSqlMs = (diffSql[0] * 1000 + diffSql[1] / 1e6).toFixed(3);

  return {
    orm: {
      metodo: "User.findAll({ attributes: ['id', 'nombre', 'email', 'rol'], limit: 5 })",
      tiempoEjecucionMs: `${timeOrmMs} ms`,
      totalRegistros: ormResult.length,
      muestra: ormResult
    },
    sqlManual: {
      query: sqlQuery,
      tiempoEjecucionMs: `${timeSqlMs} ms`,
      totalRegistros: sqlResult.length,
      muestra: sqlResult
    },
    conclusionTecnica: "Ambos métodos devuelven los mismos datos estructurados. El ORM ofrece mayor seguridad (evita SQL Injection), abstracción multiplataforma y tipado, mientras que SQL manual permite optimizaciones finas en consultas analíticas altamente complejas."
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createUsuarioConPedidoTransaccion,
  getUserWithOrders,
  compareSqlAndOrm
};
