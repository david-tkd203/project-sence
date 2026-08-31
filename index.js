// ==============================================================================
// Archivo Principal del Servidor (index.js)
// ==============================================================================
// Este es el punto de entrada de la aplicación.
// Aquí se configuran las variables de entorno, se inicializa la app de Express,
// se aplican los middlewares globales (estáticos, json, logging) y se registran las rutas.
// ==============================================================================

// 1. Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// 2. Importar paquetes y dependencias necesarias
const express = require('express');
const path = require('path');

// 3. Importar middlewares y enrutadores personalizados
const requestLogger = require('./middlewares/logger.middleware');
const generalRoutes = require('./routes/general.routes');

// 4. Inicializar la aplicación Express
const app = express();

// 5. Configurar el puerto desde las variables de entorno (.env) o usar el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// ==============================================================================
// Configuración de Middlewares
// ==============================================================================

// Middleware para procesar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL (formularios)
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos (HTML, CSS, JS, imágenes) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de registro en archivo plano (guarda visitas en logs/log.txt)
app.use(requestLogger);

// ==============================================================================
// Registro de Rutas
// ==============================================================================

// Conectar las rutas generales a la aplicación
app.use('/', generalRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada (404)',
    path: req.originalUrl
  });
});

// ==============================================================================
// Inicialización del Servidor
// ==============================================================================

/**
 * Función encargada de iniciar la escucha del servidor HTTP
 */
function iniciarServidor() {
  app.listen(PORT, () => {
    console.log('==============================================');
    console.log('           Servidor iniciado');
    console.log(`🚀 Servidor Express escuchando en: http://localhost:${PORT}`);
    console.log(`📁 Modo: ${process.env.NODE_ENV || 'development'}`);
    console.log('==============================================');
  });
}

// Ejecutar la función de inicio
iniciarServidor();

module.exports = app;
