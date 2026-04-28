# Raíces SV — Estructura de Archivos

## 📁 Archivos incluidos

| Archivo | Descripción |
|---|---|
| `index.html` | Página de inicio (home) |
| `sitios-culturales.html` | Página de Sitios Culturales |
| `gastronomia.html` | Página de Gastronomía  |
| `eventos.html` | Página de Eventos Culturales  |
| `historia.html` | Página de Historia  |
| `mapa.html` | Página del Mapa interactivo  |
| `styles.css` | **Todos los estilos globales** (variables, navbar, hero, cards, footer, responsive) |
| `script.js` | JavaScript: navbar scroll, menú móvil, scroll reveal, animaciones |
| `navbar.html` | Fragmento HTML del navbar  |

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
<br>
<br>
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
