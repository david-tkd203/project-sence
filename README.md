# Proyecto Integrador Backend - Módulos #6, #7 y #8 (ABP Alkemy / Sence)

Aplicación backend completa desarrollada con **Node.js**, **Express**, **Sequelize ORM**, **JWT (JSON Web Tokens)** y **Multer**, integrando todas las competencias y requerimientos de los tres módulos del programa:
- **Módulo #6**: Estructura de servidor, rutas modulares, persistencia plana y contenido web estático.
- **Módulo #7**: Persistencia relacional, modelos y relaciones 1:N, operaciones CRUD y transacciones con rollback.
- **Módulo #8**: Exposición de una API RESTful profesional, autenticación y securización con JWT, y subida/validación de archivos con Multer.

---

## 📋 Tabla de Contenidos

1. [Requisitos del Sistema](#-requisitos-del-sistema)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Instalación y Configuración](#-instalación-y-configuración)
4. [Ejecución del Servidor](#-ejecución-del-servidor)
5. [Guía de la API RESTful y Endpoints](#-guía-de-la-api-restful-y-endpoints)
   - [Autenticación (JWT)](#1-autenticación-pública)
   - [Usuarios y Datos](#2-usuarios-y-datos)
   - [Subida de Archivos (Multer)](#3-subida-de-archivos)
   - [Rutas Públicas y Estado](#4-rutas-públicas-y-estado)
6. [Cómo Autenticarse y Consumir Rutas Protegidas](#-cómo-autenticarse-y-consumir-rutas-protegidas)
7. [Respuestas a Justificaciones Técnicas (Módulo #8)](#-respuestas-a-justificaciones-técnicas-módulo-8)
   - [Separación de Rutas y Controladores](#1-cómo-decidiste-separar-tus-rutas-y-controladores)
   - [Validaciones de Entrada y Mutación de Datos](#2-qué-validaciones-realizaste-antes-de-insertarmodificar-datos)
   - [Estrategia de Protección con JWT](#3-por-qué-decidiste-proteger-esas-rutas)
   - [Almacenamiento del Token en el Cliente](#4-dónde-y-cómo-almacenas-el-token)
8. [Reflexión Integradora de los Tres Módulos](#-reflexión-integradora-de-los-tres-módulos)

---

## 💻 Requisitos del Sistema

- **Node.js**: Versión 18.x o superior ([nodejs.org](https://nodejs.org/)).
- **npm**: Versión 9.x o superior.
- Sistema Operativo: Windows, macOS o Linux.

---

## 📁 Estructura del Proyecto

El proyecto aplica arquitectura modular en capas con separación neta de responsabilidades:

```text
proyecto-curso-sence/
├── config/                   # Configuración del entorno y conexión a BD
│   └── database.js           # Conexión Sequelize (SQLite por defecto, compatible con Postgres/MySQL)
├── controllers/              # Controladores que reciben peticiones y devuelven respuestas
│   ├── auth.controller.js    # Lógica de Login y Registro (generación de JWT)
│   ├── general.controller.js # Controladores de vista HTML y estado del servidor
│   ├── upload.controller.js  # Procesamiento de subida de archivos y asociación a usuario
│   └── user.controller.js    # CRUD, filtros, relaciones y transacciones
├── logs/                     # Persistencia de logs de auditoría
│   └── log.txt               # Registro histórico de accesos y transacciones fallidas
├── middlewares/              # Interceptores y funciones intermedias
│   ├── auth.middleware.js    # Validación de token JWT (Authorization: Bearer)
│   ├── error.middleware.js   # Manejador centralizado de errores
│   ├── logger.middleware.js  # Registro de visitas con fs.appendFile
│   └── upload.middleware.js  # Configuración de Multer (filtros MIME y límites)
├── models/                   # Modelos y asociaciones del ORM Sequelize
│   ├── index.js              # Inicialización de asociaciones (User 1:N Order)
│   ├── order.model.js        # Modelo de Pedidos
│   └── user.model.js         # Modelo de Usuarios (incluye avatar)
├── public/                   # Frontend estático servido por Express
│   ├── index.html            # Panel interactivo para pruebas en vivo
│   ├── styles.css            # Hoja de estilos moderna
│   └── uploads/              # Directorio público donde se almacenan las imágenes
├── routes/                   # Definición de endpoints modulares
│   ├── auth.routes.js        # Rutas /auth/login y /auth/register
│   ├── general.routes.js     # Rutas / y /status
│   ├── upload.routes.js      # Ruta /upload (protegida con JWT)
│   └── user.routes.js        # Rutas /usuarios (mutaciones protegidas con JWT)
├── services/                 # Lógica de negocio y consultas a base de datos
│   ├── auth.service.js       # Hashing con bcryptjs y firma de JWT
│   └── user.service.js       # Consultas ORM, transacciones y SQL puro
├── .env.example              # Plantilla de variables de entorno
├── .env                      # Variables de entorno locales
├── .gitignore                # Exclusiones de Git (node_modules, .env, *.sqlite)
├── index.js                  # Entrada principal: servidor, BD, middlewares y rutas
├── package.json              # Metadatos, dependencias y scripts
└── README.md                 # Documentación técnica completa
```

---

## ⚙️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/david-tkd203/project-sence.git
   cd project-sence
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

---

## 🚀 Ejecución del Servidor

- **Modo Desarrollo (con recarga automática):**
  ```bash
  npm run dev
  ```

- **Modo Producción:**
  ```bash
  npm start
  ```

Al arrancar, el servidor automáticamente:
1. Conecta la base de datos relacional y sincroniza los modelos.
2. Si la base está vacía, precarga 3 usuarios de prueba con contraseñas hasheadas (`password123`) y pedidos asociados.
3. Imprime en consola:
   ```text
   ====================================================
                    Servidor iniciado
   🚀 Servidor Express escuchando en: http://localhost:3000
   📁 Modo: development
   🗄️ Base de datos: sqlite
   🔐 Autenticación JWT y Multer activados.
   ====================================================
   ```

---

## 🌐 Guía de la API RESTful y Endpoints

### 1. Autenticación (Pública)
| Método | Endpoint | Descripción | Body (JSON) |
|---|---|---|---|
| `POST` | `/auth/register` | Registra un nuevo usuario con contraseña hasheada | `{ "nombre", "email", "password", "rol" }` |
| `POST` | `/auth/login` | Inicia sesión y retorna un token JWT válido por 2 horas | `{ "email", "password" }` |

### 2. Usuarios y Datos
| Método | Endpoint | Protección | Descripción |
|---|---|---|---|
| `GET` | `/usuarios` | Pública | Lista usuarios (sin contraseñas). Filtros: `?rol=` y `?nombre=` |
| `GET` | `/usuarios/:id` | Pública | Detalle de un usuario |
| `POST` | `/usuarios` | **JWT (Bearer)** | Crea usuario |
| `PUT` | `/usuarios/:id` | **JWT (Bearer)** | Modifica usuario existente (valida existencia) |
| `DELETE` | `/usuarios/:id` | **JWT (Bearer)** | Elimina usuario (valida existencia previa) |
| `GET` | `/usuarios/:id/pedidos`| Pública | Relación 1:N: Usuario con sus pedidos asociados |
| `POST` | `/usuarios/transaccion-test`| Pública | Transaccionalidad con rollback garantizado |
| `GET` | `/usuarios/comparacion-sql` | Pública | Comparación de tiempos y resultados: ORM vs SQL crudo |

### 3. Subida de Archivos
| Método | Endpoint | Protección | Tipo de Petición | Descripción |
|---|---|---|---|---|
| `POST` | `/upload` | **JWT (Bearer)** | `multipart/form-data` | Sube imagen (JPEG, PNG, WEBP, GIF, máx 2MB) y asocia al usuario |

### 4. Rutas Públicas y Estado
| Método | Endpoint | Descripción | Formato |
|---|---|---|---|
| `GET` | `/` | Panel web interactivo con consola en vivo | HTML |
| `GET` | `/status` | Estado operativo del servidor, uptime y versión | JSON |

---

## 🔐 Cómo Autenticarse y Consumir Rutas Protegidas

### 1. Obtener Token mediante Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan.perez@empresa.com","password":"password123"}'
```
*Respuesta:*
```json
{
  "status": "success",
  "message": "Autenticación exitosa. Token generado correctamente.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "2h",
    "usuario": { "id": 1, "nombre": "Juan Pérez", "email": "juan.perez@empresa.com", "rol": "administrador" }
  }
}
```

### 2. Consumir una Ruta Protegida enviando el Token:
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"nombre":"Ana Torres","email":"ana@correo.com","password":"passSeguro456","rol":"cliente"}'
```

*Si no se envía el token o es inválido:*
```json
{
  "status": "fail",
  "message": "Acceso no autorizado: No se proporcionó el token de autenticación.",
  "instrucciones": "Debe incluir la cabecera \"Authorization: Bearer <su_token>\""
}
```

---

## 🧠 Respuestas a Justificaciones Técnicas (Módulo #8)

### 1. ¿Cómo decidiste separar tus rutas y controladores?
Se aplicó el principio de **Separación de Responsabilidades (SoC)** del diseño RESTful:
- Las **Rutas** (`routes/`) se limitan a definir endpoints, verbos HTTP y encadenar middlewares (como `verifyToken` y `upload.single`).
- Los **Controladores** (`controllers/`) se encargan exclusivamente de la capa de transporte HTTP: desestructuran `req.body`, `req.params` o `req.query`, llaman al servicio correspondiente y devuelven respuestas HTTP consistentes (`status`, `data`, `message`).
- Los **Servicios** (`services/`) encapsulan la lógica de negocio y las consultas a Sequelize, desacoplando completamente la base de datos de los controladores.

### 2. ¿Qué validaciones realizaste antes de insertar/modificar datos?
1. **Validaciones en Controladores y Servicios**:
   - Presencia obligatoria de campos requeridos (`nombre`, `email`, `password`).
   - Verificación de duplicidad de correo electrónico antes del registro.
   - En peticiones `PUT`: comprobación previa de existencia del recurso (`findByPk`) retornando `404` si no existe, y filtrado selectivo de campos (*Mass Assignment Protection*) para impedir sobreescritura del `id`.
2. **Validaciones en Subida de Archivos (`multer`)**:
   - Filtro de tipo MIME estricto (`image/jpeg`, `image/png`, `image/webp`, `image/gif`).
   - Límite estricto de tamaño (`2MB`) para evitar sobrecarga del servidor.
3. **Validaciones a nivel de Modelo ORM**:
   - `isEmail`, `notEmpty`, y restricciones de enumeración (`isIn: [['cliente', 'administrador', 'invitado']]`).

### 3. ¿Por qué decidiste proteger esas rutas?
Se protegieron las rutas de mutación de datos (`POST /usuarios`, `PUT /usuarios/:id`, `DELETE /usuarios/:id` y `POST /upload`) aplicando el **Principio de Menor Privilegio**:
- Las operaciones de lectura (`GET`) pueden ser públicas o accesibles según la necesidad de presentación.
- Sin embargo, la creación, alteración o eliminación de registros, así como el consumo de almacenamiento en disco del servidor (subida de archivos), son operaciones de alto impacto que solo deben ser ejecutadas por usuarios autenticados con identidad verificada mediante JWT.

### 4. ¿Dónde y cómo almacenas el token?
- **En el Servidor**: El servidor es *stateless* (sin estado). No almacena el token en memoria ni base de datos, sino que verifica criptográficamente su firma digital usando la clave secreta (`process.env.JWT_SECRET`) y valida su tiempo de expiración (`exp`).
- **En el Cliente**: El token debe enviarse en cada petición en el encabezado estándar:
  ```http
  Authorization: Bearer <token_jwt>
  ```
  En aplicaciones web modernas de producción, la recomendación de máxima seguridad es almacenarlo en una cookie con atributos `HttpOnly`, `Secure` y `SameSite=Strict` para prevenir ataques de *Cross-Site Scripting* (XSS). Para propósitos didácticos y consumo desde clientes móviles o SPA desacopladas, se gestiona a través del encabezado `Authorization`.

---

## 🔮 Reflexión Integradora de los Tres Módulos

El desarrollo de este proyecto demuestra la evolución completa del desarrollo Backend moderno:
1. **Módulo #6 (Los Cimientos)**: Aprendimos el ciclo de solicitud-respuesta en Express, la configuración de middlewares, la entrega de contenido estático y la persistencia plana con `fs`. Esto sentó las bases de organización modular del proyecto.
2. **Módulo #7 (Persistencia y Datos Relacionales)**: Dimos el salto a una base de datos real con el ORM Sequelize, entendiendo cómo modelar entidades, establecer relaciones relacionales (1:N), construir operaciones CRUD y garantizar la consistencia mediante transacciones atómicas con rollback.
3. **Módulo #8 (Seguridad, REST y Cierre Profesional)**: Transformamos la aplicación en una API RESTful profesional, asegurándola con autenticación basada en JSON Web Tokens, encriptando contraseñas con bcryptjs y gestionando la carga segura de archivos con Multer.
