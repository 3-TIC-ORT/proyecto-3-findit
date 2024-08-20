function publicarObjeto() {
    const nombre = document.getElementById('filename').value;
    const caracteristicas = document.getElementById('caracteristicas').value;
    const lugarEncontrado = document.getElementById('lugarEncontrado').value;
    const lugarDejado = document.getElementById('lugarDejado').value;

    const objeto = {
        nombre: nombre,
        caracteristicas: caracteristicas,
        lugarEncontrado: lugarEncontrado,
        lugarDejado: lugarDejado
    };

    fetch('http://127.0.0.1:5500/publicar.html', {  // Asegúrate de que la URL apunta al servidor Node.js
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert('Hubo un error al publicar el objeto');
        console.error('Error:', error);
    });
}
