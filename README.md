# Raíces SV

Plataforma web dedicada a la difusión de la cultura salvadoreña: historia, gastronomía, leyendas, sitios culturales, eventos, un mapa interactivo, quizzes y juegos. Incluye autenticación de usuarios (correo/contraseña y Google), gestión de perfil y un asistente de chat cultural.

El proyecto está construido en Node.js con Express y sigue el patrón de **Arquitectura en Capas (Layered Architecture)**, separando presentación, lógica de negocio y acceso a datos en módulos independientes.

---

## Tabla de contenidos

- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Modelo de datos](#modelo-de-datos)
- [Rutas principales](#rutas-principales)
- [Seguridad](#seguridad)
- [Sistema de diseño](#sistema-de-diseño)

---

## Arquitectura

El código se organiza en tres capas con responsabilidades bien delimitadas, más un directorio de rutas y otro de middlewares que las conectan.

| Capa | Directorio | Responsabilidad |
|---|---|---|
| Presentación | `presentation/` | Vistas HTML, hojas de estilo y scripts de cliente. No contiene lógica de negocio. |
| Rutas | `routes/` | Definición de endpoints Express y conexión hacia la capa de negocio. |
| Middleware | `middleware/` | Autenticación, autorización, seguridad HTTP y subida de archivos. |
| Negocio | `business/` | Reglas de la aplicación: autenticación, gestión de perfil, validaciones. |
| Datos | `data/` | Configuración de infraestructura, acceso a base de datos y proxy externo. |

Flujo típico de una petición: `server.js` → `routes/` → `middleware/` (si aplica) → `business/` → `data/repositories/` → base de datos.

## Estructura del proyecto

```
RaicesSV/
├── server.js                        Punto de entrada. Configura Express, sesiones,
│                                     seguridad y registra vistas y rutas.
│
├── presentation/                    CAPA DE PRESENTACIÓN
│   ├── views/                       Vistas HTML servidas por el servidor
│   │   ├── index.html               Página de inicio
│   │   ├── categorias.html          Categorías culturales
│   │   ├── historia.html            Historia de El Salvador
│   │   ├── gastronomia.html         Gastronomía salvadoreña
│   │   ├── recetas.html             Recetario
│   │   ├── leyendas.html            Leyendas y tradiciones
│   │   ├── eventos.html             Eventos culturales
│   │   ├── calendario.html          Calendario de eventos
│   │   ├── sitios-culturales.html   Sitios culturales
│   │   ├── mapa.html                Mapa interactivo
│   │   ├── quiz.html                Quiz cultural
│   │   ├── juegos.html              Juegos interactivos
│   │   ├── publicaciones.html       Publicaciones de la comunidad
│   │   ├── perfil.html              Perfil de usuario
│   │   ├── login.html               Inicio de sesión
│   │   ├── registro.html            Registro de usuario
│   │   ├── recuperar.html           Solicitud de recuperación de contraseña
│   │   └── restablecer.html         Restablecimiento de contraseña
│   │
│   └── assets/                      Recursos estáticos servidos en /assets
│       ├── css/                     Un archivo de estilos por vista + globales
│       │   ├── global.css           Variables, reset y estilos base
│       │   └── info-shared.css      Estilos compartidos entre páginas informativas
│       ├── js/                      Scripts de comportamiento de cada vista
│       │   ├── script.js            Navbar, drawer y scroll reveal (global)
│       │   ├── chatbot.js           Cliente del asistente de chat cultural
│       │   └── ...                  Un script por vista (calendario, mapa, quiz, etc.)
│       ├── media/                   Imágenes, íconos y audio
│       └── favicon/                 Íconos de la aplicación
│
├── routes/                          Definición de endpoints Express
│   ├── auth.routes.js                /login, /register, recuperación de contraseña,
│   │                                  OAuth de Google
│   ├── chat.routes.js                /chat-proxy, proxy hacia el asistente de IA
│   └── profile.routes.js             /api/profile (consulta, edición, avatar, borrado)
│
├── middleware/                      Middlewares transversales
│   ├── auth.protectedRoutes.js       Protege vistas HTML: sin sesión, redirige a login
│   ├── auth.apiGuard.js              Protege endpoints de API: sin sesión, responde 401
│   ├── security.middleware.js        Cabeceras de seguridad, rate limiting y verificación
│   │                                  de origen (mitigación CSRF)
│   └── upload.middleware.js          Configuración de Multer para avatares
│
├── business/                        CAPA DE NEGOCIO
│   ├── auth.server.js                 Lógica central: login, registro, recuperación de
│   │                                  contraseña, perfil, integración con Google
│   ├── auth.login.js                 Controlador de inicio de sesión
│   ├── auth.register.js              Controlador de registro
│   ├── auth.google.js                Controlador del callback de OAuth de Google
│   ├── auth.forgotPassword.js        Controlador de solicitud de recuperación
│   ├── auth.resetPassword.js         Controlador de restablecimiento de contraseña
│   ├── profile.get.js                Consulta de perfil
│   ├── profile.update.js             Actualización de perfil
│   ├── profile.delete.js             Eliminación de cuenta
│   └── profile.avatar.js             Subida de avatar local y sincronización con Google
│
└── data/                            CAPA DE DATOS
    ├── config/
    │   ├── database.config.js        Conexión a MySQL y migraciones ligeras de columnas
    │   ├── passport.config.js        Estrategia de autenticación con Google
    │   ├── mailer.config.js          Configuración de envío de correo (Nodemailer/SMTP)
    │   └── emailVerifier.config.js   Verificación de dominios de correo por registros MX
    ├── repositories/
    │   └── user.repository.js        Acceso a la tabla de usuarios
    ├── api/
    │   └── chat-proxy.js              Proxy hacia el proveedor de IA para el chatbot
    └── database/
        └── raicessv.sql               Script de creación e inicialización de la base de datos
```

## Tecnologías

**Backend**
- Node.js con Express 5
- express-session para manejo de sesiones
- Passport + passport-google-oauth20 para autenticación con Google
- bcrypt para hash de contraseñas
- MySQL2 como driver de base de datos
- Multer para carga de archivos
- Nodemailer para envío de correos (recuperación de contraseña)
- ngrok para exponer el servidor local durante desarrollo

**Frontend**
- HTML, CSS y JavaScript sin framework
- GSAP para animaciones
- Matter.js para la física de los juegos interactivos

**Desarrollo**
- TypeScript y @types/node (herramientas de tipado, sin migración completa del código)
- dotenv para variables de entorno

## Requisitos previos

- Node.js 18 o superior
- MySQL 8 o superior
- Una cuenta de OpenRouter (u otro proveedor compatible) si se desea usar el chat con IA
- Credenciales OAuth de Google si se desea usar el inicio de sesión con Google

## Instalación

```bash
git clone https://github.com/OrlandoH009/RaicesSV.git
cd RaicesSV
npm install
```

Crear la base de datos ejecutando el script SQL incluido:

```bash
mysql -u root -p < data/database/raicessv.sql
```

Copiar el archivo de variables de entorno de ejemplo y completarlo:

```bash
cp .env.example .env
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Conexión a MySQL |
| `PORT` | Puerto del servidor (por defecto 3000) |
| `SESSION_SECRET` | Secreto de firma de sesión. Obligatorio en producción |
| `NODE_ENV` | `production` activa cookies seguras y exige `SESSION_SECRET` |
| `OPENROUTER_API_KEY` | Clave para el proxy de chat con IA |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Credenciales de OAuth de Google |
| `NGROK_AUTHTOKEN`, `NGROK_ENABLED` | Exposición del servidor local vía ngrok |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | Envío de correos de recuperación de contraseña |

## Ejecución

```bash
node server.js
```

El servidor queda disponible en `http://localhost:3000` (o el puerto configurado en `PORT`).

## Modelo de datos

Tablas principales definidas en `data/database/raicessv.sql`:

- `rols` — roles de usuario
- `users` — cuentas de usuario, incluye credenciales locales y datos de OAuth de Google
- `properties` — sitios o publicaciones culturales
- `coments` — comentarios de usuarios sobre publicaciones
- `scores` — puntuaciones de quizzes por usuario
- `password_resets` — tokens de recuperación de contraseña con expiración

## Rutas principales

**Vistas públicas**
- `GET /`, `/index` — página de inicio
- `GET /login.html`, `/registro.html`, `/recuperar.html`, `/restablecer.html`
- `GET /categorias.html`, `/publicaciones.html`

**Vistas protegidas** (requieren sesión iniciada)
- `mapa`, `calendario`, `eventos`, `gastronomia`, `historia`, `leyendas`, `quiz`, `recetas`, `sitios-culturales`, `juegos`, `perfil`

**Autenticación** (`routes/auth.routes.js`)
- `POST /login`
- `POST /register`
- `POST /forgot-password`
- `POST /reset-password`
- `GET /auth/google`, `GET /auth/google/callback`
- `POST /logout`
- `GET /auth/status`

**Perfil** (`routes/profile.routes.js`, requiere autenticación)
- `GET /api/profile`
- `PUT /api/profile`
- `DELETE /api/profile`
- `POST /api/profile/avatar`
- `POST /api/profile/avatar/google`

**Chat** (`routes/chat.routes.js`)
- `POST /chat-proxy` — proxy hacia el proveedor de IA

**Utilidad**
- `GET /estado` — estado del servidor

## Seguridad

- Cabeceras HTTP de protección básica (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- Rate limiting en memoria para `/login`, `/register`, `/forgot-password` y `/logout`
- Verificación de `Origin`/`Referer` en peticiones de escritura como mitigación de CSRF
- Cookies de sesión `httpOnly`, con `secure` activado en producción
- Contraseñas almacenadas con bcrypt
- Tokens de recuperación de contraseña con hash SHA-256 y expiración
- Respuestas genéricas en recuperación de contraseña para evitar enumeración de usuarios
- Las vistas HTML nunca se sirven como estáticos; solo se exponen mediante rutas controladas por el servidor

## Sistema de diseño

**Colores**
```css
--color-navy:  #113068   /* Navbar */
--color-gold:  #be8e56   /* Botones y llamadas a la acción */
--color-cream: #e5eaff   /* Tarjetas informativas */
--color-black: #000000   /* Fondo general */
--color-white: #ffffff   /* Texto */
```

**Tipografía**
- Playfair Display — títulos, navbar, etiquetas
- Lato — cuerpo de texto y descripciones

**Responsive**
- Escritorio: navegación horizontal, disposición en cuadrícula de dos columnas
- Móvil (menor a 768px): menú tipo drawer lateral, disposición en una columna