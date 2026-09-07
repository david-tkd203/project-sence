// ==============================================================================
// Controlador de Usuarios (controllers/user.controller.js)
// ==============================================================================
// Maneja las peticiones HTTP y envía respuestas JSON estructuradas y consistentes
// para todas las operaciones de datos solicitadas en el Módulo #7.
// ==============================================================================

const userService = require('../services/user.service');

/**
 * GET /usuarios
 * Obtiene la lista de usuarios (sin passwords) y permite filtrar por query params.
 */
const getUsers = async (req, res, next) => {
  try {
    const { nombre, rol } = req.query;
    const usuarios = await userService.getAllUsers({ nombre, rol });

    res.status(200).json({
      status: 'success',
      total: usuarios.length,
      filtrosAplicados: { nombre: nombre || null, rol: rol || null },
      data: usuarios
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /usuarios/:id
 * Obtiene el detalle de un usuario por su ID.
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await userService.getUserById(id);

    if (!usuario) {
      return res.status(404).json({
        status: 'fail',
        message: `Usuario con ID ${id} no fue encontrado.`
      });
    }

    res.status(200).json({
      status: 'success',
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /usuarios
 * Registra un nuevo usuario en la base de datos.
 */
const createUser = async (req, res, next) => {
  try {
    const { nombre, email, password, rol, activo } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Los campos nombre, email y password son obligatorios.'
      });
    }

    const nuevoUsuario = await userService.createUser({ nombre, email, password, rol, activo });

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado exitosamente.',
      data: nuevoUsuario
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /usuarios/:id
 * Actualiza los datos de un usuario existente.
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const usuarioActualizado = await userService.updateUser(id, updateData);

    if (!usuarioActualizado) {
      return res.status(404).json({
        status: 'fail',
        message: `No se puede actualizar. El usuario con ID ${id} no existe.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Usuario con ID ${id} actualizado correctamente.`,
      data: usuarioActualizado
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /usuarios/:id
 * Elimina un usuario previa validación de existencia.
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await userService.deleteUser(id);

    if (!eliminado) {
      return res.status(404).json({
        status: 'fail',
        message: `No se puede eliminar. El usuario con ID ${id} no fue encontrado.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Usuario con ID ${id} eliminado exitosamente de la base de datos.`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /usuarios/:id/pedidos
 * Obtiene un usuario con todos sus pedidos asociados (Relación 1:N con include).
 */
const getUserWithOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioConPedidos = await userService.getUserWithOrders(id);

    if (!usuarioConPedidos) {
      return res.status(404).json({
        status: 'fail',
        message: `Usuario con ID ${id} no encontrado.`
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Relación 1:N consultada exitosamente con Sequelize include.',
      data: usuarioConPedidos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /usuarios/transaccion-test
 * Prueba la atomicidad y el rollback en caso de error consecutivo.
 */
const testTransaction = async (req, res, next) => {
  try {
    const { usuario, pedido, forzarError } = req.body;

    const usuarioData = usuario || {
      nombre: 'Usuario Transacción',
      email: `transaccion_${Date.now()}@correo.com`,
      password: 'password123',
      rol: 'cliente'
    };

    const pedidoData = pedido || {
      descripcion: 'Compra de prueba transaccional',
      monto: 149.99,
      estado: 'completado'
    };

    const resultado = await userService.createUsuarioConPedidoTransaccion({
      usuarioData,
      pedidoData,
      forzarError: Boolean(forzarError)
    });

    res.status(201).json({
      status: 'success',
      message: 'Transacción completada exitosamente (COMMIT). Ambos registros fueron guardados en la BD.',
      data: resultado
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'La transacción falló y se ejecutó un ROLLBACK completo. Ningún dato fue persistido.',
      detalleError: error.message,
      evidencia: 'Se registró el evento en logs/log.txt'
    });
  }
};

/**
 * GET /usuarios/comparacion-sql
 * Compara los resultados y rendimiento de ORM Sequelize vs SQL crudo manual.
 */
const compareSqlOrm = async (req, res, next) => {
  try {
    const comparacion = await userService.compareSqlAndOrm();
    res.status(200).json({
      status: 'success',
      data: comparacion
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserWithOrders,
  testTransaction,
  compareSqlOrm
};
