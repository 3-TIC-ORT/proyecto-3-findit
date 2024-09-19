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
  datos.objetos.push(nuevoObjeto);
  escribirDatos(datos);
});

onEvent("buscarObjeto", (nombre)=>{
  let datos =leerDatos();
  datos.objetos.forEach(e => {
      if(e.nombre===nombre){
        return e
      }
  });
})

startServer();
