# Raíces SV — Arquitectura de Capas

Plataforma web de cultura salvadoreña organizada bajo el patrón de **Arquitectura en Capas (Layered Architecture)**, separando responsabilidades en tres niveles bien definidos.

---

## Estructura del Proyecto

```
RaicesSV/
│
├── presentation/                   ← CAPA DE PRESENTACIÓN
│   ├── views/                      ← Vistas (páginas HTML/PHP)
│   │   ├── index.html              ← Página de inicio
│   │   ├── categorias.html         ← Categorías culturales
│   │   ├── historia.html           ← Historia de El Salvador
│   │   ├── gastronomia.html        ← Gastronomía salvadoreña
│   │   ├── leyendas.html           ← Leyendas y tradiciones
│   │   ├── eventos.html            ← Eventos culturales
│   │   ├── sitios-culturales.html  ← Sitios culturales
│   │   ├── mapa.html               ← Mapa interactivo
│   │   ├── quiz.html               ← Quiz cultural
│   │   ├── login.html              ← Inicio de sesión
│   │   └── registro.php            ← Formulario de registro
│   │
│   └── assets/                     ← Recursos estáticos de la vista
│       ├── css/                    ← Estilos por página + globales
│       │   ├── global.css          ← Variables, reset y estilos base
│       │   ├── index.css
│       │   ├── categorias.css
│       │   ├── info.css
│       │   ├── info-shared.css     ← Estilos compartidos de páginas info
│       │   ├── historia.css
│       │   ├── gastronomia.css
│       │   ├── leyendas.css
│       │   ├── eventos.css
│       │   ├── sitios-culturales.css
│       │   ├── mapa.css
│       │   ├── quiz.css
│       │   ├── login.css
│       │   └── registro.css
│       │
│       ├── js/                     ← Scripts de comportamiento UI
│       │   ├── script.js           ← Navbar, drawer, scroll reveal (global)
│       │   ├── tabs.js             ← Lógica de tabs en páginas informativas
│       │   └── quiz.js             ← Motor del quiz interactivo
│       │
│       ├── media/                  ← Imágenes y recursos visuales
│       └── favicon/                ← Íconos de la aplicación
│
├── business/                       ← CAPA DE NEGOCIO (Lógica de aplicación)
│   ├── auth.login.js               ← Lógica de autenticación / inicio de sesión
│   └── auth.register.js            ← Lógica de validación y registro de usuarios
│
└── data/                           ← CAPA DE DATOS
    ├── config/
    │   ├── database.config.php     ← Configuración de conexión a la base de datos
    │   └── session.config.php      ← Inicialización de sesión PHP
    └── database/
        └── raicessv.sql            ← Script de creación e inicialización de la BD
```

---

## Descripción de Capas

### `presentation/` — Capa de Presentación
Todo lo que el usuario ve e interactúa directamente. Contiene las vistas HTML/PHP, los estilos CSS y los scripts de comportamiento visual (animaciones, menú, tabs). Esta capa **no contiene lógica de negocio**.

### `business/` — Capa de Negocio
Contiene la lógica de la aplicación: validaciones, reglas de autenticación y manejo de sesiones de usuario. Es el intermediario entre lo que el usuario ingresa y los datos que se almacenan.

### `data/` — Capa de Datos
Gestiona todo lo relacionado con la persistencia: configuración de la base de datos, inicialización de sesión PHP y el script SQL con el esquema de tablas (`users`, `tests`, `scores`, `properties`, `coments`).

---

## Sistema de Diseño

### Colores (variables CSS)
```css
--color-navy:   #113068   /* Navbar */
--color-gold:   #be8e56   /* Botones CTA */
--color-cream:  #e5eaff   /* Cards de info */
--color-black:  #000000   /* Fondo general */
--color-white:  #ffffff   /* Textos */
```

### Fuentes
- **Playfair Display** — Títulos, navbar, labels
- **Lato** — Cuerpo de texto, descripciones

---

## Responsive
- **Desktop**: grid 2 columnas, navbar horizontal
- **Mobile** (< 768px): grid 1 columna, menú hamburguesa (drawer lateral)
