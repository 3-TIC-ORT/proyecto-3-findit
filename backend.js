import fs from 'fs';
import { onEvent, startServer, sendEvent } from 'soquetic';

const dataPath = 'data/data.json';

function leerDatos() {
  let data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

function escribirDatos(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

onEvent('obtenerObjetos', () => leerDatos());

onEvent('publicarObjeto', (nuevoObjeto) => {
  let datos = leerDatos();
  datos.objetos.push(nuevoObjeto);
  escribirDatos(datos);
});

startServer();
