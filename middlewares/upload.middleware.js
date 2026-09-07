// ==============================================================================
// Middleware de Subida de Archivos con Multer (middlewares/upload.middleware.js)
// ==============================================================================
// Configura el almacenamiento en disco para archivos subidos en la carpeta pública
// 'public/uploads', valida los tipos de archivo permitidos (imágenes)
// y restringe el tamaño máximo a 2 MB para evitar ataques de denegación de servicio.
// ==============================================================================

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Carpeta de destino de archivos subidos
const uploadDirectory = path.join(__dirname, '..', 'public', 'uploads');

// Asegurar que la carpeta exista
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// 1. Configuración del almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    // Generar un nombre único: timestamp + número aleatorio + extensión original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `file-${uniqueSuffix}${extension}`);
  }
});

// 2. Filtro estricto de tipos de archivo (MIME types permitidos)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes JPEG, PNG, WEBP o GIF.'), false);
  }
};

// 3. Inicialización de Multer con límites de tamaño
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // Límite máximo: 2 Megabytes
  },
  fileFilter: fileFilter
});

module.exports = upload;
