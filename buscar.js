document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('buscador-form');
    const resultadosDiv = document.getElementById('resultados');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = form.query.value.toLowerCase();

        // Cargar el archivo JSON
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const objetos = data.objetos;
                const resultados = buscarObjeto(objetos, query);
                mostrarResultados(resultados);
            })
            .catch(error => console.error('Error cargando el archivo JSON:', error));
    });

    function buscarObjeto(objetos, query) {
        // Busca en los campos nombre, caracteristicas, lugarEncontrado y lugarDejado
        return objetos.filter(objeto => 
            objeto.nombre.toLowerCase().includes(query) ||
            objeto.caracteristicas.toLowerCase().includes(query) ||
            objeto.lugarEncontrado.toLowerCase().includes(query) ||
            objeto.lugarDejado.toLowerCase().includes(query)
        );
    }

    function mostrarResultados(resultados) {
        resultadosDiv.innerHTML = ''; // Limpia los resultados anteriores
        if (resultados.length === 0) {
            resultadosDiv.innerHTML = '<p>No se encontraron objetos.</p>';
        } else {
            resultados.forEach(objeto => {
                const objetoDiv = document.createElement('div');
                objetoDiv.className = 'objeto';
                objetoDiv.innerHTML = `
                    <h3>${objeto.nombre}</h3>
                    <p><strong>Características:</strong> ${objeto.caracteristicas}</p>
                    <p><strong>Lugar Encontrado:</strong> ${objeto.lugarEncontrado}</p>
                    <p><strong>Lugar Dejado:</strong> ${objeto.lugarDejado}</p>
                `;
                resultadosDiv.appendChild(objetoDiv);
            });
        }
    }
});
