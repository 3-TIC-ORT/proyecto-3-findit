import { fetchData } from 'soquetic';

document.getElementById('buscar-button').addEventListener('click', () => {
    const nombreBusqueda = document.getElementById('buscador-form').value;

    fetchData('buscarObjeto', { nombre: nombreBusqueda }, (response) => {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        if (response.objetos.length > 0) {
            response.objetos.forEach(objeto => {
                const objetoDiv = document.createElement('div');
                objetoDiv.classList.add('resultado-item');
                objetoDiv.innerHTML = `
                    <h2>${objeto.nombre}</h2>
                    <p>Características: ${objeto.caracteristicas}</p>
                    <p>Lugar Encontrado: ${objeto.lugarEncontrado}</p>
                    <p>Lugar Dejado: ${objeto.lugarDejado}</p>
                `;
                resultadosDiv.appendChild(objetoDiv);
            });
        } else {
            resultadosDiv.innerHTML = '<p>No se encontraron objetos.</p>';
        }
    });
});
