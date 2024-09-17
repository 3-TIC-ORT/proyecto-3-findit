import fs from "fs";
import { onEvent, sendEvent, startServer } from "soquetic";

onEvent("publicarObjeto", (data) => {
  let objetos = JSON.parse(fs.readFileSync("/data/data.json", "utf8"));
  
  objetos.objetos.push({
    nombre: data.nombre,
    caracteristicas: data.caracteristicas,
    lugarEncontrado: data.lugarEncontrado,
    lugarDejado: data.lugarDejado
  });
  
  fs.writeFileSync("/data/data.json", JSON.stringify(objetos, null, 2));
  
  return { status: "Objeto publicado" };
});

onEvent("buscarObjeto", (data) => {
  let objetos = JSON.parse(fs.readFileSync("/data/data.json", "utf8"));
  
  let resultados = objetos.objetos.filter(obj => 
    obj.nombre.includes(data.busqueda) || obj.caracteristicas.includes(data.busqueda)
  );
  
  return resultados;
});

startServer();
