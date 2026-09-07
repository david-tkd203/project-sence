// ==============================================================================
// Configuración de la Base de Datos con Sequelize (config/database.js)
// ==============================================================================
// Este módulo inicializa la instancia de conexión con el ORM Sequelize.
// Soporta SQLite por defecto (cero configuración externa para desarrollo)
// y permite cambiar fácilmente a PostgreSQL o MySQL mediante variables de entorno.
// ==============================================================================

const { Sequelize } = require('sequelize');
const path = require('path');

// Obtenemos los parámetros de configuración desde las variables de entorno
const dialect = process.env.DB_DIALECT || 'sqlite';
const storage = process.env.DB_STORAGE 
  ? path.resolve(__dirname, '..', process.env.DB_STORAGE)
  : path.resolve(__dirname, '..', 'database.sqlite');

let sequelize;

if (dialect === 'sqlite') {
  // Configuración para SQLite (archivo local)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage,
    logging: false, // Desactivar logs ruidosos de SQL en terminal, o activar con console.log
  });
} else {
  // Configuración para PostgreSQL o MySQL
  sequelize = new Sequelize(
    process.env.DB_NAME || 'sence_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || (dialect === 'postgres' ? 5432 : 3306),
      dialect: dialect,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

/**
 * Función para autenticar y verificar la conexión con la base de datos
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(` Conexión a la base de datos (${dialect.toUpperCase()}) establecida exitosamente.`);
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
}

module.exports = {
  sequelize,
  testConnection
};
