# Proyecto: Prepárate para el Mercado Laboral
## Evaluación de Módulo: Desarrollo de Portafolio de un Producto Digital

---

### 📄 Portada
- **Nombre del Proyecto**: Prepárate para el mercado laboral - Portafolio Técnico y Perfil Profesional
- **Postulante**: David
- **Rol al que postula**: Talento Junior Tech (Área: Tecnología | Nivel: Trainee / Junior | Modalidad: Remota)
- **Programa**: Formación Intensiva en Desarrollo Backend (Alkemy / Sence)
- **Repositorio del Proyecto**: [https://github.com/david-tkd203/project-sence](https://github.com/david-tkd203/project-sence)
- **Fecha**: Septiembre 2026

---

## 🏢 1. Investigación de Empresa

### Selección de la Empresa: **Mercado Libre**
Se ha seleccionado a **Mercado Libre** por ser el ecosistema tecnológico y fintech más dinámico e innovador de América Latina, con una cultura de ingeniería orientada a microservicios de alta concurrencia, APIs escalables, autonomía técnica y constante desarrollo de talento junior.

### Justificación Técnica

| Criterio | Análisis Técnico sobre Mercado Libre |
|---|---|
| **Valores y Propósito** | Democratizar el comercio electrónico y los servicios financieros (Mercado Pago) en la región. Destaca su cultura de *"Emprender tomando riesgos"*, *"Dar el máximo con excelencia"* y *"Aprender continuamente de los errores"*. |
| **Tipo de Productos** | Plataforma de E-commerce masiva (alta concurrencia), ecosistema Fintech (Mercado Pago: pasarelas de pago, créditos, inversiones), logística inteligente (Mercado Envíos) y publicidad digital (Mercado Ads). |
| **Tecnologías que Utilizan** | Arquitectura orientada a microservicios distribuidos: **Node.js**, **Go (Golang)**, **Java**, Python. Infraestructura en la nube con **AWS** y **GCP**, orquestación con **Docker** y **Kubernetes**, bases de datos relacionales (MySQL, PostgreSQL) y NoSQL (Redis, ScyllaDB/Cassandra), APIs RESTful y gRPC. |
| **Metodologías de Trabajo** | Marcos ágiles con **Scrum** y **Kanban**, desarrollo guiado por integración y entrega continua (**CI/CD**), filosofía DevOps (*You build it, you run it*), code reviews exhaustivos y diseño de APIs basado en contratos. |
| **Enfoque en Innovación** | Desarrollo constante de modelos de Machine Learning y prevención de fraude en tiempo real, escalabilidad para eventos masivos (CyberDay, Black Friday con millones de peticiones por minuto) y modernización continua del stack tecnológico. |

### 3 Formas Concretas de Aportar Valor a la Organización

1. **Mantenimiento y Evolución Ágil de Endpoints RESTful**:
   - Gracias a mi sólida formación en Node.js, Express y Sequelize, puedo integrarme rápidamente a células de desarrollo para construir, documentar y testear endpoints CRUD, asegurando validaciones de entrada, manejo limpio de errores y consistencia de datos.
2. **Adopción de Buenas Prácticas y Calidad de Código**:
   - Aporto un enfoque riguroso en arquitecturas desacopladas (separación de rutas, controladores y servicios), protegiendo la integridad transaccional (ACID) y securizando servicios mediante autenticación moderna con JWT y hashing de datos sensibles.
3. **Proactividad, Autonomía y Curiosidad por la Nube**:
   - Poseo alta adaptabilidad para documentar procesos técnicos, aprender nuevas tecnologías del stack interno (como contenedores Docker o servicios gestionados de AWS) y colaborar activamente en ceremonias ágiles aportando una mirada fresca y orientada a la mejora continua.

### 3 Preguntas Estratégicas para el Reclutador / Líder Técnico

1. *¿Cómo está estructurado el proceso de onboarding y mentoría para un perfil Junior en los primeros 90 días dentro del equipo de backend?*
2. *Considerando los picos de tráfico masivos como Black Friday o CyberDay, ¿cuáles son los principales desafíos arquitectónicos que actualmente enfrenta el equipo en el diseño de microservicios y persistencia de datos?*
3. *¿Qué oportunidades de crecimiento técnico y exploración de nuevas tecnologías (como Go o herramientas cloud de observabilidad) se promueven dentro de las células de ingeniería?*

---

## 💼 2. Diseño de Sección para el Portafolio Técnico

### Información de Contacto Profesional
- **Nombre**: David
- **Especialidad**: Desarrollador Backend Junior (Node.js / Express / SQL)
- **GitHub**: [github.com/david-tkd203](https://github.com/david-tkd203)
- **Repositorio Central del Curso**: [github.com/david-tkd203/project-sence](https://github.com/david-tkd203/project-sence)
- **Modalidad**: Remota / Híbrida

---

### Proyectos Principales del Portafolio

#### 1. Sistema Backend Integrador: API RESTful, Persistencia Relacional y JWT
- **Tecnologías**: Node.js, Express, Sequelize ORM, SQLite/PostgreSQL, JWT, Multer, Bcryptjs.
- **Descripción**: Arquitectura backend robusta en 5 capas con autenticación tokenizada (Bearer), transacciones con rollback garantizado, relaciones 1:N y gestión de carga de archivos.
- **Enlace**: [Ver en GitHub](https://github.com/david-tkd203/project-sence)

#### 2. Módulo de Transaccionalidad y Auditoría de Datos
- **Tecnologías**: Sequelize Transactions, SQLite, Node.js fs module.
- **Descripción**: Mecanismo de persistencia atómica que asegura la creación dependiente de entidades (Usuario y Pedido) con rollback automático ante excepciones y registro en archivo de log para auditoría.
- **Enlace**: [Ver código en GitHub](https://github.com/david-tkd203/project-sence/blob/main/services/user.service.js)

#### 3. Panel Interactivo de Consumo y Diagnóstico de Endpoints
- **Tecnologías**: HTML5, CSS3 Moderno, Fetch API asíncrono, Express Static.
- **Descripción**: Interfaz web integrada para probar en tiempo real el ciclo de vida de la API: login, almacenamiento dinámico de token JWT, subida multipart de archivos y consulta de relaciones anidadas.
- **Enlace**: [Ver panel web](https://github.com/david-tkd203/project-sence/blob/main/public/index.html)

---

## 🔬 3. Caso de Estudio en Profundidad

### **Título del Caso de Estudio**: *Diseño e Implementación de un Backend Seguro con Transaccionalidad Atómica y Autenticación JWT*

- **Breve descripción de la actividad o tarea**:  
  El objetivo fue evolucionar una aplicación base en Node.js y Express desde un servidor estático hasta una API RESTful profesional, modular y lista para producción, capaz de gestionar relaciones de bases de datos relacionales, proteger operaciones sensibles con transacciones y securizar el acceso a recursos mediante tokens criptográficos.

- **Desafío principal que implicaba**:  
  Garantizar la **integridad referencial y atomicidad de datos** (evitando estados inconsistentes o registros huérfanos cuando fallaba una operación encadenada), junto con la **protección rigurosa de datos sensibles** (ocultamiento de hashes de contraseñas y restricción de endpoints de mutación exclusivamente a usuarios autenticados).

- **Solución propuesta**:  
  1. **Arquitectura en Capas Limpias**: Se desacopló la solución en carpetas especializadas (`routes`, `controllers`, `services`, `models`, `middlewares`), garantizando que la lógica de negocio y base de datos no esté acoplada al transporte HTTP.
  2. **Transacciones Gestionadas con Rollback**: Se implementó `sequelize.transaction()` para la creación atómica de usuarios y pedidos asociados. Si alguna validación o inserción secundaria falla, se revierte el estado (`rollback`) y se emite un log de auditoría en `logs/log.txt`.
  3. **Seguridad Stateless con JWT**: Se protegió el acceso a métodos `POST`, `PUT` y `DELETE` mediante el middleware `verifyToken`, validando la firma y tiempo de expiración (2 horas) en la cabecera `Authorization: Bearer`.
  4. **Subida de Archivos con Multer**: Se implementó un middleware con validación estricta de extensiones de imagen y límite de 2MB, asociando el archivo resultante al avatar del usuario en base de datos.

- **Herramientas técnicas utilizadas**:  
  Node.js (v18+), Express.js, Sequelize ORM, SQLite / PostgreSQL, JWT (`jsonwebtoken`), Bcryptjs, Multer, Git, GitHub.

- **Principales aprendizajes alcanzados**:  
  - Dominio práctico de los principios **ACID** y la importancia del rollback en entornos empresariales.
  - Comprensión profunda del modelo de autenticación sin estado (*stateless*) mediante tokens JWT y hashing irreversible con salt.
  - Manejo de flujo asíncrono en JavaScript (`async/await`) para operaciones de I/O y base de datos.
  - Implementación de buenas prácticas en la estructura y convenciones semánticas de una API RESTful.

- **Métricas de impacto logradas**:  
  - **100% de consistencia de datos**: 0 registros huérfanos generados durante las pruebas de fallo forzado gracias al rollback inmediato.
  - **0% de exposición de datos confidenciales**: Exclusión garantizada de hashes de contraseña en el 100% de las respuestas JSON.
  - **Tiempos de respuesta óptimos**: Consultas con ORM resueltas en menos de 3 ms en entorno local.
  - **100% de cobertura funcional**: Validación completa de los códigos de estado HTTP (200, 201, 400, 401, 403, 404).

- **Habilidades técnicas aplicadas**:  
  Diseño de APIs RESTful, Modelado de datos relacionales (1:N), Seguridad backend (JWT, Hashing), Manejo de excepciones centralizado, Control de versiones con Git (Conventional Commits).

- **Justificación de elección para el portafolio**:  
  Este proyecto sintetiza de forma integral todas las habilidades que busca un equipo de ingeniería en un desarrollador junior: capacidad de estructurar software escalable, resolver problemas de concurrencia y persistencia, y aplicar estándares de seguridad modernos de la industria.

---

## 📊 4. PLUS: Matriz FODA Personal (Talento Junior Tech)

### Análisis Interno

#### 5 Fortalezas:
1. **Sólidas bases en arquitectura modular**: Comprensión clara de la separación de responsabilidades (routes, controllers, services, models) más allá de simplemente escribir código funcional.
2. **Capacidad de aprendizaje acelerado**: Asimilación e implementación efectiva de nuevas herramientas, paquetes y paradigmas en plazos reducidos.
3. **Enfoque en calidad y buenas prácticas**: Rigurosidad en el control de versiones con conventional commits, código autodocumentado y validaciones estrictas de datos.
4. **Pensamiento analítico y resolución de problemas**: Habilidad para aislar errores, depurar excepciones de base de datos y diseñar mecanismos preventivos como el rollback.
5. **Comunicación técnica asertiva**: Capacidad para justificar decisiones de diseño, documentar APIs y colaborar de forma constructiva en equipo.

#### 5 Áreas de Oportunidad (Debilidades):
1. **Experiencia en despliegue cloud a gran escala**: Necesidad de profundizar en servicios cloud gestionados (AWS ECS, Lambda, RDS) y pipelines CI/CD automatizados.
2. **Pruebas unitarias automatizadas avanzadas**: Deseo de consolidar frameworks de testing como Jest, Mocha o Supertest para alcanzar alta cobertura de código automatizada.
3. **Manejo de patrones de microservicios**: Profundizar en colas de mensajería (RabbitMQ, Kafka) y comunicación interservicios (gRPC).
4. **Optimización fina de bases de datos**: Continuar aprendiendo sobre índices compuestos, planes de ejecución de consultas (`EXPLAIN`) y caché distribuido (Redis).
5. **Inglés conversacional para entornos globales**: Fortalecer la fluidez oral para participar con mayor soltura en reuniones técnicas con equipos internacionales.

---

### Análisis Externo

#### 5 Amenazas:
1. **Alta competitividad en el nivel Junior**: Gran cantidad de graduados de bootcamps buscando su primera oportunidad laboral en el sector IT.
2. **Exigencia creciente de experiencia previa**: Ofertas laborales de nivel junior que solicitan conocimientos multidisciplinarios (full stack, cloud, testing).
3. **Evolución rápida de tecnologías y herramientas**: Constante aparición de frameworks y herramientas que requieren actualización continua sin perder el foco en los fundamentos.
4. **Automatización con Inteligencia Artificial**: Aumento de las expectativas respecto a la velocidad y calidad que debe entregar un desarrollador al contar con asistentes de código.
5. **Mercado de contratación fluctuante**: Variaciones en el ritmo de contrataciones en startups y empresas tecnológicas internacionales.

#### 5 Oportunidades:
1. **Demanda de juniors con bases sólidas en Backend**: Diferenciarse del promedio demostrando dominio de persistencia relacional, seguridad (JWT) y arquitecturas limpias.
2. **Auge de la industria Fintech y E-commerce en LATAM**: Expansión sostenida de empresas como Mercado Libre, Nubank y PedidosYa que requieren talento técnico en constante formación.
3. **Crecimiento de metodologías remotas e híbridas**: Posibilidad de postular a vacantes tecnológicas en toda la región sin barreras geográficas.
4. **Comunidades activas y programas de talento**: Espacios de networking, bootcamps corporativos y academias de desarrollo que conectan directamente con empresas líderes.
5. **Adopción de IA como acelerador de productividad**: Aprovechar herramientas de IA para acelerar el aprendizaje, escribir mejores pruebas y documentar código con mayor rapidez y precisión.

---

## 🎯 5. Presentación Profesional y Optimización de Perfil

### Elevator Pitch (30-60 segundos)
> *"Hola, soy David, Desarrollador Backend Junior apasionado por construir soluciones web escalables, seguras y bien estructuradas con Node.js y bases de datos relacionales. Recientemente culminé el desarrollo de una API RESTful integral que incorpora persistencia con Sequelize, control transaccional con rollback automático y autenticación mediante JWT. Me destaco por mi curiosidad técnica, mi compromiso con las buenas prácticas de arquitectura y mi enfoque en resolver problemas con calidad y consistencia. Estoy listo para integrarme a un equipo dinámico donde pueda aportar valor inmediato en la creación y mantenimiento de servicios backend, mientras continúo expandiendo mis habilidades en tecnologías cloud y microservicios."*

### Resumen para Perfil de LinkedIn
```text
🚀 Desarrollador Backend Junior | Node.js • Express • Sequelize ORM • SQL • APIs RESTful • JWT

Apasionado por la ingeniería de software y el desarrollo de arquitecturas backend limpias, eficientes y seguras. Cuento con formación intensiva en el desarrollo de servicios web con Node.js y Express, modelado de bases de datos relacionales con Sequelize y securización de endpoints mediante autenticación tokenizada (JWT) y carga de archivos con Multer.

🛠️ Stack Técnico:
• Lenguajes & Entornos: JavaScript (ES6+), Node.js.
• Frameworks & Librerías: Express.js, Sequelize ORM, Multer, JSON Web Tokens (JWT), Bcryptjs, Dotenv.
• Bases de Datos: SQLite, PostgreSQL, MySQL.
• Herramientas & Prácticas: Git, GitHub, Conventional Commits, Postman, Arquitectura en Capas, Metodologías Ágiles (Scrum).

💡 Busco mi primera oportunidad como Talento Junior Tech para aportar valor en la construcción de APIs robustas, colaborar en equipos interdisciplinarios y seguir creciendo en el ecosistema cloud.
```
