import SoqueTIC from 'soquetic';

let socket = new SoqueTIC.Client('http://localhost:3000');

document.getElementById('publicar-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('filename').value;
    let caracteristicas = document.getElementById('caracteristicas').value;
    let lugarEncontrado = document.getElementById('lugarEncontrado').value;
    let lugarDejado = document.getElementById('lugarDejado').value;

    socket.emit('publicar', {
        nombre: nombre,
        caracteristicas: caracteristicas,
        lugarEncontrado: lugarEncontrado,
        lugarDejado: lugarDejado
    });

    socket.on('publicar-respuesta', (response) => {
        alert(response.mensaje);
    });
});
