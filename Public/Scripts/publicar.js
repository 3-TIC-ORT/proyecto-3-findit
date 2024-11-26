document.getElementById("publicar-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  let username = localStorage.getItem('username');
  let nombre = document.getElementById("filename").value;
  let caracteristicas = document.getElementById("caracteristicas").value;
  let lugarEncontrado = document.getElementById("lugarEncontrado").value;
  let lugarDejado = document.getElementById("lugarDejado").value;

  let nuevoObjeto = {
    nombre,
    caracteristicas,
    lugarEncontrado,
    lugarDejado,
    publicadoPor: {
      nombre: username
    }
  };

  try {
    await postData("publicarObjeto", nuevoObjeto); 
    alert("Objeto publicado exitosamente."); 
  } catch (error) {
    alert("Error al publicar el objeto."); 
  }
});