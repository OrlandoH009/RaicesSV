// ════════════════════════════════════
    // DATOS DE EJEMPLO DE PUBLICACIONES
    // ════════════════════════════════════
    const publicationsData = [
      {
        id: 1,
        title: "Ruinas de Tazumal",
        description: "Una vista espectacular de las pirámides antiguas al atardecer. El lugar es perfecto para aprender sobre la historia prehispánica de El Salvador.",
        location: "Tazumal",
        image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&h=350&fit=crop",
        coordinates: { lat: 13.9286, lng: -89.6469 }
      },
      {
        id: 2,
        title: "Cascada en Joya de Cerén",
        description: "Una cascada hermosa en medio de la naturaleza salvadoreña. Ideal para una caminata refrescante y conectar con la naturaleza.",
        location: "Joya de Cerén",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop",
        coordinates: { lat: 13.8238, lng: -89.3953 }
      },
      {
        id: 3,
        title: "Atardecer en Salvador del Mundo",
        description: "Vistas panorámicas de San Salvador desde la cima del cerro. Un lugar perfecto para contemplar la ciudad y fotografiar el atardecer.",
        location: "Salvador del Mundo",
        image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37cf0?w=500&h=350&fit=crop",
        coordinates: { lat: 13.7029, lng: -89.2073 }
      },
      {
        id: 4,
        title: "Pueblo Mágico de Suchitoto",
        description: "Las calles coloniales de Suchitoto son un viaje al pasado. Casas antiguas, arte y cultura en cada rincón.",
        location: "Suchitoto",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop",
        coordinates: { lat: 13.9417, lng: -88.7936 }
      },
      {
        id: 5,
        title: "Catedral Metropolitana",
        description: "La arquitectura religiosa más importante de El Salvador. Un lugar de paz y contemplación en el corazón de San Salvador.",
        location: "Catedral Metropolitana",
        image: "https://images.unsplash.com/photo-1485945371519-b21cc028cb2f?w=500&h=350&fit=crop",
        coordinates: { lat: 13.6929, lng: -89.2167 }
      },
      {
        id: 6,
        title: "Bosque El Imposible",
        description: "Una reserva natural con una biodiversidad increíble. Caminos entre árboles centenarios y aire puro de la naturaleza.",
        location: "Bosque El Imposible",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop",
        coordinates: { lat: 13.8667, lng: -89.9333 }
      }
    ];

    // ════════════════════════════════════
    // RENDERIZAR PUBLICACIONES
    // ════════════════════════════════════
    function renderPublications() {
      const grid = document.getElementById('publicationsGrid');
      const emptyState = document.getElementById('emptyState');

      if (publicationsData.length === 0) {
        emptyState.style.display = 'block';
        grid.innerHTML = '';
        return;
      }

      emptyState.style.display = 'none';
      grid.innerHTML = publicationsData.map(pub => `
        <article class="publication-card" data-location="${pub.location}" data-lat="${pub.coordinates.lat}" data-lng="${pub.coordinates.lng}">
          <div class="publication-image-container">
            <img src="${pub.image}" alt="${pub.title}" loading="lazy">
            <div class="publication-image-overlay">
              <span class="publication-image-overlay-text">Ver en mapa</span>
            </div>
          </div>
          <div class="publication-content">
            <h3 class="publication-title">${pub.title}</h3>
            <p class="publication-description">${pub.description}</p>
            <div class="publication-location">
              <div class="publication-location-icon">📍</div>
              <div class="publication-location-text">${pub.location}</div>
            </div>
            <div class="publication-action">
              <button class="publication-btn">Ir al Mapa</button>
            </div>
          </div>
        </article>
      `).join('');

      // Agregar event listeners a las tarjetas
      document.querySelectorAll('.publication-card').forEach(card => {
        card.addEventListener('click', handleCardClick);
      });
    }

    // ════════════════════════════════════
    // MANEJAR CLIC EN TARJETA
    // ════════════════════════════════════
    function handleCardClick(e) {
      // No ejecutar si se hace clic en el botón
      if (e.target.tagName === 'BUTTON') return;

      const card = e.currentTarget;
      const location = card.dataset.location;
      const lat = parseFloat(card.dataset.lat);
      const lng = parseFloat(card.dataset.lng);

      // Simular navegación al mapa interactivo
      console.log(`Navegando al mapa: ${location} (${lat}, ${lng})`);

      // En un proyecto real, esto sería:
      // window.location.href = `/mapa.html?location=${location}&lat=${lat}&lng=${lng}`;
      // O usar un evento personalizado:
      // window.dispatchEvent(new CustomEvent('navigateToMap', { detail: { location, lat, lng } }));

      // Para esta demo, mostrar un mensaje
      alert(`🗺️ Navegando a ${location}\nCoordenadas: ${lat}, ${lng}\n\n(En producción, esto te llevaría al mapa interactivo)`);
    }

    // ════════════════════════════════════
    // MANEJAR FORMULARIO
    // ════════════════════════════════════
    document.getElementById('publicationForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const title = document.getElementById('pubTitle').value;
      const description = document.getElementById('pubDescription').value;
      const location = document.getElementById('pubLocation').value;
      const imageFile = document.getElementById('pubImage').files[0];

      if (!imageFile) {
        alert('Por favor sube una imagen');
        return;
      }

      // Crear URL de la imagen
      const imageUrl = URL.createObjectURL(imageFile);

      // Encontrar coordenadas del lugar (en producción, esto sería de una base de datos)
      const locationData = {
        'Tazumal': { lat: 13.9286, lng: -89.6469 },
        'Joya de Cerén': { lat: 13.8238, lng: -89.3953 },
        'Salvador del Mundo': { lat: 13.7029, lng: -89.2073 },
        'Suchitoto': { lat: 13.9417, lng: -88.7936 },
        'Catedral Metropolitana': { lat: 13.6929, lng: -89.2167 },
        'MUNA': { lat: 13.6952, lng: -89.2233 },
        'Ruinas de San Andrés': { lat: 13.8639, lng: -89.4317 },
        'El Boquerón': { lat: 13.6844, lng: -89.2272 },
        'Lago de Coatepeque': { lat: 13.8753, lng: -89.5417 },
        'Bosque El Imposible': { lat: 13.8667, lng: -89.9333 },
        'Puerta del Diablo': { lat: 13.6486, lng: -89.1403 }
      };

      const coords = locationData[location] || { lat: 13.6929, lng: -89.2167 };

      // Crear nueva publicación
      const newPublication = {
        id: publicationsData.length + 1,
        title,
        description,
        location,
        image: imageUrl,
        coordinates: coords
      };

      // Agregar al inicio del array
      publicationsData.unshift(newPublication);

      // Renderizar publicaciones
      renderPublications();

      // Limpiar formulario
      this.reset();
      document.getElementById('imagePreview').classList.remove('show');

      // Scroll a las publicaciones
      document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });

      // Mostrar mensaje de éxito
      alert('✅ ¡Publicación creada exitosamente!');
    });

    // ════════════════════════════════════
    // MANEJAR SUBIDA DE IMAGEN
    // ════════════════════════════════════
    document.getElementById('pubImage').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          document.getElementById('previewImg').src = event.target.result;
          document.getElementById('imagePreview').classList.add('show');
        };
        reader.readAsDataURL(file);
      }
    });

    // Botón para eliminar imagen
    document.getElementById('removeImage').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('pubImage').value = '';
      document.getElementById('imagePreview').classList.remove('show');
    });

    // ════════════════════════════════════
    // DRAG & DROP PARA IMAGEN
    // ════════════════════════════════════
    const fileLabel = document.querySelector('.form-file-label');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileLabel.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      fileLabel.addEventListener(eventName, () => {
        fileLabel.style.background = 'linear-gradient(135deg, rgba(190, 142, 86, 0.35) 0%, rgba(17, 48, 104, 0.35) 100%)';
        fileLabel.style.borderColor = '#a87a42';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileLabel.addEventListener(eventName, () => {
        fileLabel.style.background = 'linear-gradient(135deg, rgba(190, 142, 86, 0.15) 0%, rgba(17, 48, 104, 0.15) 100%)';
        fileLabel.style.borderColor = '#be8e56';
      });
    });

    fileLabel.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      document.getElementById('pubImage').files = files;
      // Simular cambio de input
      document.getElementById('pubImage').dispatchEvent(new Event('change', { bubbles: true }));
    });

    // ════════════════════════════════════
    // INICIALIZAR
    // ════════════════════════════════════
    renderPublications();