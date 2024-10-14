let button = document.getElementById("buscar-button");
let reclamarButton = document.getElementById("reclamar-button");
let nombreInput = document.getElementById("reclamo-nombre");
let apellidoInput = document.getElementById("reclamo-apellido");
let reclamoSection = document.getElementById("reclamo-section");
let objetoSeleccionado = null;

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

        objetoDiv.innerHTML = `
            <h2>${objeto.nombre}</h2>
            <p><strong>Características:</strong> ${objeto.caracteristicas}</p>
            <p><strong>Lugar Encontrado:</strong> ${objeto.lugarEncontrado}</p>
            <p><strong>Lugar Dejado:</strong> ${objeto.lugarDejado}</p>
            <button onclick="seleccionarObjeto(${objeto.id})">Seleccionar</button>
        `;

        resultadosDiv.appendChild(objetoDiv);
    });
}

function seleccionarObjeto(id) {
    objetoSeleccionado = { id };
    reclamoSection.style.display = "block";
}

button.addEventListener("click", buscar);
reclamarButton.addEventListener("click", reclamarObjeto);
