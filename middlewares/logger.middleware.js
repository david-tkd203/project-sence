// ==============================================================================
// Middleware de Logging (Persistencia en Archivos Planos)
// ==============================================================================
// Este middleware se encarga de interceptar cada petición HTTP que llega al servidor
// y registrar la fecha, hora y ruta accedida dentro del archivo 'logs/log.txt'
// utilizando el módulo nativo 'fs' de Node.js mediante 'fs.appendFile()'.
// ==============================================================================

const fs = require('fs');
const path = require('path');

// Definimos la ruta absoluta hacia el archivo de log para evitar problemas con directorios relativos
const logFilePath = path.join(__dirname, '..', 'logs', 'log.txt');

/**
 * Middleware para registrar las visitas a las rutas en un archivo plano.
 * @param {import('express').Request} req - Objeto de solicitud de Express
 * @param {import('express').Response} res - Objeto de respuesta de Express
 * @param {import('express').NextFunction} next - Función para continuar al siguiente middleware o controlador
 */
const requestLogger = (req, res, next) => {
  // Obtenemos la fecha y hora actual
  const now = new Date();
  
  // Formateamos la fecha (YYYY-MM-DD)
  const fecha = now.toISOString().split('T')[0];
  
  // Formateamos la hora (HH:mm:ss)
  const hora = now.toTimeString().split(' ')[0];
  
  // Obtenemos la ruta y el método HTTP accedido
  const rutaAccedida = req.originalUrl || req.url;
  const metodo = req.method;

  // Estructura mínima requerida: fecha, hora, ruta accedida
  const logLine = `[${fecha} ${hora}] Método: ${metodo} | Ruta: ${rutaAccedida}\n`;

  // Aseguramos que la carpeta logs exista antes de escribir
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Usamos fs.appendFile de manera asíncrona para no bloquear el Event Loop del servidor
  fs.appendFile(logFilePath, logLine, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo de log:', err);
    }
  });

  // Continuamos con el flujo de la petición hacia el siguiente middleware o controlador
  next();
};

module.exports = requestLogger;
