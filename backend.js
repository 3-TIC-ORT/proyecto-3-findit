import fs from "fs";
import { onEvent, startServer } from "soquetic";

const datos = "data/data.json";
const logsFile = "data/logs.json";
let objetoIdCounter = 1;

function leerDatos() {
  let data = fs.readFileSync(datos, "utf8");
  return JSON.parse(data);
}

function escribirDatos(data) {
  fs.writeFileSync(datos, JSON.stringify(data, null, 2));
}

function leerLogs() {
  try {
    let data = fs.readFileSync(logsFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function escribirLogs(logs) {
  fs.writeFileSync(logsFile, JSON.stringify(logs, null, 2));
}

onEvent("obtenerObjetos", () => leerDatos());

onEvent("publicarObjeto", (nuevoObjeto) => {
  let datos = leerDatos();
  nuevoObjeto.id = objetoIdCounter++;
  datos.push(nuevoObjeto);
  escribirDatos(datos);
});

function reclamarObjeto(idObjeto, nombre, apellido) {
  let datos = leerDatos();
  let nuevosDatos = datos.filter(objeto => objeto.id !== idObjeto);
  escribirDatos(nuevosDatos);

  let logs = leerLogs();
  logs.push({ idObjeto, nombre, apellido, fecha: new Date().toISOString() });
  escribirLogs(logs);

  return datos.length !== nuevosDatos.length 
    ? { success: true, message: "Objeto reclamado exitosamente." } 
    : { success: false, message: "Objeto no encontrado." };
}

onEvent("reclamarObjeto", (data) => {
  const { id, nombre, apellido } = data;
  return reclamarObjeto(id, nombre, apellido);
});

onEvent("buscarObjeto", (input) => {
  let datos = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  let objetosEncontrados = [];
  for (const objeto of datos) {
    if (objeto.nombre === input) {
      objetosEncontrados.push(objeto);
    }
  }
  return objetosEncontrados;
});

startServer();
