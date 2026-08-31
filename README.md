# Proyecto Node & Express Web App - Evaluación Módulo #6

Aplicación backend desarrollada con **Node.js** y **Express** correspondiente a la primera entrega del Trabajo Práctico Integrador (Módulo #6: *Primeros pasos con Node y Express*).

Este proyecto sienta las bases arquitectónicas modulares para el posterior escalado e integración de bases de datos relacionales/documentales (Módulo #7) y seguridad con JWT y subida de archivos (Módulo #8).

---

## 📋 Tabla de Contenidos

1. [Requisitos del Sistema](#-requisitos-del-sistema)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Instalación y Configuración](#-instalación-y-configuración)
4. [Ejecución del Servidor](#-ejecución-del-servidor)
5. [Endpoints y Rutas Disponibles](#-endpoints-y-rutas-disponibles)
6. [Justificaciones Técnicas de Diseño](#-justificaciones-técnicas-de-diseño)
7. [Reflexión y Proyección a Futuro (Módulos #7 y #8)](#-reflexión-y-proyección-a-futuro-módulos-7-y-8)

---

## 💻 Requisitos del Sistema

- **Node.js**: Versión 18.x o superior instalada ([nodejs.org](https://nodejs.org/)).
- **npm**: Gestor de paquetes incluido con Node.js (v9.x o superior).
- Sistema Operativo: Windows, macOS o Linux.

---

## 📁 Estructura del Proyecto

El proyecto implementa una arquitectura modular con separación de responsabilidades en 5 carpetas principales:

```text
proyecto-curso-sence/
├── controllers/              # Lógica de negocio y manejadores de respuestas
│   └── general.controller.js # Controladores para rutas públicas (HTML y JSON)
├── logs/                     # Persistencia de datos en archivos planos
│   └── log.txt               # Registro histórico de accesos a la aplicación
├── middlewares/              # Funciones intermedias del ciclo solicitud-respuesta
│   └── logger.middleware.js  # Middleware de logging asíncrono con fs.appendFile
├── public/                   # Archivos estáticos servidos públicamente
│   ├── index.html            # Vista HTML principal
│   └── styles.css            # Hoja de estilos CSS
├── routes/                   # Definición y mapeo de endpoints con Router
│   └── general.routes.js     # Enrutador para las rutas / y /status
├── .env.example              # Plantilla de variables de entorno
├── .env                      # Variables de entorno locales (puerto, etc.)
├── .gitignore                # Archivos y directorios excluidos de Git
├── index.js                  # Punto de entrada principal e inicialización de Express
├── package.json              # Configuración de dependencias y scripts de npm
└── README.md                 # Documentación completa del proyecto
```

---

## ⚙️ Instalación y Configuración

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd "proyecto curso sence"
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Copiar el archivo `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```
   *El archivo `.env` define por defecto `PORT=3000`.*

---

## 🚀 Ejecución del Servidor

El archivo `package.json` incluye dos scripts principales:

- **Modo Producción / Estándar:**
  ```bash
  npm start
  ```
  Ejecuta el servidor directamente con `node index.js`.

- **Modo Desarrollo (con recarga automática):**
  ```bash
  npm run dev
  ```
  Ejecuta el servidor utilizando `nodemon index.js`, reiniciando automáticamente el proceso ante cambios en el código.

Al iniciar exitosamente, la terminal mostrará:
```text
==============================================
           Servidor iniciado
🚀 Servidor Express escuchando en: http://localhost:3000
📁 Modo: development
==============================================
```

---

## 🌐 Endpoints y Rutas Disponibles

| Método | Ruta | Formato de Respuesta | Descripción |
|---|---|---|---|
| `GET` | `/` | HTML | Renderiza y sirve la página web estática de bienvenida desde `public/index.html`. |
| `GET` | `/status` | JSON | Retorna el estado del servidor, uptime, versión de Node y timestamp. |
| `GET` | `*` | JSON | Manejador global de rutas inexistentes (Error 404). |

### Ejemplo de Respuesta `GET /status` (JSON):
```json
{
  "status": "OK",
  "message": "El servidor Express está funcionando correctamente.",
  "data": {
    "uptimeSeconds": 124,
    "environment": "development",
    "nodeVersion": "v18.20.0",
    "timestamp": "2026-08-30T21:35:00.000Z"
  }
}
```

---

## 🧠 Justificaciones Técnicas de Diseño

### 1. Elección de `index.js` como Archivo Principal
Se seleccionó `index.js` porque es la convención estándar en el ecosistema Node.js y JavaScript. Permite que herramientas como npm reconozcan el punto de entrada por defecto sin configuraciones adicionales y centraliza la configuración de Express, middlewares globales y la puesta en marcha del servidor.

### 2. Justificación de Scripts en `package.json`
- `npm start`: Comando estándar recomendado para entornos de producción y plataformas de despliegue en la nube (Heroku, Render, AWS), ejecutando `node index.js` con el menor consumo de memoria.
- `npm run dev`: Utiliza `nodemon` como dependencia de desarrollo (`devDependencies`), agilizando el flujo de trabajo del desarrollador al evitar reinicios manuales ante cada cambio de archivo.

### 3. Uso de la Carpeta `/public` y `express.static`
Se utilizó la carpeta `/public` configurada con el middleware nativo `express.static('public')`. Esta decisión permite entregar recursos estáticos (HTML, CSS, imágenes, scripts de cliente) de forma directa y eficiente sin sobrecargar el enrutador de Express, separando la capa visual estática de la lógica de API del backend.

### 4. Persistencia en Archivos Planos (`logs/log.txt`)
Para cumplir con el almacenamiento básico sin base de datos, se implementó un middleware (`middlewares/logger.middleware.js`) que hace uso del método nativo asíncrono `fs.appendFile()`. 
- **Ventaja**: No bloquea el *Event Loop* de Node.js al procesar solicitudes simultáneas.
- **Formato**: Cada línea guarda `[fecha hora] Método: HTTP | Ruta: /ruta`, permitiendo auditoría y trazabilidad básica de las peticiones recibidas.

### 5. Estructura de Carpetas (Separación de Responsabilidades)
Se estructuró el código en 5 carpetas para sentar una base de arquitectura limpia:
- `routes/`: Define endpoints y verbos HTTP.
- `controllers/`: Contiene las funciones que ejecutan la lógica de respuesta.
- `middlewares/`: Interceptores para tareas transversales (logging, futuras validaciones y autenticación).
- `public/`: Contenido estático web.
- `logs/`: Persistencia plana de eventos.

---

## 🔮 Reflexión y Proyección a Futuro (Módulos #7 y #8)

Esta primera versión del proyecto establece una arquitectura sólida, desacoplada y predecible:
- **Hacia el Módulo #7 (Base de Datos & ORM)**: La carpeta `controllers/` permitirá reemplazar fácilmente las respuestas estáticas por consultas asíncronas a modelos de datos creados con **Sequelize (PostgreSQL)** o **Mongoose (MongoDB)**, agregando una carpeta `models/` y operaciones CRUD completas.
- **Hacia el Módulo #8 (Seguridad, JWT & Subida de Archivos)**: La carpeta `middlewares/` alojará el middleware de validación de tokens `verifyToken` con `jsonwebtoken` para proteger rutas privadas, así como la configuración de `multer` para procesar y validar la subida de imágenes y archivos hacia el servidor.
