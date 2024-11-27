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

document.getElementById("publicar-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const archivo = formData.get("foto");
  const base64Promise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(archivo);
  });

  const nuevoObjeto = {
    nombre: formData.get("filename"),
    caracteristicas: formData.get("caracteristicas"),
    lugarEncontrado: formData.get("lugarEncontrado"),
    lugarDejado: formData.get("lugarDejado"),
    nombrePublicador: formData.get("nombre"),
    apellidoPublicador: formData.get("apellido"),
    archivoBase64: await base64Promise,
  };

  try {
    await postData("publicarObjeto", nuevoObjeto);
    alert("Objeto publicado exitosamente.");
  } catch (error) {
    console.error("Error al publicar el objeto:", error);
    alert("Hubo un error al publicar el objeto.");
  }
});

