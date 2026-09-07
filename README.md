# Proyecto Node & Express Web App - Evaluación Módulos #6 y #7

Aplicación backend desarrollada con **Node.js**, **Express** y el ORM **Sequelize**, correspondiente a las entregas de los **Módulos #6** (*Primeros pasos con Node y Express*) y **#7** (*Acceso a datos en aplicaciones Node*) del programa de formación (Alkemy / Sence).

El proyecto implementa una arquitectura modular profesional con persistencia relacional en base de datos, operaciones CRUD completas, transaccionalidad atómica con rollback, relaciones 1:N entre entidades y registro de auditoría.

---

## 📋 Tabla de Contenidos

1. [Requisitos del Sistema](#-requisitos-del-sistema)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Instalación y Configuración](#-instalación-y-configuración)
4. [Ejecución del Servidor](#-ejecución-del-servidor)
5. [Endpoints y Rutas de la API](#-endpoints-y-rutas-de-la-api)
6. [Respuestas a Justificaciones Técnicas (Módulo #7)](#-respuestas-a-justificaciones-técnicas-módulo-7)
   - [Lección 1: Conexión y Protección de Datos Sensibles](#lección-1-conexión-y-protección-de-datos-sensibles)
   - [Lección 2: Obtención de Datos y Filtrado](#lección-2-obtención-de-datos-y-filtrado)
   - [Lección 3: Modificación Controlada y Validaciones](#lección-3-modificación-controlada-y-validaciones)
   - [Lección 4: Transaccionalidad y Rollback](#lección-4-transaccionalidad-y-rollback)
   - [Lección 5: Comparación ORM vs SQL Tradicional](#lección-5-comparación-orm-vs-sql-tradicional)
   - [Lección 6: Relaciones 1:N en el ORM](#lección-6-relaciones-1n-en-el-orm)
7. [Proyección al Módulo #8 (Seguridad, JWT y Subida de Archivos)](#-proyección-al-módulo-8)

---

## 💻 Requisitos del Sistema

- **Node.js**: Versión 18.x o superior ([nodejs.org](https://nodejs.org/)).
- **npm**: Versión 9.x o superior.
- Sistema Operativo: Windows, Linux o macOS.

---

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura modular en capas con estricta separación de responsabilidades:

```text
proyecto-curso-sence/
├── config/                   # Configuración del servidor y base de datos
│   └── database.js           # Conexión Sequelize con soporte multi-dialecto (.env)
├── controllers/              # Controladores que reciben peticiones y dan formato a respuestas
│   ├── general.controller.js # Controladores de rutas públicas (/, /status)
│   └── user.controller.js    # Controladores CRUD, filtros, relaciones y transacciones
├── logs/                     # Persistencia plana y logs de auditoría
│   └── log.txt               # Registro histórico de accesos y transacciones fallidas
├── middlewares/              # Middlewares interceptores de Express
│   ├── error.middleware.js   # Manejador centralizado de excepciones y validaciones
│   └── logger.middleware.js  # Registro de visitas con fs.appendFile
├── models/                   # Definición de entidades y asociaciones del ORM
│   ├── index.js              # Inicialización de Sequelize y relaciones (User 1:N Order)
│   ├── order.model.js        # Modelo de Pedido / Orden
│   └── user.model.js         # Modelo de Usuario
├── public/                   # Frontend estático servido con express.static
│   ├── index.html            # Panel web interactivo con botones de prueba
│   └── styles.css            # Estilos visuales
├── routes/                   # Definición de endpoints HTTP con express.Router
│   ├── general.routes.js     # Enrutador para / y /status
│   └── user.routes.js        # Enrutador para /usuarios y sub-recursos
├── services/                 # Capa de lógica de negocio y consultas a la base de datos
│   └── user.service.js       # Operaciones de persistencia, transacciones y SQL puro
├── .env.example              # Plantilla de variables de entorno
├── .env                      # Variables de entorno locales
├── .gitignore                # Archivos excluidos de Git (node_modules, .env, etc.)
├── database.sqlite           # Base de datos relacional local (generada automáticamente)
├── index.js                  # Entrada principal: conexión a BD, seed inicial y escucha
├── package.json              # Metadatos, scripts (start, dev) y dependencias
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
   *Por defecto, `.env` está configurado con `DB_DIALECT=sqlite`, lo cual no requiere instalar ni configurar motores externos de bases de datos. Si se desea usar PostgreSQL o MySQL, basta con cambiar los parámetros en `.env`.*

---

## 🚀 Ejecución del Servidor

- **Modo Desarrollo (con recarga automática mediante Nodemon):**
  ```bash
  npm run dev
  ```

- **Modo Producción:**
  ```bash
  npm start
  ```

Al arrancar, el servidor automáticamente:
1. Verifica la conexión a la base de datos relacional.
2. Sincroniza las tablas (`User` y `Order`).
3. Pobla la base de datos con al menos 3 usuarios simulados con pedidos si está vacía.
4. Muestra en consola el mensaje `"Servidor iniciado"` y el puerto activo.

---

## 🌐 Endpoints y Rutas de la API

### Rutas Generales (Módulo #6)
| Método | Ruta | Descripción | Formato |
|---|---|---|---|
| `GET` | `/` | Vista web con panel interactivo de prueba | HTML |
| `GET` | `/status` | Estado operativo del servidor, uptime y fecha | JSON |

### Rutas de Datos y Usuarios (Módulo #7)
| Método | Ruta | Descripción | Formato |
|---|---|---|---|
| `GET` | `/usuarios` | Lista todos los usuarios (sin contraseñas). Soporta `?nombre=` y `?rol=` | JSON |
| `GET` | `/usuarios/:id` | Detalle de un usuario específico por su ID | JSON |
| `POST` | `/usuarios` | Crea un nuevo usuario validando datos obligatorios | JSON |
| `PUT` | `/usuarios/:id` | Modifica datos de un usuario (valida existencia previa) | JSON |
| `DELETE` | `/usuarios/:id` | Elimina un usuario (valida existencia previa) | JSON |
| `GET` | `/usuarios/:id/pedidos` | **Relación 1:N**: Obtiene usuario y sus pedidos usando `include` | JSON |
| `POST` | `/usuarios/transaccion-test` | **Transaccionalidad**: Crea usuario + pedido con soporte de rollback | JSON |
| `GET` | `/usuarios/comparacion-sql` | **ORM vs SQL**: Compara resultados y tiempos de ejecución | JSON |

---

## 🧠 Respuestas a Justificaciones Técnicas (Módulo #7)

### Lección 1: Conexión y Protección de Datos Sensibles
- **¿Por qué elegiste ese cliente de conexión?**  
  Se seleccionó **Sequelize** como ORM junto con el driver **SQLite** (`sqlite3`) como base de datos relacional predeterminada. Esta combinación permite portabilidad total: cualquier evaluador puede clonar y levantar el proyecto inmediatamente con `npm start` sin necesidad de instalar Docker ni configurar servidores MySQL/PostgreSQL externos. A la vez, Sequelize desacopla el dialecto SQL, permitiendo migrar a PostgreSQL o MySQL simplemente modificando las variables del archivo `.env`.
- **¿Cómo se protegen los datos sensibles?**  
  1. **En almacenamiento**: Las credenciales de conexión (`DB_USER`, `DB_PASS`, `PORT`) residen exclusivamente en el archivo `.env`, el cual está ignorado en `.gitignore`.
  2. **En consultas y respuestas**: En el servicio (`user.service.js`), todas las consultas de usuarios aplican `attributes: { exclude: ['password'] }`, impidiendo que los hashes de contraseñas u otros datos confidenciales salgan hacia los clientes HTTP.

---

### Lección 2: Obtención de Datos y Filtrado
- Los resultados de `GET /usuarios` son sanitizados antes de enviarse.
- Se implementó filtrado por query params (`?nombre=Juan` usando operadores `Op.like` y `?rol=cliente`), permitiendo búsquedas dinámicas sin inyección de SQL.

---

### Lección 3: Modificación Controlada y Validaciones
- **¿Por qué decidiste actualizar sólo ciertos campos en el `PUT`?**  
  Por principio de seguridad (*Mass Assignment Protection*). En una API segura no se debe permitir que un usuario modifique arbitrariamente atributos críticos como el `id`, la fecha de creación `createdAt`, o eleve sus privilegios cambiando su propio `rol` a `administrador` sin validación. Por ello, `updateUser` solo permite modificar explícitamente `nombre`, `rol` y `activo`.
- **¿Qué validaciones aplicaste para evitar errores?**  
  1. **Validación de existencia previa**: Si el ID no existe en la base de datos, se responde con un código `404 Not Found` en lugar de fallar silenciosamente.
  2. **Validaciones a nivel de modelo Sequelize**: Validación de formato de email (`isEmail`), no vacíos (`notEmpty`) y valores permitidos para el rol (`isIn: [['cliente', 'administrador', 'invitado']]`).

---

### Lección 4: Transaccionalidad y Rollback
- **Operación atómica**: La función `createUsuarioConPedidoTransaccion` utiliza `sequelize.transaction()`. Se ejecutan dos acciones dependientes: (1) crear el usuario y (2) registrar su pedido de bienvenida.
- **Rollback garantizado**: Si la segunda operación falla o si se envía el flag `{ "forzarError": true }`, Sequelize ejecuta inmediatamente `t.rollback()`, asegurando que el usuario creado en el paso 1 sea revertido y no queden datos huérfanos.
- **Evidencia de auditoría**: Las transacciones fallidas se registran automáticamente en el archivo plano `logs/log.txt` con fecha, hora, motivo del error y datos involucrados (cumpliendo la Tarea PLUS de la lección).

---

### Lección 5: Comparación ORM vs SQL Tradicional
- **¿Qué ventajas encontraste usando ORM frente al cliente SQL tradicional?**
  1. **Seguridad contra Inyección SQL**: El ORM parametriza automáticamente todas las consultas.
  2. **Mantenibilidad y Productividad**: No requiere concatenar strings de SQL; los modelos representan directamente las entidades del dominio con validaciones integradas.
  3. **Independencia del Motor de BD**: El mismo código JavaScript funciona sobre SQLite, PostgreSQL, MySQL o MariaDB.
- Se implementó el endpoint `GET /usuarios/comparacion-sql` que ejecuta la misma consulta mediante `User.findAll()` y `sequelize.query()` midiendo tiempos en milisegundos para verificar paridad de resultados.

---

### Lección 6: Relaciones 1:N en el ORM
- Se estableció la relación entre `User` y `Order`:
  ```javascript
  User.hasMany(Order, { foreignKey: 'userId', as: 'pedidos', onDelete: 'CASCADE' });
  Order.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });
  ```
- El endpoint `GET /usuarios/:id/pedidos` utiliza el modificador `include: [{ model: Order, as: 'pedidos' }]` para resolver la consulta de ambas entidades en un solo viaje a la base de datos relacional.

---

## 🔮 Proyección al Módulo #8

Con la capa de datos consolidada, el sistema queda 100% preparado para el siguiente nivel:
1. **Autenticación JWT**: Creación de middleware de autenticación (`verifyToken`) para validar el token Bearer en rutas protegidas.
2. **Subida de Archivos**: Integración de `multer` para permitir a los usuarios subir su foto de perfil a `public/uploads/` con validación de tipo MIME y tamaño máximo.
