// ==============================================================================
// Enrutador de Usuarios y Base de Datos (routes/user.routes.js)
// ==============================================================================
// Define los endpoints RESTful para usuarios y pedidos.
// Las rutas de modificación de datos (POST, PUT, DELETE) están securizadas
// mediante el middleware verifyToken (Módulo #8).
// ==============================================================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Lección 5: Comparación entre consulta SQL manual y métodos de ORM Sequelize
router.get('/comparacion-sql', userController.compareSqlOrm);

// Lección 4: Demostración de Transaccionalidad (con soporte para forzar error y rollback)
router.post('/transaccion-test', userController.testTransaction);

// Lección 2: Obtener usuarios (con filtrado opcional ?nombre= &rol=)
router.get('/', userController.getUsers);

// Lección 6: Consulta de relación 1:N (Usuario con sus Pedidos anidados)
router.get('/:id/pedidos', userController.getUserWithOrders);

// Detalle de un usuario por ID
router.get('/:id', userController.getUserById);

// ==============================================================================
// Rutas Protegidas mediante JWT (Lección 4 - Módulo #8)
// Solo accesibles enviando 'Authorization: Bearer <token>'
// ==============================================================================

// Crear usuario (protegido con JWT)
router.post('/', verifyToken, userController.createUser);

// Modificar usuario por ID (protegido con JWT)
router.put('/:id', verifyToken, userController.updateUser);

// Eliminar usuario por ID (protegido con JWT)
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
