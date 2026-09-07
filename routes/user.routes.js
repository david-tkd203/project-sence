// ==============================================================================
// Enrutador de Usuarios y Base de Datos (routes/user.routes.js)
// ==============================================================================
// Define los endpoints RESTful para la gestión de usuarios, pedidos,
// transacciones con rollback y comparación ORM vs SQL.
// ==============================================================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

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

// Lección 3: Crear usuario
router.post('/', userController.createUser);

// Lección 3: Modificar usuario por ID
router.put('/:id', userController.updateUser);

// Lección 3: Eliminar usuario por ID (con validación de existencia previa)
router.delete('/:id', userController.deleteUser);

module.exports = router;
