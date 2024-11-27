import fs from "fs";
import { onEvent, startServer } from "soquetic";

let datos = "data/data.json";
let logs = "data/logs.json";
let contadorID = 1;

function leerDatos() {
  let data = fs.readFileSync(datos, "utf8");
  return JSON.parse(data);
}

function escribirDatos(data) {
  fs.writeFileSync(datos, JSON.stringify(data, null, 2));
}

function leerLogs() {
  if (fs.existsSync(logs)) {
    let data = fs.readFileSync(logs, "utf8");
    return JSON.parse(data);
  }
  return [];
}

function escribirLogs(logsData) {
  fs.writeFileSync(logs, JSON.stringify(logsData, null, 2)); 
}

onEvent("obtenerObjetos", () => leerDatos());

onEvent("publicarObjeto", (nuevoObjeto) => {
  let datos = leerDatos();
  nuevoObjeto.id = contadorID++;
  nuevoObjeto.publicadoPor = { nombre: nuevoObjeto.publicadoPor.nombre };
  datos.push(nuevoObjeto);
  escribirDatos(datos);
});

const imagenesPath = "public/images/";
if (!fs.existsSync(imagenesPath)) {
  fs.mkdirSync(imagenesPath, { recursive: true });
}

onEvent("publicarObjeto", (nuevoObjeto) => {
  const { archivoBase64, ...datosObjeto } = nuevoObjeto;
  let datos = leerDatos();

  datosObjeto.id = contadorID++;

  if (datosObjeto.nombrePublicador && datosObjeto.apellidoPublicador) {
    datosObjeto.publicadoPor = `${datosObjeto.nombrePublicador} ${datosObjeto.apellidoPublicador}`;
  }

  if (archivoBase64) {
    const nombreArchivo = `objeto_${datosObjeto.id}.png`;
    const rutaArchivo = path.join(imagenesPath, nombreArchivo);
    const buffer = Buffer.from(archivoBase64, "base64");
    fs.writeFileSync(rutaArchivo, buffer);
    datosObjeto.imagen = `/images/${nombreArchivo}`;
  }

  datos.push(datosObjeto);
  escribirDatos(datos);
});

function verificarDatos(datos, nuevosDatos) {
  if (datos.length !== nuevosDatos.length) {
    return { success: true, message: "Objeto reclamado exitosamente." };
  } else {
    return { success: false, message: "Objeto no encontrado." };
  }
}

function reclamarObjeto(idObjeto, nombre, apellido) {
  let datos = leerDatos();
  let nuevosDatos = datos.filter(objeto => objeto.id !== idObjeto);
  escribirDatos(nuevosDatos);

  let logsData = leerLogs();
  let fechaArgentina = new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString();
  logsData.push({ idObjeto, nombre, apellido, fecha: fechaArgentina });
  
  escribirLogs(logsData);

  return verificarDatos(datos, nuevosDatos);
}

onEvent("reclamarObjeto", (data) => {
  let { id, nombre, apellido } = data;
  return reclamarObjeto(id, nombre, apellido);
});

onEvent("editarObjeto", (objetoEditado) => {
  let datos = leerDatos();
  let indice = datos.findIndex(obj => obj.id === objetoEditado.id);
  
  if (indice !== -1) {
    datos[indice] = { ...datos[indice], ...objetoEditado };
    escribirDatos(datos);
    return { success: true };
  } else {
    return { success: false, message: "Objeto no encontrado" };
  }
});

onEvent("buscarObjeto", (input) => {
  let datos = leerDatos();
  let objetosEncontrados = [];
  for (let objeto of datos) {
    if (objeto.nombre === input) {
      objetosEncontrados.push(objeto);
    }
  }
  return objetosEncontrados;
});

onEvent('eliminarObjeto', (data) => {
  const { id, username } = data;
  let datos = leerDatos();
  
  // Encuentra el objeto específico por su ID y verifica el nombre del publicador
  const objetoAEliminar = datos.find(obj => obj.id === id && obj.publicadoPor.nombre === username);
  
  if (objetoAEliminar) {
    // Filtra solo el objeto específico con ese ID
    datos = datos.filter(obj => obj.id !== id);
    
    escribirDatos(datos);
    
    let logsData = leerLogs();
    let fechaArgentina = new Date(new Date().getTime() - (3 * 60 * 60 * 1000)).toISOString();
    logsData.push({ 
      idObjeto: id, 
      accion: 'eliminado', 
      usuario: username, 
      fecha: fechaArgentina 
    });
    escribirLogs(logsData);
    
    return { success: true, message: 'Objeto eliminado exitosamente' };
  } else {
    return { 
      success: false, 
      message: 'No tiene permisos para eliminar este objeto o el objeto no existe' 
    };
  }
});
let users = [];

function loadUsers() {
  if (fs.existsSync('users.json')) {
    let data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
  } else {
    console.log('users.json not found, starting with empty user list');
  }
}

function saveUsers() {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

onEvent('register', (data) => {
  let { username, password } = data;
  
  if (!isValidUsername(username)) {
    return { success: false, message: 'El nombre de usuario solo puede contener letras y números' };
  }
  
  if (!isValidPassword(password)) {
    return { success: false, message: 'La contraseña debe tener al menos 8 caracteres y contener al menos un número' };
  }
  
  if (users.some(user => user.username === username)) {
    return { success: false, message: 'El nombre de usuario ya existe' };
  }
  
  users.push({ username, password });
  saveUsers();
  return { success: true, message: 'Registro exitoso' };
});

onEvent('login', (data) => {
  let { username, password } = data;
  let user = users.find(user => user.username === username && user.password === password);
  return user 
    ? { success: true, message: 'Inicio de sesión exitoso', username: user.username }
    : { success: false, message: 'Usuario o contraseña inválidos' };
});

onEvent('checkSession', (data) => {
  let { username } = data;
  let user = users.find(user => user.username === username);
  return user
    ? { success: true, message: 'Sesión válida', username: user.username }
    : { success: false, message: 'Sesión inválida' };
});

onEvent('logout', (data) => {
  return { success: true, message: 'Logout exitoso' };
});

loadUsers();
startServer();