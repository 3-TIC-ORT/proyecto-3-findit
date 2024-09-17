import SoqueTIC from 'soquetic';

let socket = new SoqueTIC.Client('http://localhost:3000');

document.getElementById('buscar-button').addEventListener('click', function() {
    let query = document.getElementById('buscador-form').value;

    socket.emit('buscar', query);

    socket.on('buscar-respuesta', (resultados) => {
        let resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        resultados.forEach((objeto) => {
            let div = document.createElement('div');
            div.className = 'resultado';
            div.innerHTML = `<h3>${objeto.nombre}</h3><p>${objeto.caracteristicas}</p><p>Lugar Encontrado: ${objeto.lugarEncontrado}</p><p>Lugar Dejado: ${objeto.lugarDejado}</p>`;
            resultadosDiv.appendChild(div);
        });
    });
});
