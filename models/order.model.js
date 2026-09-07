// ==============================================================================
// Modelo de Pedido / Orden (models/order.model.js)
// ==============================================================================
// Representa la tabla 'pedidos' vinculada con los usuarios (Relación 1:N).
// Un usuario puede tener múltiples pedidos.
// ==============================================================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción del pedido es obligatoria' }
      }
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: 'El monto debe ser un valor decimal válido' },
        min: { args: [0], msg: 'El monto no puede ser negativo' }
      }
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: 'completado',
      validate: {
        isIn: {
          args: [['pendiente', 'procesando', 'completado', 'cancelado']],
          msg: 'Estado de pedido no válido'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    tableName: 'pedidos',
    timestamps: true
  });

  return Order;
};
