# Raíces SV — Estructura de Archivos

## 📁 Archivos incluidos

| Archivo | Descripción |
|---|---|
| `index.html` | Página de inicio (home) |
| `sitios-culturales.html` | Página de Sitios Culturales |
| `gastronomia.html` | Página de Gastronomía (por crear) |
| `eventos.html` | Página de Eventos Culturales (por crear) |
| `historia.html` | Página de Historia (por crear) |
| `mapa.html` | Página del Mapa interactivo (por crear) |
| `styles.css` | **Todos los estilos globales** (variables, navbar, hero, cards, footer, responsive) |
| `script.js` | JavaScript: navbar scroll, menú móvil, scroll reveal, animaciones |
| `navbar.html` | Fragmento HTML del navbar (referencia para copiar) |

---

## 🎨 Sistema de diseño

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

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador directamente (doble clic)
2. Todos los archivos deben estar en la **misma carpeta**
3. Para agregar nuevas páginas, copia la estructura de `sitios-culturales.html` y cambia el contenido

---

## 📄 Cómo crear nuevas páginas

1. Copia `sitios-culturales.html`
2. Cambia el `<title>` y el `<h1>` del hero
3. Actualiza el `class="active"` en el navbar al link correcto
4. Reemplaza el contenido del grid con tu información
5. Guarda con el nombre correcto (ej: `gastronomia.html`)

---

## 📱 Responsive
- **Desktop**: grid 2 columnas, navbar horizontal
- **Mobile** (< 768px): grid 1 columna, menú hamburguesa
