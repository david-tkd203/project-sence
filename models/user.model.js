// ==============================================================================
// Modelo de Usuario (models/user.model.js)
// ==============================================================================
// Representa la tabla 'usuarios' en la base de datos relacional.
// Define atributos, tipos de datos, avatar para subida de archivos y validaciones.
// ==============================================================================

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
      }
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Debe ingresar un email válido' },
        notEmpty: { msg: 'El email es obligatorio' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La contraseña es obligatoria' }
      }
    },
    rol: {
      type: DataTypes.STRING(50),
      defaultValue: 'cliente',
      validate: {
        isIn: {
          args: [['cliente', 'administrador', 'invitado']],
          msg: 'El rol debe ser cliente, administrador o invitado'
        }
      }
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: true
  });

  return User;
};
