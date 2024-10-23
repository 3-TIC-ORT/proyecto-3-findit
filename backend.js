import fs from "fs";
import { onEvent, startServer } from "soquetic";

let datos = "data/data.json";
let logsFile = "data/logs.json";
let objetoIdCounter = 1;

function leerDatos() {
  if (fs.existsSync(datos)) {
    let data = fs.readFileSync(datos, "utf8");
    return JSON.parse(data);
  } else {
    return [];
  }
}

function escribirDatos(data) {
  fs.writeFileSync(datos, JSON.stringify(data, null, 2));
}

function leerLogs() {
  if (fs.existsSync(logsFile)) {
    let data = fs.readFileSync(logsFile, "utf8");
    return JSON.parse(data);
  } else {
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
  if (nuevoObjeto.nombrePublicador && nuevoObjeto.apellidoPublicador) {
    nuevoObjeto.publicadoPor = `${nuevoObjeto.nombrePublicador} ${nuevoObjeto.apellidoPublicador}`;
  } else {
    nuevoObjeto.publicadoPor = "Anónimo";
  }
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
  let { id, nombre, apellido } = data;
  return reclamarObjeto(id, nombre, apellido);
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
  if (fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  } else {
    console.error('Error: users.json no existe. Creando el archivo...');
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  }
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

loadUsers();
startServer();
