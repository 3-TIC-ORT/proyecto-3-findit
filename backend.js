import fs from "fs";
import { onEvent, startServer, sendEvent } from "soquetic";

const datos = "data/data.json";

function leerDatos() {
  let data = fs.readFileSync(datos, "utf8");
  return JSON.parse(data);
}

function escribirDatos(data) {
  fs.writeFileSync(datos, JSON.stringify(data, null, 2));
}



onEvent("obtenerObjetos", () => leerDatos());

onEvent("publicarObjeto", (nuevoObjeto) => {
  let datos = leerDatos();
  datos.push(nuevoObjeto);
  escribirDatos(datos);
});

function filtrarDatos(input){
  let datos = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  let objetosEncontrados = [];
  for (const objeto of datos){
    if(objeto.nombre == input){     
      objetosEncontrados.push(objeto)
    }
    
  }
  return (objetosEncontrados);
}

onEvent("buscarObjeto", filtrarDatos)
startServer();
