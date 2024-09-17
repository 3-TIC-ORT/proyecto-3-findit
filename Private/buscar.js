import { postData } from "soquetic";

let buscarBtn = document.getElementById("buscar-button");

buscarBtn.onclick = function () {
  let busqueda = document.getElementById("buscador-form").value;
  
  postData("buscarObjeto", { busqueda: busqueda }, (resultados) => {
    let contenedor = document.getElementById("resultados");
    contenedor.innerHTML = ""; 
    
    resultados.forEach(obj => {
      let item = document.createElement("div");
      item.className = "objeto";
      item.innerHTML = `
        <h3>${obj.nombre}</h3>
        <p>${obj.caracteristicas}</p>
        <p>Encontrado en: ${obj.lugarEncontrado}</p>
        <p>Dejado en: ${obj.lugarDejado}</p>
      `;
      contenedor.appendChild(item);
    });
  });
};
