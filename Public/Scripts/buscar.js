let button = document.getElementById("buscar-button");

function buscar(){
    let nombre = document.getElementById("buscador-form").value;
    postData("buscarObjeto", nombre, (objetos) => {
        mostrarResultados(objetos);
    });
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
        `;

        resultadosDiv.appendChild(objetoDiv);
    });
}

button.addEventListener("click", buscar);
