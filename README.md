# Raíces SV 🇸🇻

**Raíces SV** es una plataforma web moderna, interactiva e integral dedicada a la preservación, exploración y celebración de la cultura de El Salvador: historia prehispánica y contemporánea, gastronomía tradicional, leyendas y mitología popular, sitios arqueológicos y culturales, directorio y calendario de eventos, mapa georreferenciado interactivo, comunidad ciudadana de publicaciones, minijuegos culturales con motor de física, quiz gamificado con más de 448 preguntas, asistente de inteligencia artificial especializado y un panel de administración con moderación de usuarios y apelaciones.

El proyecto está construido en **Node.js con Express** bajo el patrón de **Arquitectura en Capas (Layered Architecture)**, garantizando una clara separación de responsabilidades entre presentación, enrutamiento, middlewares, lógica de negocio y acceso a datos.

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Vistas y Módulos de la Plataforma](#-vistas-y-módulos-de-la-plataforma)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Modelo de Base de Datos](#-modelo-de-base-de-datos)
- [Endpoints y Rutas de la API](#-endpoints-y-rutas-de-la-api)
- [Seguridad](#-seguridad)
- [Sistema de Diseño e Internacionalización](#-sistema-de-diseño-e-internacionalización)
- [Licencia](#-licencia)

---

## 🌟 Características Principales

1. **🏛️ Exploración Cultural Completa**:
   - **Historia**: Línea de tiempo interactiva desde el periodo prehispánico Pipil hasta la actualidad con modales informativos.
   - **Gastronomía y Recetas**: Catálogo culinario con ingredientes, pasos de preparación, tiempos y videos demostrativos.
   - **Leyendas Tradicionales**: Biblioteca de mitos y folclore cuscatleco (El Cipitío, La Siguanaba, El Cadejo, etc.).
   - **Sitios Culturales**: Información detallada de sitios arqueológicos (Tazumal, Joya de Cerén, San Andrés), teatros, museos y parques.
   - **Eventos y Calendario**: Agenda interactiva filtrable por mes, departamento y tipo de festividad con transiciones GSAP.

2. **🗺️ Mapa Interactivo y Geolocalización**:
   - Mapa de El Salvador con marcadores georreferenciados para sitios culturales, eventos, gastronomía y publicaciones ciudadanas.
   - Selector interactivo de ubicación (`location-picker.js`) para asociar coordenadas geográficas a nuevas publicaciones.

3. **🎯 Quiz Cultural Gamificado**:
   - Más de 448 preguntas categorizadas en 4 niveles de dificultad: *Fácil*, *Medio*, *Difícil* y el especial *100% Guanaco*.
   - Asistente de configuración en 3 pasos con *stepper* interactivo.
   - Sistema de rachas y combos en tiempo real con indicador de fuego (`🔥`).
   - Burbujas flotantes de puntaje (`+5`, `+10`, `+20 pts`) y animaciones 3D de tarjetas con GSAP.
   - Pantalla de resultados con trofeo animado, cálculo de porcentajes, confeti patriótico y persistencia en base de datos.

4. **🎮 Minijuegos Culturales**:
   - Juegos interactivos implementados con el motor de física 2D **Matter.js** y controles adaptados para dispositivos móviles y escritorio.

5. **📸 Comunidad y Publicaciones**:
   - Muro comunitario donde los usuarios pueden compartir experiencias, fotos, descripciones y ubicaciones.
   - Sistema de comentarios en publicaciones.

6. **🤖 Asistente de IA Cultural (Chatbot)**:
   - Chatbot inteligente integrado con OpenRouter (o proveedores compatibles) para responder dudas históricas y culturales sobre El Salvador.

7. **🛡️ Autenticación y Perfil de Usuario**:
   - Registro e inicio de sesión local (correo y contraseña hasheada con `bcrypt`).
   - Autenticación OAuth 2.0 con **Google** mediante Passport.js.
   - Recuperación de contraseña segura vía correo electrónico (SMTP con tokens SHA-256 temporales).
   - Gestión de perfil: edición de información personal, biografía y avatar (local vía Multer o sincronizado con Google).

8. **👑 Panel de Administración y Moderación**:
   - Dashboard con métricas globales en tiempo real.
   - Gestión de usuarios y asignación de roles (`Fundador`, `Admin`, `Usuario`).
   - Sistema de suspensión temporal/permanente con registro de motivos.
   - Sistema de invitaciones para nuevos administradores mediante tokens con expiración.
   - Bandeja de revisión de apelaciones para cuentas suspendidas (`apelar.html`).

9. **🌐 Internacionalización (i18n) y Modo Oscuro/Claro**:
   - Soporte bilingüe completo (**Español** e **Inglés**) en tiempo real sin recargar la página.
   - Selector de temas (Oscuro con azul añil / Claro con dorado cálido) con persistencia en `localStorage`.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una **Arquitectura en Capas (Layered Architecture)** que desacopla la lógica de presentación, las reglas de negocio y la persistencia de datos:

| Capa | Ubicación | Responsabilidad |
|---|---|---|
| **Presentación** | `presentation/` | Vistas HTML, hojas de estilo CSS modulares, scripts de interacción en cliente y recursos multimedia. |
| **Enrutamiento** | `routes/` | Declaración de endpoints REST y vinculación de controladores con middlewares. |
| **Middlewares** | `middleware/` | Control de acceso, guardias de sesión, cabeceras de seguridad HTTP, rate limiting y subida de archivos. |
| **Negocio** | `business/` | Lógica central de la aplicación: autenticación, validación de datos, perfil, publicaciones, puntajes y administración. |
| **Datos** | `data/` | Configuración de conexión MySQL, repositorios de base de datos, servicio de correo SMTP y proxy de IA. |

---

## 📁 Estructura del Proyecto

```
RaicesSV/
├── server.js                          # Punto de entrada principal Express y configuración de túneles
├── package.json                       # Dependencias y scripts del proyecto
├── .env.example                       # Plantilla de variables de entorno
│
├── presentation/                      # CAPA DE PRESENTACIÓN
│   ├── views/                         # Vistas HTML servidas por el backend
│   │   ├── index.html                 # Página de inicio con animaciones y bento grid
│   │   ├── categorias.html            # Catálogo general de categorías culturales
│   │   ├── historia.html              # Línea de tiempo histórica interactiva
│   │   ├── gastronomia.html           # Especialidades gastronómicas de El Salvador
│   │   ├── recetas.html               # Recetario tradicional paso a paso
│   │   ├── leyendas.html              # Biblioteca de mitología y leyendas
│   │   ├── sitios-culturales.html     # Directorio de sitios arqueológicos y turísticos
│   │   ├── eventos.html               # Fiestas patronales y festivales
│   │   ├── calendario.html            # Calendario interactivo de eventos
│   │   ├── mapa.html                  # Mapa georreferenciado de El Salvador
│   │   ├── quiz.html                  # Quiz cultural gamificado (448+ preguntas)
│   │   ├── juegos.html                # Minijuegos con física interactiva
│   │   ├── publicaciones.html         # Muro de publicaciones ciudadanas y fotos
│   │   ├── perfil.html                # Configuración de cuenta y perfil de usuario
│   │   ├── admin.html                 # Panel de administración y moderación
│   │   ├── aceptar-invitacion.html    # Aceptación de invitación de rol administrativo
│   │   ├── apelar.html                # Formulario de apelación de suspensión de cuenta
│   │   ├── login.html                 # Inicio de sesión local y Google OAuth
│   │   ├── registro.html              # Registro de nuevas cuentas
│   │   ├── recuperar.html             # Solicitud de restablecimiento de contraseña
│   │   ├── restablecer.html           # Cambio de contraseña con token de un solo uso
│   │   └── 404.html                   # Página personalizada de error 404
│   │
│   └── assets/                        # Recursos estáticos
│       ├── css/                       # Hojas de estilo modulares por página + globales
│       │   ├── global.css             # Variables CSS, reset y diseño base
│       │   ├── info-shared.css        # Estilos comunes para páginas de contenido
│       │   ├── index.css              # Estilos y efectos de la página principal
│       │   ├── quiz.css               # Estilos del quiz, stepper y animaciones
│       │   └── ...                    # Estilos específicos para cada vista
│       ├── js/                        # Scripts cliente y controladores de UI
│       │   ├── i18n.js                # Sistema de traducción bilingüe (ES / EN)
│       │   ├── index-gsap.js          # Animaciones GSAP de inicio (partículas, 3D tilt, marquee)
│       │   ├── quiz.js                # Lógica del quiz, preguntas, racha y resultados
│       │   ├── quiz-waves.js          # Ondas animadas de fondo en quiz
│       │   ├── chatbot.js             # Widget y cliente del asistente de IA
│       │   ├── mapa.js & mapa-gsap.js # Lógica y animaciones del mapa interactivo
│       │   ├── juegos.js              # Motor de física y lógica de minijuegos (Matter.js)
│       │   ├── theme-blobs.js         # Manejo de tema claro/oscuro y efectos ambientales
│       │   ├── script.js              # Navegación, drawer móvil y utilidades globales
│       │   └── ...                    # Controladores por cada página
│       ├── media/                     # Fotografías, vectores e isotipos
│       └── favicon/                   # Favicons en múltiples resoluciones
│
├── routes/                            # CAPA DE ENRUTAMIENTO
│   ├── auth.routes.js                 # Rutas de autenticación, OAuth y recuperación
│   ├── admin.routes.js                # Rutas del panel de administración
│   ├── publications.routes.js         # Rutas de gestión de publicaciones y fotos
│   ├── profile.routes.js              # Rutas de perfil de usuario y avatares
│   ├── scores.routes.js               # Rutas de puntuaciones del quiz
│   └── chat.routes.js                 # Proxy seguro hacia el asistente de IA
│
├── middleware/                        # MIDDLEWARES TRANSVERSALES
│   ├── auth.protectedRoutes.js        # Protección de vistas HTML por sesión y rol
│   ├── auth.apiGuard.js               # Protección de endpoints API (401 Unauthorized)
│   ├── security.middleware.js         # Headers de seguridad, mitigación CSRF y rate limit
│   └── upload.middleware.js           # Subida de imágenes con Multer (avatares y posts)
│
├── business/                          # CAPA DE LÓGICA DE NEGOCIO
│   ├── auth.server.js                 # Métodos centrales de autenticación
│   ├── auth.login.js / register.js    # Controladores de inicio de sesión y registro
│   ├── auth.google.js                 # Callback y sincronización de Google OAuth
│   ├── auth.forgotPassword.js         # Generación y envío de tokens de recuperación
│   ├── auth.resetPassword.js          # Validación de token y cambio de contraseña
│   ├── admin.server.js                # Métodos de moderación, roles e invitaciones
│   ├── profile.get.js / update.js     # Consulta y actualización de datos de usuario
│   ├── profile.avatar.js / delete.js  # Gestión de fotos de perfil y baja de cuenta
│   ├── publication.server.js          # Lógica central de publicaciones
│   ├── publication.create.js / list.js# Creación, listado y filtrado de publicaciones
│   ├── publication.update.js / delete.js # Edición y eliminación de publicaciones
│   └── scores.business.js             # Guardado y consulta de récords del quiz
│
└── data/                              # CAPA DE DATOS E INFRAESTRUCTURA
    ├── config/
    │   ├── database.config.js         # Conexión a MySQL2 con soporte de migraciones
    │   ├── passport.config.js         # Configuración de Google OAuth 2.0
    │   ├── mailer.config.js           # Transporte SMTP con Nodemailer
    │   └── emailVerifier.config.js    # Verificación de dominios MX para correos
    ├── repositories/
    │   ├── user.repository.js         # Operaciones SQL sobre la tabla `users`
    │   ├── admin.repository.js        # Operaciones SQL de administración y suspensiones
    │   └── publication.repository.js  # Operaciones SQL de publicaciones y comentarios
    ├── api/
    │   └── chat-proxy.js              # Conector HTTP hacia la API de OpenRouter
    └── database/
        └── raicessv.sql               # Esquema de tablas e inicialización de datos
```

---

## 💻 Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución en servidor.
- **Express 5**: Framework web y arquitectura REST.
- **express-session & express-mysql-session**: Persistencia y firma de sesiones en MySQL.
- **Passport.js & passport-google-oauth20**: Autenticación federada con Google.
- **bcrypt**: Encriptación y hashing seguro de contraseñas.
- **MySQL2**: Driver de alto rendimiento para MySQL con soporte de promesas.
- **Multer**: Middleware para subida y procesamiento de imágenes.
- **Nodemailer**: Envío de correos transaccionales por protocolo SMTP.
- **Cloudflared, untun y @ngrok/ngrok**: Soporte para túneles de desarrollo y exposición local.

### Frontend
- **HTML5 semántico, CSS3 moderno y Vanilla JavaScript**: Rendimiento nativo sin sobrecarga de frameworks.
- **GSAP 3.12+ (GreenSock) & ScrollTrigger**: Animaciones fluidas, efectos 3D, partículas temáticas y contadores cinéticos.
- **Matter.js**: Motor de física 2D para la sección de juegos interactivos.
- **Leaflet.js**: Renderizado y manipulación del mapa cultural georreferenciado.

---

## 📋 Requisitos Previos

- **Node.js**: Versión 18.0.0 o superior instalada.
- **MySQL Server**: Versión 8.0 o superior.
- **NPM**: Gestor de paquetes incluido con Node.js.
- **Cuenta de OpenRouter** *(opcional)*: Para habilitar el asistente de IA.
- **Credenciales de Google Cloud Console** *(opcional)*: Para habilitar el inicio de sesión con Google.
- **Servidor SMTP** *(opcional)*: Para el envío de correos de recuperación de contraseña (e.g. Gmail, Mailtrap o Sendgrid).

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/OrlandoH009/RaicesSV.git
   cd RaicesSV
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la base de datos MySQL**:
   Crea la base de datos e importa el script SQL:
   ```bash
   mysql -u root -p < data/database/raicessv.sql
   ```

4. **Configurar las variables de entorno**:
   Crea tu archivo `.env` a partir del ejemplo:
   ```bash
   cp .env.example .env
   ```
   Edita los valores en `.env` con tus credenciales de base de datos y servicios.

5. **Iniciar el servidor**:
   ```bash
   node server.js
   ```
   El servidor estará disponible en `http://localhost:3000`.

---

## 🔐 Variables de Entorno

| Variable | Tipo | Descripción |
|---|---|---|
| `PORT` | Numérico | Puerto de escucha del servidor (por defecto: `3000`). |
| `NODE_ENV` | String | Modo de ejecución (`development` o `production`). |
| `SESSION_SECRET` | String | Clave secreta para firmar las cookies de sesión. |
| `DB_HOST` | String | Host del servidor MySQL (e.g., `localhost` o `127.0.0.1`). |
| `DB_PORT` | Numérico | Puerto de conexión a MySQL (por defecto: `3306`). |
| `DB_USER` | String | Usuario de MySQL. |
| `DB_PASSWORD` | String | Contraseña de MySQL. |
| `DB_NAME` | String | Nombre de la base de datos (`raicessv`). |
| `OPENROUTER_API_KEY` | String | API Key de OpenRouter para el chatbot con IA. |
| `GOOGLE_CLIENT_ID` | String | Client ID obtenido en Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | String | Client Secret obtenido en Google Cloud Console. |
| `GOOGLE_CALLBACK_URL` | String | URL de retorno de OAuth (e.g., `/auth/google/callback`). |
| `SMTP_HOST` | String | Servidor SMTP para envío de correos (e.g., `smtp.gmail.com`). |
| `SMTP_PORT` | Numérico | Puerto del servidor SMTP (`465` o `587`). |
| `SMTP_SECURE` | Booleano | `true` para TLS/SSL directo, `false` para STARTTLS. |
| `SMTP_USER` | String | Usuario o correo del servidor SMTP. |
| `SMTP_PASS` | String | Contraseña o App Password del servidor SMTP. |
| `MAIL_FROM` | String | Remitente visible en los correos de recuperación. |
| `NGROK_ENABLED` | Booleano | Activar túnel de Ngrok en desarrollo (`true`/`false`). |
| `NGROK_AUTHTOKEN` | String | Token de autenticación de Ngrok. |

---

## 🗄️ Modelo de Base de Datos

El esquema relacional incluye las siguientes tablas clave:

- **`rols`**: Define los niveles de acceso (`Fundador`, `Admin`, `Usuario`).
- **`user_status`**: Estados de cuenta (`Activo`, `Suspendido`).
- **`users`**: Datos de usuarios locales y federados (Google ID, avatar, biografía, contraseña hasheada).
- **`properties` / `publications`**: Publicaciones culturales y sitios turísticos registrados por la comunidad.
- **`coments`**: Comentarios asociados a publicaciones culturales.
- **`scores`**: Registro histórico de puntajes obtenidos en el Quiz cultural por usuario, categoría y nivel.
- **`password_resets`**: Tokens SHA-256 de recuperación de contraseña con expiración.
- **`admin_invitations`**: Invitaciones generadas por administradores para promover nuevos miembros del equipo.
- **`user_suspensions`**: Historial y motivos de suspensiones aplicadas a usuarios.
- **`appeals`**: Solicitudes de apelación enviadas por usuarios sancionados.

---

## 🛣️ Endpoints y Rutas de la API

### 🔑 Autenticación (`routes/auth.routes.js`)
- `POST /register` — Registro de nuevo usuario.
- `POST /login` — Inicio de sesión con correo y contraseña.
- `POST /logout` — Cierre de sesión y destrucción de sesión.
- `GET /auth/status` — Consulta del estado de autenticación actual.
- `GET /auth/google` — Inicio de flujo de autenticación con Google.
- `GET /auth/google/callback` — Retorno del proveedor OAuth de Google.
- `POST /forgot-password` — Solicitud de correo para restablecimiento de contraseña.
- `POST /reset-password` — Validación de token y cambio definitivo de contraseña.

### 👤 Perfil (`routes/profile.routes.js`)
- `GET /api/profile` — Obtiene los datos del perfil en sesión.
- `PUT /api/profile` — Actualiza nombre, descripción y datos personales.
- `POST /api/profile/avatar` — Sube una foto de avatar personalizada (Multer).
- `POST /api/profile/avatar/google` — Sincroniza la foto de perfil con la cuenta de Google.
- `DELETE /api/profile` — Elimina permanentemente la cuenta de usuario.

### 📝 Publicaciones (`routes/publications.routes.js`)
- `GET /api/publications` — Listado de publicaciones culturales con filtros y paginación.
- `POST /api/publications` — Creación de una nueva publicación con imagen y coordenadas.
- `PUT /api/publications/:id` — Edición de una publicación propia.
- `DELETE /api/publications/:id` — Eliminación de una publicación.

### 🏆 Puntuaciones del Quiz (`routes/scores.routes.js`)
- `POST /api/scores` — Guarda el puntaje obtenido al finalizar el quiz.
- `GET /api/scores/best` — Consulta el récord histórico del usuario según nivel y categoría.

### 🛡️ Panel de Administración (`routes/admin.routes.js`)
- `GET /api/admin/metrics` — Estadísticas generales de la plataforma.
- `GET /api/admin/users` — Listado de usuarios registrados.
- `POST /api/admin/users/:id/role` — Actualización de rol de usuario.
- `POST /api/admin/users/:id/suspend` — Suspensión de cuenta de usuario con motivo.
- `POST /api/admin/users/:id/unsuspend` — Reactivación de cuenta suspendida.
- `POST /api/admin/invitations` — Creación de token de invitación para nuevo administrador.
- `GET /api/admin/appeals` — Listado de apelaciones enviadas por usuarios.
- `POST /api/admin/appeals/:id/resolve` — Resolución o rechazo de una apelación.

### 🤖 Asistente Virtual (`routes/chat.routes.js`)
- `POST /chat-proxy` — Envío de mensajes al modelo de inteligencia artificial cultural.

---

## 🛡️ Seguridad

- **Protección contra Fuerza Bruta**: Rate limiting en memoria para `/login`, `/register`, `/forgot-password` y endpoints sensibles.
- **Protección CSRF**: Validación estricta de cabeceras `Origin` y `Referer` en todas las peticiones de mutación (`POST`, `PUT`, `DELETE`).
- **Cabeceras HTTP de Seguridad**: Inyección de `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` y `Permissions-Policy`.
- **Almacenamiento de Contraseñas**: Cifrado irreversible mediante `bcrypt` con factor de coste de trabajo seguro.
- **Cookies de Sesión Seguras**: Cookies marcadas como `httpOnly`, con `sameSite: 'lax'` y `secure: true` automático en entornos de producción.
- **Protección de Enumeración de Usuarios**: Respuestas indistinguibles en solicitudes de recuperación de contraseña.
- **Acceso Controlado a Vistas**: Los archivos `.html` se encuentran fuera de directorios de servicio estático público y son servidos exclusivamente tras pasar por los middlewares de autorización.

---

## 🎨 Sistema de Diseño e Internacionalización

### Paleta de Colores Cultural
```css
--navy:       #113068;   /* Azul añil tradicional salvadoreño */
--gold:       #be8e56;   /* Dorado ornamental de orfebrería y glifos */
--gold-hover: #c9a03a;   /* Acento dorado brillante */
--black:      #0b1220;   /* Fondo oscuro noche volcánica */
--white:      #ffffff;   /* Texto principal y contrastes */
--ember:      #f2794f;   /* Naranja fuego de atardecer y volcán */
```

### Tipografía
- **Playfair Display**: Títulos principales, encabezados de tarjetas y logotipos.
- **Lato**: Textos de lectura, cuerpos de artículos, datos técnicos y formularios.

### Internacionalización (i18n)
La plataforma implementa un motor bilingüe dinámico (`assets/js/i18n.js`):
- Traducción instantánea de etiquetas mediante `[data-i18n="clave"]`.
- Traducción de atributos HTML mediante `[data-i18n-attr="atributo:clave"]`.
- Detección automática del idioma preferido del navegador y almacenamiento de la selección en `localStorage`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Consulta el archivo `package.json` para más detalles.

---

Desarrollado con orgullo y pasión por la cultura de **El Salvador** 🇸🇻.