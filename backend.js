import fs from "fs";
import { onEvent, startServer } from "soquetic";

const datos = "data/data.json";

let objetoIdCounter = 1; 

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
    nuevoObjeto.id = objetoIdCounter++;
  
  datos.push(nuevoObjeto);
  escribirDatos(datos);
});

function filtrarDatos(input) {
  let datos = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  let objetosEncontrados = [];
  for (const objeto of datos) {
    if (objeto.nombre === input) {
      objetosEncontrados.push(objeto);
    }
  }
  return objetosEncontrados;
}

let users = [];

function loadUsers() {
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('users.json not found, starting with empty user list');
    } else {
      console.error('Error reading users file:', err);
    }
  }
}

function saveUsers() {
  try {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users file:', err);
    throw err;
  }
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}

onEvent('register', (data) => {
  try {
    const { username, password } = data;
    
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
  } catch (err) {
    console.error('Error during registration:', err);
    return { success: false, message: 'Ocurrió un error durante el registro' };
  }
});

onEvent('login', (data) => {
  const { username, password } = data;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return { success: true, message: 'Inicio de sesión exitoso', username: user.username };
  } else {
    return { success: false, message: 'Usuario o contraseña inválidos' };
  }
});

onEvent('checkSession', (data) => {
  const { username } = data;
  const user = users.find(user => user.username === username);
  if (user) {
    return { success: true, message: 'Sesión válida', username: user.username };
  } else {
    return { success: false, message: 'Sesión inválida' };
  }
});

function reclamarObjeto(idObjeto) {
  let datos = leerDatos();
  
  let nuevosDatos = datos.filter(objeto => objeto.id !== idObjeto);
  
  escribirDatos(nuevosDatos);
  
  return datos.length !== nuevosDatos.length 
    ? { success: true, message: "Objeto reclamado exitosamente." } 
    : { success: false, message: "Objeto no encontrado." };
}

onEvent("reclamarObjeto", (data) => {
  const { id } = data; 
  return reclamarObjeto(id);
});

onEvent("buscarObjeto", filtrarDatos);

startServer();
