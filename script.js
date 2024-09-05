function publicarObjeto() {
    nombre = document.getElementById('filename').value;
    caracteristicas = document.getElementById('caracteristicas').value;
    lugarEncontrado = document.getElementById('lugarEncontrado').value;
    lugarDejado = document.getElementById('lugarDejado').value;

    objeto = {
        nombre: nombre,
        caracteristicas: caracteristicas,
        lugarEncontrado: lugarEncontrado,
        lugarDejado: lugarDejado
    };

    fetch('http://localhost:4000/publicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        alert(data.message);
    })
    console.log("El objeto fue publicado exitosamente")
    .catch(function(error) {
        alert('Hubo un error al publicar el objeto');
        console.error('Error:', error);
    });
}
