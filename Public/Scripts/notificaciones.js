let username = localStorage.getItem('username');
let notificacionIcono = document.getElementById('notificacion-icono');
let notificacionesOverlay = document.getElementById('notificaciones-overlay');
let listaNotificaciones = document.getElementById('lista-notificaciones');

function enviarSolicitudReclamacion(objeto) {
  let { id, nombre, caracteristicas, publicadoPor } = objeto;
  
  postData('solicitarReclamacion', {
    publicador: publicadoPor.nombre,
    solicitante: username,
    objetoId: id,
    datosObjeto: { nombre, caracteristicas }
  }, (response) => {
    if (response.success) {
      alert('Solicitud enviada al publicador');
    } else {
      alert(response.message);
    }
  });
}

function mostrarSolicitudesReclamacion(solicitudes) {
  listaNotificaciones.innerHTML = solicitudes.length === 0 
    ? '<p>No tienes solicitudes de reclamación</p>'
    : solicitudes.map(solicitud => `
    <div class="solicitud-reclamacion">
      <h3>Solicitud de Reclamación</h3>
      <p>Objeto: ${solicitud.datosObjeto.nombre}</p>
      <p>Características: ${solicitud.datosObjeto.caracteristicas}</p>
      <p>Solicitante: ${solicitud.solicitante}</p>
      <div class="acciones-solicitud">
        <button onclick="responderSolicitud(${solicitud.objetoId}, true)">Aceptar</button>
        <button onclick="responderSolicitud(${solicitud.objetoId}, false)">Rechazar</button>
      </div>
    </div>
  `).join('');
}

function responderSolicitud(objetoId, aceptar) {
  postData('responderSolicitudReclamacion', {
    publicador: username,
    objetoId,
    aceptar
  }, (response) => {
    if (response.success) {
      alert(aceptar ? 'Reclamación aceptada' : 'Reclamación rechazada');
      verificarNotificaciones();
    }
  });
}

function verificarNotificaciones() {
  if (!username) return;

  postData('obtenerSolicitudesReclamacion', { username }, (solicitudes) => {
    let pendientes = solicitudes.filter(s => s.estado === 'pendiente');
    
    if (pendientes.length > 0) {
      notificacionIcono.classList.add('activa');
      mostrarSolicitudesReclamacion(pendientes);
    } else {
      notificacionIcono.classList.remove('activa');
      listaNotificaciones.innerHTML = '<p>No tienes solicitudes de reclamación</p>';
    }
  });
}

notificacionIcono.addEventListener('click', () => {
  notificacionesOverlay.style.display = 
    notificacionesOverlay.style.display === 'none' ? 'flex' : 'none';
});

setInterval(verificarNotificaciones, 30000);
verificarNotificaciones();