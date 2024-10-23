document.getElementById("publicar-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  let nombre = document.getElementById("filename").value;
  let caracteristicas = document.getElementById("caracteristicas").value;
  let lugarEncontrado = document.getElementById("lugarEncontrado").value;
  let lugarDejado = document.getElementById("lugarDejado").value;
  let nombrePersona = document.getElementById("nombre").value;
  let apellidoPersona = document.getElementById("apellido").value;

  let nuevoObjeto = {
    nombre,
    caracteristicas,
    lugarEncontrado,
    lugarDejado,
    publicadoPor: {
      nombre: nombrePersona,
      apellido: apellidoPersona
    }
  };

  postData("publicarObjeto", nuevoObjeto).then(() => {
    alert("Objeto publicado exitosamente");
  }).catch(() => {
    alert("Error al publicar el objeto");
  });
});
