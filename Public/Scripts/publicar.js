
document.getElementById('publicar-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombre = document.getElementById('filename').value;
  const caracteristicas = document.getElementById('caracteristicas').value;
  const lugarEncontrado = document.getElementById('lugarEncontrado').value;
  const lugarDejado = document.getElementById('lugarDejado').value;

  const nuevoObjeto = {
    nombre,
    caracteristicas,
    lugarEncontrado,
    lugarDejado
  };

  try {
    await postData('publicarObjeto', nuevoObjeto);
    alert('Objeto publicado exitosamente');
  } catch (error) {
    console.error('Error al publicar el objeto:', error);
    alert('Error al publicar el objeto');
  }
});
