import { postData } from "soquetic";

let form = document.getElementById("publicar-form");

form.onsubmit = function (event) {
  event.preventDefault();
  
  let nombre = document.getElementById("filename").value;
  let caracteristicas = document.getElementById("caracteristicas").value;
  let lugarEncontrado = document.getElementById("lugarEncontrado").value;
  let lugarDejado = document.getElementById("lugarDejado").value;
  
  postData("publicarObjeto", {
    nombre: nombre,
    caracteristicas: caracteristicas,
    lugarEncontrado: lugarEncontrado,
    lugarDejado: lugarDejado
  }, (response) => {
    alert(response.status); 
  });
};
