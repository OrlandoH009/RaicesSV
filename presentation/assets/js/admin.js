// Panel de administración. Usa GSAP y Chart.js (CDN, cargados en admin.html)
// y consume /api/admin/* y /api/publications.

(function initTheme() {
  const saved = localStorage.getItem('raices-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = false;

  const state = {
    currentUser: null,
    users: [],
    publications: [],
    metrics: null,
    appeals: null,
    flaggedComments: null,
    activeSection: 'resumen'
  };

  async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    let data = null;
    try {
      data = await response.json();
    } catch (_) {
      data = null;
    }

    if (!response.ok) {
      const message = (data && data.message) || 'No se pudo completar la acción.';
      throw new Error(message);
    }

    return data;
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const toastContainer = document.getElementById('admin-toast');
  function showToast(message, kind = 'info') {
    if (!toastContainer) return;
    const item = document.createElement('div');
    item.className = 'admin-toast-item';
    item.setAttribute('data-kind', kind);
    item.textContent = message;
    toastContainer.appendChild(item);

    if (window.gsap) {
      gsap.fromTo(item, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .35, ease: 'power2.out' });
    }

    setTimeout(() => {
      if (window.gsap) {
        gsap.to(item, { opacity: 0, x: 30, duration: .3, ease: 'power2.in', onComplete: () => item.remove() });
      } else {
        item.remove();
      }
    }, 3200);
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('raices-theme', theme);

    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) themeSwitch.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
  }

  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    themeSwitch.setAttribute('aria-checked', currentTheme === 'light' ? 'true' : 'false');
    themeSwitch.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  const nav = document.getElementById('adminNav');
  const navIndicator = document.getElementById('adminNavIndicator');
  const navItems = nav ? Array.from(nav.querySelectorAll('.admin-nav__item')) : [];
  const sectionTitle = document.getElementById('adminSectionTitle');
  const backBtn = document.getElementById('adminBackBtn');

  const sectionLabels = {
    resumen: 'Resumen',
    usuarios: 'Usuarios',
    publicaciones: 'Publicaciones',
    equipo: 'Equipo',
    apelaciones: 'Apelaciones',
    comentarios: 'Comentarios reportados'
  };

  function moveIndicatorTo(button) {
    if (!navIndicator || !button || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = button.getBoundingClientRect();
    const offsetTop = btnRect.top - navRect.top;

    if (reduceMotion || !window.gsap) {
      navIndicator.style.transform = `translateY(${offsetTop}px)`;
      return;
    }
    gsap.to(navIndicator, { y: offsetTop, duration: .45, ease: 'power3.out' });
  }

  function setActiveSection(sectionName) {
    state.activeSection = sectionName;

    navItems.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.section === sectionName);
    });
    const activeBtn = navItems.find((btn) => btn.dataset.section === sectionName);
    if (activeBtn) moveIndicatorTo(activeBtn);

    document.querySelectorAll('.admin-section').forEach((section) => {
      section.classList.toggle('is-active', section.dataset.sectionPanel === sectionName);
    });

    if (sectionTitle) sectionTitle.textContent = sectionLabels[sectionName] || sectionName;

    showListView(sectionName);
  }

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => setActiveSection(btn.dataset.section));
  });

  window.addEventListener('resize', () => {
    const activeBtn = navItems.find((btn) => btn.dataset.section === state.activeSection);
    if (activeBtn) moveIndicatorTo(activeBtn);
  });

  function showListView(sectionName) {
    const listView = document.getElementById(`${sectionName}-view-list`);
    const detailView = document.getElementById(`${sectionName}-view-detail`);
    if (!listView || !detailView) {
      if (backBtn) backBtn.hidden = true;
      return;
    }

    detailView.classList.remove('is-active');
    listView.classList.add('is-active');
    if (backBtn) backBtn.hidden = true;

    if (window.gsap && !reduceMotion) {
      gsap.fromTo(listView, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out' });
    }
  }

  function showDetailView(sectionName) {
    const listView = document.getElementById(`${sectionName}-view-list`);
    const detailView = document.getElementById(`${sectionName}-view-detail`);
    if (!listView || !detailView) return;

    listView.classList.remove('is-active');
    detailView.classList.add('is-active');
    if (backBtn) backBtn.hidden = false;

    if (window.gsap && !reduceMotion) {
      gsap.fromTo(detailView, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out' });
    }
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => showListView(state.activeSection));
  }

  const initialBtn = navItems.find((btn) => btn.classList.contains('is-active')) || navItems[0];
  if (initialBtn && navIndicator && nav) {
    const navRect = nav.getBoundingClientRect();
    const btnRect = initialBtn.getBoundingClientRect();
    navIndicator.style.transform = `translateY(${btnRect.top - navRect.top}px)`;
  }

  const adminNameEl = document.getElementById('adminName');
  const adminRoleBadgeEl = document.getElementById('adminRoleBadge');
  const adminAvatarEl = document.getElementById('adminAvatar');

  function initialsFrom(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : '';
    const second = parts[1] ? parts[1][0] : '';
    return (first + second).toUpperCase() || '?';
  }

  function renderWhoAmI(user) {
    if (adminNameEl) adminNameEl.textContent = user.name || user.email || 'Sin nombre';
    if (adminRoleBadgeEl) {
      adminRoleBadgeEl.textContent = user.role;
      adminRoleBadgeEl.setAttribute('data-role', user.role);
    }
    if (adminAvatarEl) {
      if (user.avatarUrl) {
        adminAvatarEl.innerHTML = `<img src="${escapeHtml(user.avatarUrl)}" alt="${escapeHtml(user.name || '')}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
      } else {
        adminAvatarEl.textContent = initialsFrom(user.name);
      }
    }
  }

  async function loadCurrentUser() {
    try {
      const data = await apiFetch('/auth/status');
      if (!data.loggedIn || !data.user) {
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }
      state.currentUser = data.user;
      renderWhoAmI(data.user);
    } catch (error) {
      showToast('No se pudo cargar tu sesión.', 'error');
    }
  }

  let charts = { status: null, role: null, activity: null };

  function animateCount(el, finalValue) {
    if (!el) return;
    const target = Number(finalValue) || 0;

    if (reduceMotion || !window.gsap) {
      el.textContent = target;
      return;
    }

    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(counter.value); }
    });
  }

  function readThemeColor(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }

  function buildChartTextColor() {
    return readThemeColor('--text-main') || '#ffffff';
  }

  function renderMetricCards(metrics) {
    const totalUsersEl = document.querySelector('[data-metric="totalUsers"]');
    const activeUsersEl = document.querySelector('[data-metric="activeUsers"]');
    const suspendedUsersEl = document.querySelector('[data-metric="suspendedUsers"]');
    const totalPubsEl = document.querySelector('[data-metric="totalPublications"]');

    const activeRow = metrics.usersByStatus.find((row) => row.status === 'Activo');
    const suspendedRow = metrics.usersByStatus.find((row) => row.status === 'Suspendido');

    animateCount(totalUsersEl, metrics.totalUsers);
    animateCount(activeUsersEl, activeRow ? activeRow.total : 0);
    animateCount(suspendedUsersEl, suspendedRow ? suspendedRow.total : 0);
    animateCount(totalPubsEl, metrics.totalPublications);
  }

  function renderStatusChart(metrics) {
    const canvas = document.getElementById('chartUsersByStatus');
    if (!canvas || !window.Chart) return;

    const labels = metrics.usersByStatus.map((row) => row.status);
    const values = metrics.usersByStatus.map((row) => row.total);
    const textColor = buildChartTextColor();

    if (charts.status) charts.status.destroy();
    charts.status = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#4f8f6b', '#c0483b'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
      }
    });
  }

  function renderRoleChart(metrics) {
    const canvas = document.getElementById('chartUsersByRole');
    if (!canvas || !window.Chart) return;

    const labels = metrics.usersByRole.map((row) => row.role);
    const values = metrics.usersByRole.map((row) => row.total);
    const textColor = buildChartTextColor();

    if (charts.role) charts.role.destroy();
    charts.role = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#8a8f98', '#be8e56', '#4f8f6b'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
      }
    });
  }

  function renderActivityChart(metrics) {
    const canvas = document.getElementById('chartActivityByMonth');
    if (!canvas || !window.Chart) return;

    const months = Array.from(new Set([
      ...metrics.usersByMonth.map((row) => row.month),
      ...metrics.publicationsByMonth.map((row) => row.month)
    ])).sort();

    const usersMap = Object.fromEntries(metrics.usersByMonth.map((row) => [row.month, row.total]));
    const pubsMap = Object.fromEntries(metrics.publicationsByMonth.map((row) => [row.month, row.total]));
    const textColor = buildChartTextColor();

    if (charts.activity) charts.activity.destroy();
    charts.activity = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          { label: 'Usuarios nuevos', data: months.map((m) => usersMap[m] || 0), backgroundColor: '#be8e56' },
          { label: 'Publicaciones', data: months.map((m) => pubsMap[m] || 0), backgroundColor: '#4f8f6b' }
        ]
      },
      options: {
        scales: {
          x: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,.06)' } },
          y: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,.06)' } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });
  }

  async function loadMetrics() {
    try {
      const metrics = await apiFetch('/api/admin/metrics');
      state.metrics = metrics;
      renderMetricCards(metrics);
      renderStatusChart(metrics);
      renderRoleChart(metrics);
      renderActivityChart(metrics);
    } catch (error) {
      showToast('No se pudieron cargar las métricas.', 'error');
    }
  }

  themeSwitch?.addEventListener('click', () => {
    setTimeout(() => {
      if (state.metrics) {
        renderStatusChart(state.metrics);
        renderRoleChart(state.metrics);
        renderActivityChart(state.metrics);
      }
    }, 50);
  });

  const usersTableBody = document.getElementById('usersTableBody');
  const usersEmptyState = document.getElementById('usersEmptyState');
  const usersSearchInput = document.getElementById('usersSearchInput');
  const usersRoleFilter = document.getElementById('usersRoleFilter');
  const usersStatusFilter = document.getElementById('usersStatusFilter');
  const usersPrevPage = document.getElementById('usersPrevPage');
  const usersNextPage = document.getElementById('usersNextPage');
  const usersPageInfo = document.getElementById('usersPageInfo');
  const userDetailCard = document.getElementById('userDetailCard');

  const USERS_PER_PAGE = 15;
  let usersFiltered = [];
  let usersPage = 1;

  function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('es-SV', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatDateTime(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('es-SV', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function roleBadgeClass(role) {
    if (role === 'Fundador') return 'admin-badge--role-fundador';
    if (role === 'Admin') return 'admin-badge--role-admin';
    return 'admin-badge--role-usuario';
  }

  function statusBadgeClass(status) {
    return status === 'Suspendido' ? 'admin-badge--status-suspendido' : 'admin-badge--status-activo';
  }

  function avatarCellHtml(user) {
    if (user.avatarUrl) {
      return `<img src="${escapeHtml(user.avatarUrl)}" alt="${escapeHtml(user.name || '')}" />`;
    }
    return initialsFrom(user.name);
  }

  function appealInitials(text) {
    if (!text) return '?';
    return text.trim()[0].toUpperCase();
  }

  function applyUserFilters() {
    const search = (usersSearchInput?.value || '').trim().toLowerCase();
    const roleValue = usersRoleFilter?.value || '';
    const statusValue = usersStatusFilter?.value || '';

    usersFiltered = state.users.filter((user) => {
      const matchesSearch = !search
        || user.name.toLowerCase().includes(search)
        || user.email.toLowerCase().includes(search);
      const matchesRole = !roleValue || user.role === roleValue;
      const matchesStatus = !statusValue || user.status === statusValue;
      return matchesSearch && matchesRole && matchesStatus;
    });

    usersPage = 1;
    renderUsersTable();
  }

  function renderUsersTable() {
    if (!usersTableBody) return;

    const totalPages = Math.max(1, Math.ceil(usersFiltered.length / USERS_PER_PAGE));
    if (usersPage > totalPages) usersPage = totalPages;

    const start = (usersPage - 1) * USERS_PER_PAGE;
    const pageItems = usersFiltered.slice(start, start + USERS_PER_PAGE);

    usersTableBody.innerHTML = '';

    if (pageItems.length === 0) {
      if (usersEmptyState) usersEmptyState.hidden = false;
    } else {
      if (usersEmptyState) usersEmptyState.hidden = true;

      pageItems.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="admin-user-cell">
              <div class="admin-user-cell__avatar">${avatarCellHtml(user)}</div>
              <span class="admin-user-cell__name">${escapeHtml(user.name)}</span>
            </div>
          </td>
          <td>${escapeHtml(user.email)}</td>
          <td><span class="admin-badge ${roleBadgeClass(user.role)}">${user.role}</span></td>
          <td><span class="admin-badge ${statusBadgeClass(user.status)}">${user.status}</span></td>
          <td>${formatDate(user.createdAt)}</td>
        `;
        row.addEventListener('click', () => openUserDetail(user.id));
        usersTableBody.appendChild(row);
      });
    }

    if (usersPageInfo) usersPageInfo.textContent = `Página ${usersPage} de ${totalPages}`;
    if (usersPrevPage) usersPrevPage.disabled = usersPage <= 1;
    if (usersNextPage) usersNextPage.disabled = usersPage >= totalPages;
  }

  usersSearchInput?.addEventListener('input', applyUserFilters);
  usersRoleFilter?.addEventListener('change', applyUserFilters);
  usersStatusFilter?.addEventListener('change', applyUserFilters);

  usersPrevPage?.addEventListener('click', () => {
    if (usersPage > 1) { usersPage--; renderUsersTable(); }
  });
  usersNextPage?.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(usersFiltered.length / USERS_PER_PAGE));
    if (usersPage < totalPages) { usersPage++; renderUsersTable(); }
  });

  function canActOnUser(targetUser) {
    const me = state.currentUser;
    if (!me) return { canSuspend: false, canPromote: false, canDemote: false, canDelete: false };

    const isSelf = me.id === targetUser.id;
    const iAmFundador = me.role === 'Fundador';
    const targetIsAdmin = targetUser.role === 'Admin';

    return {
      canSuspend: !isSelf && targetUser.role !== 'Fundador' && (!targetIsAdmin || iAmFundador),
      canPromote: !isSelf && targetUser.role === 'Usuario',
      canDemote: !isSelf && iAmFundador && targetUser.role === 'Admin',
      canDelete: !isSelf && iAmFundador && targetUser.role === 'Admin'
    };
  }

  function openUserDetail(userId) {
    const user = state.users.find((u) => u.id === userId);
    if (!user || !userDetailCard) return;

    const perms = canActOnUser(user);

    userDetailCard.innerHTML = `
      <div class="admin-detail-head">
        <div class="admin-detail-head__avatar">${avatarCellHtml(user)}</div>
        <div>
          <h2>${escapeHtml(user.name)}</h2>
          <p>${escapeHtml(user.email)}</p>
        </div>
      </div>
      <div class="admin-detail-rows">
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Rol</span>
          <span class="admin-detail-row__value"><span class="admin-badge ${roleBadgeClass(user.role)}">${user.role}</span></span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Estado</span>
          <span class="admin-detail-row__value"><span class="admin-badge ${statusBadgeClass(user.status)}">${user.status}</span></span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Registrado</span>
          <span class="admin-detail-row__value">${formatDate(user.createdAt)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Cuenta de Google</span>
          <span class="admin-detail-row__value">${user.hasGoogle ? 'Sí' : 'No'}</span>
        </div>
      </div>
      <div class="admin-detail-actions">
        ${perms.canSuspend ? `<button type="button" class="admin-btn ${user.status === 'Suspendido' ? 'admin-btn--jade' : 'admin-btn--danger'}" id="detailToggleStatusBtn">${user.status === 'Suspendido' ? 'Reactivar' : 'Suspender'}</button>` : ''}
        ${perms.canPromote ? `<button type="button" class="admin-btn admin-btn--primary" id="detailPromoteBtn">Ascender a Admin</button>` : ''}
        ${perms.canDemote ? `<button type="button" class="admin-btn admin-btn--ghost" id="detailDemoteBtn">Quitar rol Admin</button>` : ''}
        ${perms.canDelete ? `<button type="button" class="admin-btn admin-btn--danger" id="detailDeleteBtn">Eliminar administrador</button>` : ''}
      </div>
    `;

    document.getElementById('detailToggleStatusBtn')?.addEventListener('click', () => {
      const nextStatus = user.status === 'Suspendido' ? 'activo' : 'suspendido';
      confirmAction({
        title: nextStatus === 'suspendido' ? 'Suspender usuario' : 'Reactivar usuario',
        text: nextStatus === 'suspendido'
          ? `${user.name} no podrá acceder al sitio hasta que lo reactives.`
          : `${user.name} podrá volver a acceder al sitio.`,
        requireReason: nextStatus === 'suspendido',
        onConfirm: (reason) => setUserStatus(user.id, nextStatus, reason)
      });
    });

    document.getElementById('detailPromoteBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Ascender a administrador',
        text: `${user.name} pasará a tener acceso al panel de administración.`,
        onConfirm: () => promoteUser(user.id)
      });
    });

    document.getElementById('detailDemoteBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Quitar rol de administrador',
        text: `${user.name} volverá a ser un usuario normal.`,
        onConfirm: () => demoteUser(user.id)
      });
    });

    document.getElementById('detailDeleteBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Eliminar administrador',
        text: `Esta acción elimina la cuenta de ${user.name} de forma permanente.`,
        onConfirm: () => deleteAdminUser(user.id)
      });
    });

    showDetailView('usuarios');
  }

  async function setUserStatus(userId, status, reason) {
    try {
      const result = await apiFetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason })
      });
      updateUserInState(result.user);
      showToast('Estado actualizado.', 'success');
      showListView('usuarios');
      refreshAll();
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function promoteUser(userId) {
    try {
      const result = await apiFetch(`/api/admin/users/${userId}/promote`, { method: 'PATCH' });
      if (result.pending) {
        showToast('Se envió una invitación por correo para completar el ascenso.', 'success');
      } else {
        updateUserInState(result.user);
        showToast('Usuario ascendido a administrador.', 'success');
        refreshAll();
      }
      showListView('usuarios');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function demoteUser(userId) {
    try {
      const result = await apiFetch(`/api/admin/users/${userId}/demote`, { method: 'PATCH' });
      updateUserInState(result.user);
      showToast('Se quitó el rol de administrador.', 'success');
      showListView('usuarios');
      refreshAll();
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

   async function deleteAdminUser(userId) {
    try {
      await apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      state.users = state.users.filter((u) => u.id !== userId);
      applyUserFilters();
      showToast('Administrador eliminado.', 'success');
      showListView('usuarios');
      refreshAll();
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  function updateUserInState(updatedUser) {
    const index = state.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) state.users[index] = updatedUser;
    applyUserFilters();
  }

  async function loadUsers() {
    try {
      const data = await apiFetch('/api/admin/users');
      state.users = data.users;
      applyUserFilters();
      renderTeamGrid();
    } catch (error) {
      showToast('No se pudieron cargar los usuarios.', 'error');
    }
  }

  const publicationsGrid = document.getElementById('publicationsGrid');
  const publicationsEmptyState = document.getElementById('publicationsEmptyState');
  const publicationsSearchInput = document.getElementById('publicationsSearchInput');
  const publicationsPrevPage = document.getElementById('publicationsPrevPage');
  const publicationsNextPage = document.getElementById('publicationsNextPage');
  const publicationsPageInfo = document.getElementById('publicationsPageInfo');
  const publicationDetailCard = document.getElementById('publicationDetailCard');

  const PUBLICATIONS_PER_PAGE = 12;
  let publicationsFiltered = [];
  let publicationsPage = 1;

  function applyPublicationFilters() {
    const search = (publicationsSearchInput?.value || '').trim().toLowerCase();

    publicationsFiltered = state.publications.filter((pub) => {
      if (!search) return true;
      return pub.title.toLowerCase().includes(search) || pub.location.toLowerCase().includes(search);
    });

    publicationsPage = 1;
    renderPublicationsGrid();
  }

  function renderPublicationsGrid() {
    if (!publicationsGrid) return;

    const totalPages = Math.max(1, Math.ceil(publicationsFiltered.length / PUBLICATIONS_PER_PAGE));
    if (publicationsPage > totalPages) publicationsPage = totalPages;

    const start = (publicationsPage - 1) * PUBLICATIONS_PER_PAGE;
    const pageItems = publicationsFiltered.slice(start, start + PUBLICATIONS_PER_PAGE);

    publicationsGrid.innerHTML = '';

    if (pageItems.length === 0) {
      if (publicationsEmptyState) publicationsEmptyState.hidden = false;
    } else {
      if (publicationsEmptyState) publicationsEmptyState.hidden = true;

      pageItems.forEach((pub) => {
        const card = document.createElement('div');
        card.className = 'admin-pub-card';
        card.innerHTML = `
          <img class="admin-pub-card__image" src="${escapeHtml(pub.image || '/assets/media/publications/default-publication.svg')}" alt="${escapeHtml(pub.title)}" />
          <div class="admin-pub-card__body">
            <div class="admin-pub-card__title">${escapeHtml(pub.title)}</div>
            <div class="admin-pub-card__location">${escapeHtml(pub.location)}</div>
            <div class="admin-pub-card__author">Por ${escapeHtml(pub.author.name)}</div>
            <div class="admin-pub-card__stats">
              <span>❤️ ${escapeHtml(pub.likeCount ?? 0)}</span>
              <span>💬 ${escapeHtml(pub.commentCount ?? 0)}</span>
            </div>
          </div>
        `;
        card.addEventListener('click', () => openPublicationDetail(pub.id));
        publicationsGrid.appendChild(card);
      });
    }

    if (publicationsPageInfo) publicationsPageInfo.textContent = `Página ${publicationsPage} de ${totalPages}`;
    if (publicationsPrevPage) publicationsPrevPage.disabled = publicationsPage <= 1;
    if (publicationsNextPage) publicationsNextPage.disabled = publicationsPage >= totalPages;
  }

  publicationsSearchInput?.addEventListener('input', applyPublicationFilters);

  publicationsPrevPage?.addEventListener('click', () => {
    if (publicationsPage > 1) { publicationsPage--; renderPublicationsGrid(); }
  });
  publicationsNextPage?.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(publicationsFiltered.length / PUBLICATIONS_PER_PAGE));
    if (publicationsPage < totalPages) { publicationsPage++; renderPublicationsGrid(); }
  });

  function openPublicationDetail(pubId) {
    const pub = state.publications.find((p) => p.id === pubId);
    if (!pub || !publicationDetailCard) return;

    publicationDetailCard.innerHTML = `
      <div class="admin-detail-head">
        <div class="admin-detail-head__avatar">
          <img src="${escapeHtml(pub.image || '/assets/media/publications/default-publication.svg')}" alt="${escapeHtml(pub.title)}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
        <div>
          <h2>${escapeHtml(pub.title)}</h2>
          <p>Por ${escapeHtml(pub.author.name)}</p>
        </div>
      </div>
      <div class="admin-detail-rows">
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Ubicación</span>
          <span class="admin-detail-row__value">${escapeHtml(pub.location)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Publicado</span>
          <span class="admin-detail-row__value">${formatDate(pub.createdAt)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Likes</span>
          <span class="admin-detail-row__value">❤️ ${escapeHtml(pub.likeCount ?? 0)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Comentarios</span>
          <span class="admin-detail-row__value">💬 ${escapeHtml(pub.commentCount ?? 0)}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Descripción</span>
          <span class="admin-detail-row__value">${escapeHtml(pub.description)}</span>
        </div>
      </div>
      <div class="admin-detail-actions">
        ${pub.canDelete ? `<button type="button" class="admin-btn admin-btn--danger" id="detailDeletePubBtn">Eliminar publicación</button>` : ''}
      </div>
    `;

    document.getElementById('detailDeletePubBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Eliminar publicación',
        text: `"${pub.title}" se eliminará de forma permanente.`,
        onConfirm: () => deletePublicationAction(pub.id)
      });
    });

    showDetailView('publicaciones');
  }

  async function deletePublicationAction(pubId) {
    try {
      await apiFetch(`/api/publications/${pubId}`, { method: 'DELETE' });
      state.publications = state.publications.filter((p) => p.id !== pubId);
      applyPublicationFilters();
      showToast('Publicación eliminada.', 'success');
      showListView('publicaciones');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function loadPublications() {
    try {
      const data = await apiFetch('/api/publications');
      state.publications = data.publications;
      applyPublicationFilters();
    } catch (error) {
      showToast('No se pudieron cargar las publicaciones.', 'error');
    }
  }

  const teamListBody = document.getElementById('teamListBody');
  const teamDetailCard = document.getElementById('teamDetailCard');
  const openCreateAdminBtn = document.getElementById('openCreateAdminBtn');
  const createAdminOverlay = document.getElementById('createAdminOverlay');
  const createAdminForm = document.getElementById('createAdminForm');
  const closeCreateAdminBtn = document.getElementById('closeCreateAdminBtn');
  const createAdminStatus = document.getElementById('createAdminStatus');
  const newAdminPasswordInput = document.getElementById('newAdminPassword');
  const adminPasswordStrengthEl = document.getElementById('adminPasswordStrength');

  function passwordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 3);
  }

  newAdminPasswordInput?.addEventListener('input', () => {
    if (!adminPasswordStrengthEl) return;
    const strength = passwordStrength(newAdminPasswordInput.value);
    const bars = adminPasswordStrengthEl.querySelectorAll('span');

    adminPasswordStrengthEl.setAttribute('data-strength', String(strength));

    if (window.gsap && !reduceMotion) {
      bars.forEach((bar, index) => {
        gsap.to(bar, { scaleX: index < strength ? 1 : .3, duration: .3, ease: 'power2.out' });
      });
    }
  });

  function renderTeamGrid() {
    if (!teamListBody) return;

    const team = state.users.filter((u) => u.role === 'Admin' || u.role === 'Fundador');
    teamListBody.innerHTML = '';

    team.forEach((user) => {
      const card = document.createElement('div');
      card.className = 'admin-team-card';
      card.innerHTML = `
        <div class="admin-team-card__avatar">${avatarCellHtml(user)}</div>
        <div class="admin-team-card__name">${escapeHtml(user.name)}</div>
        <div class="admin-team-card__email">${escapeHtml(user.email)}</div>
        <span class="admin-badge ${roleBadgeClass(user.role)}">${user.role}</span>
      `;
      card.addEventListener('click', () => openTeamDetail(user.id));
      teamListBody.appendChild(card);
    });
  }

  function openTeamDetail(userId) {
    const user = state.users.find((u) => u.id === userId);
    if (!user || !teamDetailCard) return;

    const perms = canActOnUser(user);

    teamDetailCard.innerHTML = `
      <div class="admin-detail-head">
        <div class="admin-detail-head__avatar">${avatarCellHtml(user)}</div>
        <div>
          <h2>${escapeHtml(user.name)}</h2>
          <p>${escapeHtml(user.email)}</p>
        </div>
      </div>
      <div class="admin-detail-rows">
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Rol</span>
          <span class="admin-detail-row__value"><span class="admin-badge ${roleBadgeClass(user.role)}">${user.role}</span></span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Estado</span>
          <span class="admin-detail-row__value"><span class="admin-badge ${statusBadgeClass(user.status)}">${user.status}</span></span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Registrado</span>
          <span class="admin-detail-row__value">${formatDate(user.createdAt)}</span>
        </div>
      </div>
      <div class="admin-detail-actions">
        ${perms.canDemote ? `<button type="button" class="admin-btn admin-btn--ghost" id="teamDemoteBtn">Quitar rol Admin</button>` : ''}
        ${perms.canDelete ? `<button type="button" class="admin-btn admin-btn--danger" id="teamDeleteBtn">Eliminar administrador</button>` : ''}
      </div>
    `;

    document.getElementById('teamDemoteBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Quitar rol de administrador',
        text: `${user.name} volverá a ser un usuario normal.`,
        onConfirm: async () => {
          await demoteUser(user.id);
          renderTeamGrid();
        }
      });
    });

    document.getElementById('teamDeleteBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Eliminar administrador',
        text: `Esta acción elimina la cuenta de ${user.name} de forma permanente.`,
        onConfirm: async () => {
          await deleteAdminUser(user.id);
          renderTeamGrid();
        }
      });
    });

    showDetailView('equipo');
  }

  function openCreateAdminDrawer() {
    if (!createAdminOverlay) return;
    createAdminOverlay.classList.add('is-visible');

    const drawerPanel = createAdminOverlay.querySelector('.admin-drawer');
    const fields = createAdminOverlay.querySelectorAll('.admin-drawer__head, .admin-input-group, .admin-drawer__footer');

    if (!window.gsap || reduceMotion) {
      if (createAdminOverlay) createAdminOverlay.style.opacity = '1';
      if (drawerPanel) drawerPanel.style.transform = 'translateX(0)';
      return;
    }

    gsap.set(drawerPanel, { x: '100%' });
    gsap.set(fields, { opacity: 0, y: 14 });

    const tl = gsap.timeline();
    tl.to(createAdminOverlay, { opacity: 1, duration: .25, ease: 'power1.out' }, 0);
    tl.to(drawerPanel, { x: '0%', duration: .5, ease: 'power3.out' }, 0);
    tl.to(fields, { opacity: 1, y: 0, duration: .4, stagger: .06, ease: 'power2.out' }, .15);
  }

  function closeCreateAdminDrawer() {
    if (!createAdminOverlay) return;

    const drawerPanel = createAdminOverlay.querySelector('.admin-drawer');

    const finish = () => {
      createAdminOverlay.classList.remove('is-visible');
      createAdminForm?.reset();
      if (createAdminStatus) { createAdminStatus.textContent = ''; createAdminStatus.removeAttribute('data-kind'); }
      if (adminPasswordStrengthEl) {
        adminPasswordStrengthEl.removeAttribute('data-strength');
        adminPasswordStrengthEl.querySelectorAll('span').forEach((bar) => {
          if (window.gsap) gsap.set(bar, { scaleX: .3 });
        });
      }
    };

    if (!window.gsap || reduceMotion) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.to(drawerPanel, { x: '100%', duration: .35, ease: 'power2.in' }, 0);
    tl.to(createAdminOverlay, { opacity: 0, duration: .25, ease: 'power1.in' }, .1);
  }

  openCreateAdminBtn?.addEventListener('click', openCreateAdminDrawer);
  closeCreateAdminBtn?.addEventListener('click', closeCreateAdminDrawer);
  createAdminOverlay?.addEventListener('click', (event) => {
    if (event.target === createAdminOverlay) closeCreateAdminDrawer();
  });

  createAdminForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(createAdminForm);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const result = await apiFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      state.users.push(result.user);
      applyUserFilters();
      renderTeamGrid();
      showToast('Administrador creado.', 'success');
      closeCreateAdminDrawer();
      refreshAll();
    } catch (error) {
      if (createAdminStatus) {
        createAdminStatus.textContent = error.message;
        createAdminStatus.setAttribute('data-kind', 'error');
      }
    }
  });

  const adminConfirmOverlay = document.getElementById('adminConfirmOverlay');
  const adminConfirmTitle = document.getElementById('adminConfirmTitle');
  const adminConfirmText = document.getElementById('adminConfirmText');
  const adminConfirmCancel = document.getElementById('adminConfirmCancel');
  const adminConfirmAccept = document.getElementById('adminConfirmAccept');
  const adminConfirmReasonGroup = document.getElementById('adminConfirmReasonGroup');
  const adminConfirmReasonInput = document.getElementById('adminConfirmReasonInput');

  let pendingConfirmAction = null;

  function confirmAction({ title, text, onConfirm, requireReason = false }) {
    if (!adminConfirmOverlay) return;
    if (adminConfirmTitle) adminConfirmTitle.textContent = title;
    if (adminConfirmText) adminConfirmText.textContent = text;
    if (adminConfirmReasonGroup) adminConfirmReasonGroup.hidden = !requireReason;
    if (adminConfirmReasonInput) adminConfirmReasonInput.value = '';

    pendingConfirmAction = requireReason
      ? (reason) => onConfirm(reason)
      : onConfirm;

    adminConfirmOverlay.classList.add('is-visible');
  }

  function closeConfirmModal() {
    adminConfirmOverlay?.classList.remove('is-visible');
    pendingConfirmAction = null;
    if (adminConfirmReasonGroup) adminConfirmReasonGroup.hidden = true;
    if (adminConfirmReasonInput) adminConfirmReasonInput.value = '';
  }

  adminConfirmCancel?.addEventListener('click', closeConfirmModal);
  adminConfirmOverlay?.addEventListener('click', (event) => {
    if (event.target === adminConfirmOverlay) closeConfirmModal();
  });
  adminConfirmAccept?.addEventListener('click', async () => {
    const action = pendingConfirmAction;
    const reasonVisible = adminConfirmReasonGroup && !adminConfirmReasonGroup.hidden;

    if (reasonVisible) {
      const reason = (adminConfirmReasonInput?.value || '').trim();
      if (!reason) {
        showToast('Debes indicar el motivo de la suspensión.', 'error');
        return;
      }
      closeConfirmModal();
      if (action) await action(reason);
    } else {
      closeConfirmModal();
      if (action) await action();
    }
  });

  const appealsBadge = document.getElementById('appealsBadge');
  const appealsFilter = document.getElementById('appealsFilter');
  const appealsListBody = document.getElementById('appealsListBody');
  const appealsEmptyState = document.getElementById('appealsEmptyState');
  const appealDetailCard = document.getElementById('appealDetailCard');

  function renderAppealsBadge() {
    if (!appealsBadge) return;
    const count = state.appeals ? state.appeals.valid.filter((a) => !a.reviewedAt).length : 0;
    if (count > 0) {
      appealsBadge.textContent = count > 99 ? '99+' : String(count);
      appealsBadge.hidden = false;
    } else {
      appealsBadge.hidden = true;
    }
  }

  function getFilteredAppeals() {
    const filter = appealsFilter?.value || 'unreviewed';
    if (!state.appeals) return [];

    if (filter === 'unresolved') return state.appeals.invalid;
    if (filter === 'reviewed') return state.appeals.valid.filter((a) => a.reviewedAt);
    if (filter === 'all') return state.appeals.valid;
    return state.appeals.valid.filter((a) => !a.reviewedAt);
  }

  function renderAppealsList() {
    if (!appealsListBody) return;

    const items = getFilteredAppeals();
    appealsListBody.innerHTML = '';

    if (items.length === 0) {
      if (appealsEmptyState) appealsEmptyState.hidden = false;
    } else {
      if (appealsEmptyState) appealsEmptyState.hidden = true;

      items.forEach((appeal) => {
        const card = document.createElement('div');
        card.className = 'admin-appeal-card' + (!appeal.reviewedAt && appeal.isValid ? ' admin-appeal-card--unreviewed' : '');
        card.innerHTML = `
          <div class="admin-appeal-card__avatar">${appealInitials(appeal.userName || appeal.email)}</div>
          <div class="admin-appeal-card__body">
            <div class="admin-appeal-card__email">${escapeHtml(appeal.userName || appeal.email)}</div>
            <div class="admin-appeal-card__excerpt">${escapeHtml(appeal.message)}</div>
          </div>
          <div class="admin-appeal-card__meta">
            <span class="admin-badge ${appeal.isValid ? 'admin-badge--status-activo' : 'admin-badge--status-suspendido'}">${appeal.isValid ? 'Válida' : 'Sin resolver'}</span>
            <span class="admin-appeal-card__date">${formatDateTime(appeal.createdAt)}</span>
          </div>
        `;
        card.addEventListener('click', () => openAppealDetail(appeal.id, appeal.isValid));
        appealsListBody.appendChild(card);
      });
    }
  }

  appealsFilter?.addEventListener('change', renderAppealsList);

  async function openAppealDetail(appealId, isValid) {
    if (!appealDetailCard) return;

    let appeal = state.appeals.valid.find((a) => a.id === appealId) || state.appeals.invalid.find((a) => a.id === appealId);
    if (!appeal) return;

    if (isValid && !appeal.reviewedAt) {
      try {
        const result = await apiFetch(`/api/admin/appeals/${appealId}/review`, { method: 'PATCH' });
        const idx = state.appeals.valid.findIndex((a) => a.id === appealId);
        if (idx !== -1) state.appeals.valid[idx] = result.appeal;
        appeal = result.appeal;
        renderAppealsBadge();
      } catch (error) {
        showToast(error.message, 'error');
      }
    }

    const relatedUser = isValid ? state.users.find((u) => u.id === appeal.userId) : null;

    appealDetailCard.innerHTML = `
      <div class="admin-detail-head">
        <div class="admin-detail-head__avatar">${appealInitials(appeal.userName || appeal.email)}</div>
        <div>
          <h2>${escapeHtml(appeal.userName || appeal.email)}</h2>
          <p>${escapeHtml(appeal.email)}</p>
        </div>
      </div>
      <div class="admin-detail-rows">
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Estado</span>
          <span class="admin-detail-row__value"><span class="admin-badge ${appeal.isValid ? 'admin-badge--status-activo' : 'admin-badge--status-suspendido'}">${appeal.isValid ? 'Válida' : 'Sin resolver'}</span></span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-row__label">Enviada</span>
          <span class="admin-detail-row__value">${formatDateTime(appeal.createdAt)}</span>
        </div>
      </div>
      <div class="admin-appeal-detail__message">${escapeHtml(appeal.message)}</div>
      <div class="admin-detail-actions" style="margin-top:1.4rem;">
        ${(isValid && relatedUser && relatedUser.status === 'Suspendido') ? `<button type="button" class="admin-btn admin-btn--jade" id="appealReactivateBtn">Reactivar cuenta</button>` : ''}
      </div>
    `;

    document.getElementById('appealReactivateBtn')?.addEventListener('click', () => {
      confirmAction({
        title: 'Reactivar usuario',
        text: `${relatedUser.name} podrá volver a acceder al sitio.`,
        onConfirm: async () => {
          await setUserStatus(relatedUser.id, 'activo');
          showListView('apelaciones');
        }
      });
    });

    showDetailView('apelaciones');
  }

  async function loadAppeals() {
    try {
      const data = await apiFetch('/api/admin/appeals');
      state.appeals = data;
      renderAppealsBadge();
      renderAppealsList();
    } catch (error) {
      showToast('No se pudieron cargar las apelaciones.', 'error');
    }
  }

  // ── Comentarios reportados (bloqueados por el filtro de lenguaje ofensivo) ──

  const commentsBadge = document.getElementById('commentsBadge');
  const commentsListBody = document.getElementById('commentsListBody');
  const commentsEmptyState = document.getElementById('commentsEmptyState');

  function renderCommentsBadge() {
    if (!commentsBadge) return;
    const count = state.flaggedComments ? state.flaggedComments.length : 0;
    if (count > 0) {
      commentsBadge.textContent = count > 99 ? '99+' : String(count);
      commentsBadge.hidden = false;
    } else {
      commentsBadge.hidden = true;
    }
  }

  function renderCommentsList() {
    if (!commentsListBody) return;

    const items = state.flaggedComments || [];
    commentsListBody.innerHTML = '';

    if (items.length === 0) {
      if (commentsEmptyState) commentsEmptyState.hidden = false;
      return;
    }
    if (commentsEmptyState) commentsEmptyState.hidden = true;

    items.forEach((comment) => {
      const card = document.createElement('div');
      card.className = 'admin-comment-card';
      card.innerHTML = `
        <div class="admin-comment-card__meta">
          <span class="admin-comment-card__author">${escapeHtml(comment.author.name)}</span>
          <span class="admin-comment-card__publication">${escapeHtml(comment.publication.title)}</span>
          <span class="admin-comment-card__date">${formatDateTime(comment.createdAt)}</span>
        </div>
        <div class="admin-comment-card__text">${escapeHtml(comment.text)}</div>
        <div class="admin-comment-card__reason">${escapeHtml(comment.flagReason || '')}</div>
        <div class="admin-comment-card__actions">
          <button type="button" class="admin-btn admin-btn--jade" data-action="approve">Aprobar (falso positivo)</button>
          <button type="button" class="admin-btn admin-btn--danger" data-action="delete">Eliminar definitivamente</button>
        </div>
      `;

      card.querySelector('[data-action="approve"]')?.addEventListener('click', () => approveFlaggedComment(comment.id));
      card.querySelector('[data-action="delete"]')?.addEventListener('click', () => {
        confirmAction({
          title: 'Eliminar comentario',
          text: 'Este comentario se eliminará de forma permanente.',
          onConfirm: () => deleteFlaggedComment(comment.id)
        });
      });

      commentsListBody.appendChild(card);
    });
  }

  async function approveFlaggedComment(commentId) {
    try {
      await apiFetch(`/api/admin/comments/${commentId}/approve`, { method: 'PATCH' });
      state.flaggedComments = state.flaggedComments.filter((c) => c.id !== commentId);
      renderCommentsBadge();
      renderCommentsList();
      showToast('Comentario aprobado y publicado.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function deleteFlaggedComment(commentId) {
    try {
      await apiFetch(`/api/admin/comments/${commentId}`, { method: 'DELETE' });
      state.flaggedComments = state.flaggedComments.filter((c) => c.id !== commentId);
      renderCommentsBadge();
      renderCommentsList();
      showToast('Comentario eliminado.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function loadFlaggedComments() {
    try {
      const data = await apiFetch('/api/admin/comments/flagged');
      state.flaggedComments = data.comments;
      renderCommentsBadge();
      renderCommentsList();
    } catch (error) {
      showToast('No se pudieron cargar los comentarios reportados.', 'error');
    }
  }

  async function refreshAll() {
    await Promise.all([
      loadMetrics(),
      loadUsers(),
      loadPublications(),
      loadAppeals(),
      loadFlaggedComments()
    ]);
  }

  refreshAll();
  loadCurrentUser();

});

/* ============================================================
   Blindaje contra el botón "atrás/adelante" del navegador (BFCache)
   Si el panel se restaura desde bfcache tras cerrar sesión (o con
   un rol que ya no es admin/fundador), se fuerza una recarga real.
   ============================================================ */
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;

  fetch('/auth/status', { credentials: 'same-origin', cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      const isAdmin = data.loggedIn && data.user && (data.user.role === 'Admin' || data.user.role === 'Fundador');
      if (!isAdmin) {
        window.location.reload();
      }
    })
    .catch(() => {
      window.location.reload();
    });
});