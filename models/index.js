// ==============================================================================
// Configuración de Modelos y Relaciones (models/index.js)
// ==============================================================================
// En este archivo centralizamos los modelos del ORM y definimos sus asociaciones:
// Relación 1:N -> Un Usuario tiene muchos Pedidos (User.hasMany(Order))
//               -> Un Pedido pertenece a un Usuario (Order.belongsTo(User))
// ==============================================================================

const { sequelize } = require('../config/database');

// Importar definiciones de modelos
const defineUser = require('./user.model');
const defineOrder = require('./order.model');

// Instanciar modelos vinculados a la instancia de Sequelize
const User = defineUser(sequelize);
const Order = defineOrder(sequelize);

// ==============================================================================
// Definición de Relaciones (Lección 6)
// ==============================================================================

// Un Usuario puede tener muchos pedidos
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'pedidos',
  onDelete: 'CASCADE'
});

// Cada Pedido pertenece a un único Usuario
Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'usuario'
});

module.exports = {
  sequelize,
  User,
  Order
};
