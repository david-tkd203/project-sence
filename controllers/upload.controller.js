// ==============================================================================
// Controlador de Subida de Archivos (controllers/upload.controller.js)
// ==============================================================================
// Gestiona la respuesta tras la carga de archivos procesados por Multer,
// valida la presencia del archivo y permite asociarlo al usuario autenticado.
// ==============================================================================

const { User } = require('../models');

/**
 * POST /upload
 * Endpoint para subir un archivo (foto de perfil o documento de usuario).
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No se subió ningún archivo o el formato no es válido (solo imágenes JPEG, PNG, WEBP, GIF).'
      });
    }

    // Ruta pública para acceder al archivo subido
    const fileUrl = `/uploads/${req.file.filename}`;

    // Tarea PLUS Lección 3: Asociar el archivo subido a un registro de usuario en la base de datos
    let usuarioActualizado = null;
    const targetUserId = req.body.userId || (req.user && req.user.id);

    if (targetUserId) {
      const user = await User.findByPk(targetUserId);
      if (user) {
        await user.update({ avatar: fileUrl });
        const { password, ...safeUser } = user.toJSON();
        usuarioActualizado = safeUser;
      }
    }

    res.status(201).json({
      status: 'success',
      message: 'Archivo subido y procesado exitosamente por Multer.',
      data: {
        nombreOriginal: req.file.originalname,
        nombreGuardado: req.file.filename,
        tamanoBytes: req.file.size,
        formatoMime: req.file.mimetype,
        urlPublica: fileUrl,
        usuarioAsociado: usuarioActualizado || 'Ninguno especificado'
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile
};
