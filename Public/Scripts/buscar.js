let button = document.getElementById("buscar-button");
let reclamarButton = document.getElementById("reclamar-button");
let nombreInput = document.getElementById("reclamo-nombre");
let apellidoInput = document.getElementById("reclamo-apellido");
let reclamoSection = document.getElementById("reclamo-section");
let objetoSeleccionado = null;
let username = localStorage.getItem('username');

let edicionOverlay = document.getElementById("edicion-overlay");
let cerrarEdicion = document.getElementById("cerrar-edicion");
let guardarCambios = document.getElementById("guardar-cambios");
let eliminarObjeto = document.getElementById("eliminar-objeto");
let edicionNombre = document.getElementById("edicion-nombre");
let edicionCaracteristicas = document.getElementById("edicion-caracteristicas");
let edicionLugarEncontrado = document.getElementById("edicion-lugar-encontrado");
let edicionLugarDejado = document.getElementById("edicion-lugar-dejado");

function buscar() {
    let nombre = document.getElementById("buscador-form").value;
    postData("buscarObjeto", nombre, (objetos) => {
        mostrarResultados(objetos);
    });
}

function reclamarObjeto() {
    let nombre = nombreInput.value;
    let apellido = apellidoInput.value;

    if (objetoSeleccionado && nombre && apellido) {
        postData("reclamarObjeto", { id: objetoSeleccionado.id, nombre, apellido }, (response) => {
            alert(response.message);
            if (response.success) {
                buscar();
                reclamoSection.style.display = "none";
            }
        });
    } else {
        alert("Por favor, complete el nombre y apellido");
    }
}

function mostrarResultados(objetos) {
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
  
    objetos.forEach(objeto => {
      let objetoDiv = document.createElement("div");
      objetoDiv.classList.add("result-box");
  
      let publicadoPorTexto = objeto.publicadoPor.nombre;
      let botonesEdicion = '';
      let botonReclamar = '';
  
  
      if (username === publicadoPorTexto) {
        botonesEdicion = `
          <button onclick="editarObjeto(${objeto.id}, '${objeto.nombre}', '${objeto.caracteristicas}', '${objeto.lugarEncontrado}', '${objeto.lugarDejado}')">
            Editar
          </button>
        `;
      }
  
      objetoDiv.innerHTML = `
        <h2>${objeto.nombre}</h2>
        <p><strong>Características:</strong> ${objeto.caracteristicas}</p>
        <p><strong>Lugar Encontrado:</strong> ${objeto.lugarEncontrado}</p>
        <p><strong>Lugar Dejado:</strong> ${objeto.lugarDejado}</p>
        <p><strong>Publicado por:</strong> ${publicadoPorTexto}</p>
        ${objeto.imagen ? `<img src="${objeto.imagen}" alt="Imagen del objeto" style="max-width: 100%; height: auto;">` : ""}
        ${botonReclamar}
        ${botonesEdicion}
      `;
  
      resultadosDiv.appendChild(objetoDiv);
    });
  }

function seleccionarObjeto(id) {
    objetoSeleccionado = { id };
    reclamoSection.style.display = "block";
}

function editarObjeto(id, nombre, caracteristicas, lugarEncontrado, lugarDejado) {
    objetoSeleccionado = { id };
    
    edicionNombre.value = nombre;
    edicionCaracteristicas.value = caracteristicas;
    edicionLugarEncontrado.value = lugarEncontrado;
    edicionLugarDejado.value = lugarDejado;
    
    edicionOverlay.style.display = "flex";
}

cerrarEdicion.addEventListener("click", () => {
    edicionOverlay.style.display = "none";
});

guardarCambios.addEventListener("click", () => {
    let objetoEditado = {
        id: objetoSeleccionado.id,
        nombre: edicionNombre.value,
        caracteristicas: edicionCaracteristicas.value,
        lugarEncontrado: edicionLugarEncontrado.value,
        lugarDejado: edicionLugarDejado.value
    };

    postData("editarObjeto", objetoEditado, (response) => {
        if (response.success) {
            alert("Objeto editado exitosamente");
            edicionOverlay.style.display = "none";
            buscar(); 
        } else {
            alert("Error al editar el objeto");
        }
    });
});

eliminarObjeto.addEventListener("click", () => {
    if (objetoSeleccionado && username) {
        postData("eliminarObjeto", { 
            id: objetoSeleccionado.id, 
            username: username 
        }, (response) => {
            if (response.success) {
                alert("Objeto eliminado exitosamente");
                edicionOverlay.style.display = "none";
                buscar();
            } else {
                alert(response.message || "Error al eliminar el objeto");
            }
        });
    }
});

button.addEventListener("click", buscar);
reclamarButton.addEventListener("click", reclamarObjeto);