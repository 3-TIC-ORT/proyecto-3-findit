document.addEventListener('DOMContentLoaded', function() {
    let buscadorInput = document.getElementById('buscador-form');
    let resultadosDiv = document.getElementById('resultados');
    let buscarButton = document.getElementById('buscar-button');

    buscarButton.addEventListener('click', function() {
        let query = buscadorInput.value.toLowerCase();

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                let objetos = data.objetos;
                let resultados = buscarObjeto(objetos, query);
                mostrarResultados(resultados);
            })
            .catch(error => console.error('Error cargando el archivo JSON:', error));
    });

    function buscarObjeto(objetos, query) {
        return objetos.filter(objeto => 
            objeto.nombre.toLowerCase().includes(query) ||
            objeto.caracteristicas.toLowerCase().includes(query) ||
            objeto.lugarEncontrado.toLowerCase().includes(query) ||
            objeto.lugarDejado.toLowerCase().includes(query)
        );
    }

    function mostrarResultados(resultados) {
        resultadosDiv.innerHTML = '';
        if (resultados.length === 0) {
            resultadosDiv.innerHTML = '<p>No se encontraron objetos.</p>';
        } else {
            resultados.forEach(objeto => {
                let objetoDiv = document.createElement('div');
                objetoDiv.className = 'grid-item';
                objetoDiv.innerHTML = `
                    <div class="description">
                        <h3>${objeto.nombre}</h3>
                        <p><strong>Características:</strong> ${objeto.caracteristicas}</p>
                        <p><strong>Lugar Encontrado:</strong> ${objeto.lugarEncontrado}</p>
                        <p><strong>Lugar Dejado:</strong> ${objeto.lugarDejado}</p>
                    </div>
                `;
                resultadosDiv.appendChild(objetoDiv);
            });
        }
    }
});
