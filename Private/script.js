document.getElementById('publicar-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('filename').value;
    let caracteristicas = document.getElementById('caracteristicas').value;
    let lugarEncontrado = document.getElementById('lugarEncontrado').value;
    let lugarDejado = document.getElementById('lugarDejado').value;

    let objeto = {
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
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al publicar el objeto');
    });
});
