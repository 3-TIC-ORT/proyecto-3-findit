import { postData } from 'soquetic';

document.getElementById('publicar-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('filename').value;
    const caracteristicas = document.getElementById('caracteristicas').value;
    const lugarEncontrado = document.getElementById('lugarEncontrado').value;
    const lugarDejado = document.getElementById('lugarDejado').value;

    const objeto = {
        nombre,
        caracteristicas,
        lugarEncontrado,
        lugarDejado
    };

    postData('publicarObjeto', objeto, (response) => {
        if (response.success) {
            alert('Objeto publicado exitosamente');
            document.getElementById('publicar-form').reset();
        } else {
            alert('Error al publicar el objeto');
        }
    });
});
