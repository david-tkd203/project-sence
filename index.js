// ==============================================================================
// Archivo Principal del Servidor (index.js) - Módulos #6, #7 y #8
// ==============================================================================
// Punto de entrada de la aplicación Express consolidada.
// Integra:
// - Variables de entorno (.env)
// - Base de datos relacional con Sequelize
// - Autenticación y protección de rutas con JWT
// - Subida y validación de archivos con Multer
// - Logging en archivos planos y manejo centralizado de errores
// ==============================================================================

// 1. Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// 2. Importar paquetes y dependencias necesarias
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// 3. Importar configuración de BD, modelos y asociaciones
const { testConnection } = require('./config/database');
const { sequelize, User, Order } = require('./models');

// 4. Importar middlewares personalizados
const requestLogger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');

// 5. Importar enrutadores modulares
const generalRoutes = require('./routes/general.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');

// 6. Inicializar la aplicación Express
const app = express();

// 7. Configurar el puerto desde las variables de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Asegurar existencia de la carpeta public/uploads
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ==============================================================================
// Configuración de Middlewares Globales
// ==============================================================================

// Procesar cuerpos de solicitud en formato JSON
app.use(express.json());

// Procesar datos codificados en URL (formularios tradicionales)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir específicamente la carpeta de uploads de manera accesible y organizada
app.use('/uploads', express.static(uploadsDir));

// Middleware de registro en archivo plano (guarda accesos en logs/log.txt)
app.use(requestLogger);

// ==============================================================================
// Registro de Rutas Modulares
// ==============================================================================

// Rutas generales públicas (/, /status)
app.use('/', generalRoutes);

// Rutas de autenticación (POST /auth/register, POST /auth/login)
app.use('/auth', authRoutes);

// Rutas de subida de archivos (POST /upload - protegido con JWT)
app.use('/upload', uploadRoutes);

// Rutas de usuarios y base de datos (/usuarios - mutaciones protegidas con JWT)
app.use('/usuarios', userRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada (404)',
    path: req.originalUrl
  });
});

// Middleware global de manejo centralizado de errores
app.use(errorHandler);

// ==============================================================================
// Inicialización y Semilla de Base de Datos
// ==============================================================================

/**
 * Precarga al menos 3 registros simulados con contraseñas encriptadas y pedidos asociados
 */
async function seedDatabase() {
  const userCount = await User.count();
  if (userCount === 0) {
    console.log('🌱 Poblando base de datos con registros iniciales...');
    
    // Hasheamos la contraseña por defecto para los usuarios iniciales
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Crear 3 usuarios simulados
    const u1 = await User.create({
      nombre: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      password: passwordHash,
      rol: 'administrador',
      activo: true
    });

    const u2 = await User.create({
      nombre: 'María González',
      email: 'maria.gonzalez@empresa.com',
      password: passwordHash,
      rol: 'cliente',
      activo: true
    });

    const u3 = await User.create({
      nombre: 'Carlos Soto',
      email: 'carlos.soto@empresa.com',
      password: passwordHash,
      rol: 'cliente',
      activo: false
    });

    // Crear pedidos simulados (Relación 1:N)
    await Order.bulkCreate([
      { descripcion: 'Licencia anual de software Cloud', monto: 299.99, estado: 'completado', userId: u1.id },
      { descripcion: 'Servicio de consultoría técnica', monto: 450.00, estado: 'completado', userId: u1.id },
      { descripcion: 'Suscripción mensual plan estándar', monto: 49.99, estado: 'completado', userId: u2.id },
      { descripcion: 'Pack de horas de soporte', monto: 120.50, estado: 'pendiente', userId: u3.id }
    ]);

    console.log('✅ Base de datos poblada con 3 usuarios y pedidos de prueba (contraseña común: password123).');
  }
}

/**
 * Conexión y puesta en marcha del servidor
 */
async function iniciarServidor() {
  try {
    // 1. Probar conexión a la base de datos
    await testConnection();

    // 2. Sincronizar tablas del ORM (con alter: true para migrar automáticamente nuevos campos como avatar)
    await sequelize.sync({ alter: true });

    // 3. Poblar datos simulados mínimos
    await seedDatabase();

    // 4. Iniciar escucha del servidor
    app.listen(PORT, () => {
      console.log('====================================================');
      console.log('                 Servidor iniciado');
      console.log(`🚀 Servidor Express escuchando en: http://localhost:${PORT}`);
      console.log(`📁 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️ Base de datos: ${process.env.DB_DIALECT || 'sqlite'}`);
      console.log(`🔐 Autenticación JWT y Multer activados.`);
      console.log('====================================================');
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
  }
}

// Iniciar aplicación
iniciarServidor();

module.exports = app;
