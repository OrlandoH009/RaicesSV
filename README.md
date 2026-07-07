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

## Tecnologías usadas
- Node.js + npm
- Express
- EJS
- dotenv
- GSAP
- Puppeteer
- MySQL / MySQL2
- PHP
- HTML, CSS, JavaScript
- TypeScript (desarrollo)
- @types/node (desarrollo)

## Responsive
- **Desktop**: grid 2 columnas, navbar horizontal
- **Mobile** (< 768px): grid 1 columna, menú hamburguesa (drawer lateral)

# 🎮 Raíces SV - Juegos Interactivos
## Resumen Completo de los Juegos Creados

---

## 📊 Tabla Comparativa

| Aspecto | Atrapa la Pupusa | Batalla de Trompos |
|--------|------------------|-------------------|
| **Tipo** | Arcade / Skill | Lucha / Estrategia |
| **Objetivo** | Atrapar comida | Derrotar oponente |
| **Jugadores** | 1 (Solo) | 1 vs 1 o vs NPC |
| **Modos** | Fácil / Difícil | PvP / PvE |
| **Tiempo** | 30-40 segundos | Sin límite |
| **Energía** | Puntos | Barra de energía |
| **Física** | Gravedad (caída) | 2D horizontal |
| **Dificultades NPC** | N/A | 3 niveles |
| **Archivos** | 3 (.html, .css, .js) | 3 (.html, .css, .js) |

---

## 🎯 JUEGO 1: ATRAPA LA PUPUSA

### 📝 Descripción
Juego arcade tradicional donde debes mover un comal (sartén) para atrapar pupusas, quesillo y elotes que caen del cielo. Evita chanclas, piedras y huesos que restan vida.

### 🎮 Características

#### Modos de Dificultad
```
🟢 FÁCIL
├─ Gravedad: 0.35 (caída lenta)
├─ Tiempo: 40 segundos
├─ Vidas: 4
└─ Aparición: cada 2-3 segundos

🔴 DIFÍCIL
├─ Gravedad: 0.65 (caída rápida)
├─ Tiempo: 30 segundos
├─ Vidas: 3
└─ Aparición: cada 1.2-2 segundos
```

#### Elementos del Juego
```
✅ BUENOS (suman puntos)
├─ 🫓 Pupusa = 10 pts
├─ 🧀 Quesillo = 15 pts
└─ 🌽 Elote = 8 pts

❌ MALOS (restan vida)
├─ 🩴 Chancla = -1 vida
├─ 🪨 Piedra = -1 vida
└─ 🦴 Hueso = -1 vida
```

#### Controles
- 🖱️ **Mouse**: Mover comal horizontalmente
- 📱 **Touch**: Deslizar dedo para mover comal
- ⏸️ **Pausa**: Botón de pausa en interfaz
- 🔊 **Volumen**: Deslizador independiente

#### HUD
```
┌─────────────────────────────┐
│ Puntos: 250  Vidas: ❤️❤️💔  │
│ Tiempo: 15   Nivel: 🔴 Difícil│
└─────────────────────────────┘
```

#### Animaciones
✨ Efectos visuales dinámicos:
- Aparición suave de overlay con GSAP
- Animación de pérdida de corazones
- Efecto de daño (flash rojo)
- Sacudida de cámara en impacto
- Fade in/out de elementos
- Blobs de fondo flotantes

#### Mecánicas Especiales
- Velocidad terminal limitada (3.1 unidades)
- Sistema de puntuación adaptativo
- Mensajes motivacionales según puntuación
- Corrección de tiempo real (no basado en frames)
- Pausa/reanudación fluida

### 📊 Puntuaciones
```
0-49 pts   → "Bueno, para reponer pupusas hay que practicar más"
50-84 pts  → "Nada mal, ya casi cocinás como abuela"
85+ pts    → "¡Sos toda una maestra pupusera!"
```

---

## ⚡ JUEGO 2: BATALLA DE TROMPOS

### 📝 Descripción
Juego de estrategia donde controlas un trompo en una arena, compitiendo contra otro jugador o la IA. Derrota al oponente mediante colisiones y gestión de energía.

### 🎮 Características

#### Modos de Juego
```
👥 PvP (2 JUGADORES)
├─ Jugador 1: W/A/S/D
├─ Jugador 2: Flechas ↑↓←→
├─ Competencia directa
└─ Sin límite de tiempo

🤖 PvE (vs NPC)
├─ Jugador: W/A/S/D
├─ NPC con IA adaptable
├─ 3 niveles de dificultad
└─ Gana derrotando al NPC
```

#### Niveles de Dificultad NPC
```
🟢 FÁCIL
├─ Velocidad: 2.5x
├─ Precisión: 40%
├─ Reacción: 400ms
└─ Nivel: Principiante

🟡 NORMAL
├─ Velocidad: 4.0x
├─ Precisión: 60%
├─ Reacción: 250ms
└─ Nivel: Intermedio

🔴 DIFÍCIL
├─ Velocidad: 5.5x
├─ Precisión: 85%
├─ Reacción: 120ms
└─ Nivel: Experto
```

#### Sistema de Energía
```
Energía Máxima: 100%

Consumo:
├─ Movimiento jugador: -0.2%/frame
├─ Movimiento NPC: -0.15%/frame
└─ En combate: -5% por colisión

Regeneración:
└─ Pasiva: +0.08%/frame

Pérdida si:
├─ Energía ≤ 0%
├─ Sale de la arena
└─ Golpeado sin regenerar
```

#### Controles
```
Jugador 1:
├─ W = Arriba
├─ S = Abajo
├─ A = Izquierda
└─ D = Derecha

Jugador 2 / Flechas:
├─ ↑ = Arriba
├─ ↓ = Abajo
├─ ← = Izquierda
└─ → = Derecha

Interfaz:
├─ ⏸️ = Pausa/Reanudar
├─ ⛶ = Pantalla completa
└─ 🔊 = Control volumen
```

#### HUD
```
┌────────────────────────────────┐
│ 🟢 Jugador 1: 85%              │
│ 🔴 Jugador 2: 45%              │
│ Ronda: 1                        │
└────────────────────────────────┘
```

#### Animaciones
✨ Efectos dinámicos:
- Impactos con relámpago (⚡) animado
- Barras de energía en tiempo real
- Líneas de velocidad en trompos rápidos
- Brillo y gradientes en trompos
- Efecto de rotación realista
- Transiciones suaves de overlay
- Pulsación de fondo dinámico

#### Mecánicas de IA
```
Algoritmo:
1. Calcular distancia al jugador
2. Si lejos → Acercarse estratégicamente
3. Si cerca → Movimiento evasivo
4. Aplicar reacción según dificultad
5. Ejecutar con precisión variable

Comportamiento:
├─ Fácil: Predecible, lento
├─ Normal: Balanceado, adaptable
└─ Difícil: Agresivo, preciso
```

#### Física del Juego
```
Arena: 920×520 px
Trompo: Radio 16 px
Velocidad máxima: 8 unidades
Fricción: 0.05
Restitución: 0.8
Gravedad: 0 (juego 2D horizontal)
```

### 🎯 Estrategias

#### Contra NPC Fácil
✓ Persigue directamente
✓ Golpea múltiples veces
✓ La IA reacciona lentamente

#### Contra NPC Normal
✓ Alterna ataque/defensa
✓ Usa movimientos laterales
✓ Administra bien energía

#### Contra NPC Difícil
✓ Movimientos evasivos frecuentes
✓ Golpes sorpresivos desde bordes
✓ Espera el momento perfecto

---

## 🎨 Aspectos Visuales Comunes

### Colores Temáticos
```
🟢 Verde: Jugador 1 / Fácil (#3c8c5a)
🔴 Rojo: Jugador 2 / Difícil (#d63c3c)
🟡 Amarillo: Normal (#f39c12)
⭐ Oro: Puntos destacados (#d4af37)
🔵 Azul marino: Interfaz (#113068)
```

### Fondos Dinámicos
```
Gradientes:
├─ Lineal principal
├─ Radial para profundidad
└─ Blobs flotantes animados

Efectos:
├─ Transparencias variables
├─ Capas superpuestas
└─ Movimiento suave (float 6-10s)
```

### Tipografía
```
Display: Títulos y puntos grandes
Body: Texto regular e instrucciones
Monospace: Controles y datos técnicos
```

---

## 🔊 Audio en Ambos Juegos

```
Música de Fondo:
├─ Archivo: musica-salvadorena.mp3
├─ Loop: Sí
├─ Volumen por defecto: 45%
└─ Control independiente: Sí

Efectos de Sonido:
├─ Impactos: Visualizados con animaciones
├─ Puntuación: Feedback visual
└─ Pausa: Silencio total

Icono de Volumen:
├─ 🔊 = Volumen alto (>35%)
├─ 🔉 = Volumen bajo (<35%)
└─ 🔇 = Silencio (0%)
```

---

## 📱 Responsividad

### Desktop (>1024px)
- Canvas tamaño completo
- HUD horizontal en dos filas
- Todos los controles visibles
- Óptimo para jugar

### Tablet (768px-1024px)
- Canvas redimensionado
- Botones ajustados
- HUD más compacto
- Táctil optimizado

### Mobile (<768px)
- Canvas responsivo
- Botones más grandes
- HUD apilado verticalmente
- Controles para toque

---

## 🚀 Integración en Sitio

### Paso 1: Copiar Archivos
```
views/
├── juegos.html
├── juegos.css
├── juegos.js
├── trompos.html
├── trompos.css
└── trompos.js
```

### Paso 2: Actualizar Navegación
```html
<!-- Agregar en drawer menu -->
<a href="../views/juegos.html" class="drawer-link">🫓 Atrapa Pupusas</a>
<a href="../views/trompos.html" class="drawer-link">⚡ Batalla Trompos</a>
```

### Paso 3: Verificar Assets
```
assets/
├── css/global.css
├── js/script.js
├── media/
│   ├── Logo de Raíces SV (Sin Fondo).png
│   └── musica-salvadorena.mp3
└── favicon/
    ├── favicon.ico
    └── site.webmanifest
```

### Paso 4: Testing
✓ Verificar links en navegación
✓ Probar en desktop/mobile
✓ Activar/desactivar volumen
✓ Probar pantalla completa
✓ Verificar pausa/reanudación

---

## 🎓 Aspectos Culturales

### Atrapa la Pupusa
- **Origen**: Gastronomía salvadoreña ancestral
- **Ingredientes**: Pupusa, quesillo, elote (comidas típicas)
- **Objetos malos**: Chancla (tradición salvadoreña)
- **Mensaje**: Celebra la culinaria del país

### Batalla de Trompos
- **Origen**: Juego ancestral mesoamericano
- **Tradición**: Competencia cultural entre amigos
- **Mecánica**: Simula peleas reales de trompos
- **Destreza**: Requiere control y timing
- **Significado**: Mantiene tradición viva

---

## 📊 Estadísticas de Desarrollo

### Líneas de Código
```
Juego 1 (Atrapa Pupusa):
├─ HTML: ~120 líneas
├─ CSS: ~380 líneas
└─ JS: ~450 líneas
Total: ~950 líneas

Juego 2 (Batalla Trompos):
├─ HTML: ~110 líneas
├─ CSS: ~420 líneas
└─ JS: ~550 líneas
Total: ~1,080 líneas

Documentación:
├─ Cambios juego 1: 60 líneas
├─ README juego 2: 350 líneas
└─ Este resumen: 400 líneas
```

### Librerías Utilizadas
```
Matter.js v0.19.0 - Física 2D
GSAP v3.12.5 - Animaciones
CSS3 - Estilos y animaciones
HTML5 Canvas - Renderizado gráfico
```

---

## 💡 Características Destacadas

### Juego 1 - Atrapa la Pupusa
✨ Sistema de dificultad simple pero efectivo
✨ Mecánicas fáciles de entender
✨ Perfecto para principiantes
✨ Tiempo limitado crea tensión
✨ Feedback visual inmediato

### Juego 2 - Batalla de Trompos
⚡ IA inteligente y adaptable
⚡ Modo competitivo para 2 jugadores
⚡ Estrategia profunda
⚡ Altamente replayable
⚡ Desafío progresivo

---

## 🔧 Personalización Posible

### Fácil de Modificar
```javascript
// Juego 1: Cambiar tiempo
timeLimit: 45, // De 30/40 a 45 segundos

// Juego 2: Velocidad NPC
gameConfig.npc.hard.speed = 6.5; // Más rápido

// Ambos: Cambiar colores
color: '#00ff00', // Nuevo color

// Ambos: Ajustar tamaños
size: 20, // Más grande

// Ambos: Modificar física
restitution: 1.0, // Más rebote
```

### Expansiones Futuras
```
Juego 1:
- Más niveles de dificultad
- Power-ups y bonificadores
- Leaderboard de puntuación
- Logros/achievements

Juego 2:
- Más de 3 jugadores (battle royale)
- Potenciadores especiales
- Arenas temáticas diferentes
- Sistema de progresión
- Estadísticas persistentes
```

---

## 📝 Archivos Entregados

### Juego 1: Atrapa la Pupusa
- ✅ juegos.html
- ✅ juegos.css
- ✅ juegos.js
- ✅ CAMBIOS_REALIZADOS.md

### Juego 2: Batalla de Trompos
- ✅ trompos.html
- ✅ trompos.css
- ✅ trompos.js
- ✅ BATALLA_TROMPOS_README.md

### Documentación
- ✅ RESUMEN_JUEGOS.md (este archivo)

---

## 🎯 Conclusión

Se han creado dos juegos interactivos completos que:

✅ Celebran la cultura salvadoreña
✅ Ofrecen entretenimiento dinámico
✅ Usan tecnología moderna (Matter.js, GSAP)
✅ Tienen animaciones atractivas
✅ Son fáciles de jugar pero desafiantes de dominar
✅ Tienen excelente interfaz visual
✅ Son totalmente responsivos
✅ Incluyen IA inteligente (trompos)
✅ Ofrecen modos variados
✅ Están bien documentados

¡Listos para agregar a Raíces SV y deleitar a los usuarios! 🎮🇸🇻

---

**Creado con ❤️ para Raíces SV**
**Técnicamente potenciado con Matter.js + GSAP**
**Cultura tradicional + Tecnología moderna = 🎉**