// ==============================================================================
// Archivo Principal del Servidor (index.js)
// ==============================================================================
// Punto de entrada de la aplicación.
// Configura variables de entorno, conecta la base de datos relacional con Sequelize,
// sincroniza modelos con datos semilla iniciales, registra rutas y maneja errores.
// ==============================================================================

// 1. Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// 2. Importar paquetes y dependencias necesarias
const express = require('express');
const path = require('path');

// 3. Importar configuración de BD, modelos y asociaciones
const { testConnection } = require('./config/database');
const { sequelize, User, Order } = require('./models');

// 4. Importar middlewares y enrutadores personalizados
const requestLogger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const generalRoutes = require('./routes/general.routes');
const userRoutes = require('./routes/user.routes');

// 5. Inicializar la aplicación Express
const app = express();

// 6. Configurar el puerto desde las variables de entorno (.env) o usar el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// ==============================================================================
// Configuración de Middlewares
// ==============================================================================

// Middleware para procesar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de registro en archivo plano (guarda visitas en logs/log.txt)
app.use(requestLogger);

// ==============================================================================
// Registro de Rutas
// ==============================================================================

// Rutas generales públicas (/, /status)
app.use('/', generalRoutes);

// Rutas de datos con ORM Sequelize (/usuarios)
app.use('/usuarios', userRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada (404)',
    path: req.originalUrl
  });
});

// Middleware global de manejo de errores
app.use(errorHandler);

// ==============================================================================
// Inicialización y Semilla de Base de Datos (Seed de al menos 3 usuarios)
// ==============================================================================

/**
 * Precarga al menos 3 registros simulados si la tabla de usuarios está vacía
 */
async function seedDatabase() {
  const userCount = await User.count();
  if (userCount === 0) {
    console.log('🌱 Poblando base de datos con registros iniciales...');
    
    // Crear 3 usuarios simulados (Lección 2)
    const u1 = await User.create({
      nombre: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      password: 'passwordSeguro123',
      rol: 'administrador',
      activo: true
    });

    const u2 = await User.create({
      nombre: 'María González',
      email: 'maria.gonzalez@empresa.com',
      password: 'passwordSeguro456',
      rol: 'cliente',
      activo: true
    });

    const u3 = await User.create({
      nombre: 'Carlos Soto',
      email: 'carlos.soto@empresa.com',
      password: 'passwordSeguro789',
      rol: 'cliente',
      activo: false
    });

    // Crear pedidos simulados para demostrar relaciones 1:N (Lección 6)
    await Order.bulkCreate([
      { descripcion: 'Licencia anual de software Cloud', monto: 299.99, estado: 'completado', userId: u1.id },
      { descripcion: 'Servicio de consultoría técnica', monto: 450.00, estado: 'completado', userId: u1.id },
      { descripcion: 'Suscripción mensual plan estándar', monto: 49.99, estado: 'completado', userId: u2.id },
      { descripcion: 'Pack de horas de soporte', monto: 120.50, estado: 'pendiente', userId: u3.id }
    ]);

    console.log('✅ Base de datos poblada con 3 usuarios y pedidos de prueba.');
  }
}

/**
 * Función encargada de conectar la base de datos y arrancar el servidor HTTP
 */
async function iniciarServidor() {
  try {
    // 1. Probar conexión a la base de datos
    await testConnection();

    // 2. Sincronizar tablas del ORM
    await sequelize.sync();

    // 3. Poblar datos simulados mínimos
    await seedDatabase();

    // 4. Iniciar escucha del servidor
    app.listen(PORT, () => {
      console.log('====================================================');
      console.log('                 Servidor iniciado');
      console.log(`🚀 Servidor Express escuchando en: http://localhost:${PORT}`);
      console.log(`📁 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️ Base de datos: ${process.env.DB_DIALECT || 'sqlite'}`);
      console.log('====================================================');
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
  }
}

// Ejecutar la función de inicio
iniciarServidor();

module.exports = app;
