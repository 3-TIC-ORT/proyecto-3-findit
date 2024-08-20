// datos.js
import fs from 'fs/promises';

const file = 'data.json';

// Lee los datos del archivo JSON
export async function leerDatos() {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error al leer el archivo:", err);
        return { objetos: [] }; // Devuelve un objeto vacío si no se puede leer el archivo
    }
}

// Guarda los datos en el archivo JSON
export async function guardarDatos(datos) {
    try {
        await fs.writeFile(file, JSON.stringify(datos, null, 2), 'utf8');
        console.log("Datos guardados correctamente.");
    } catch (err) {
        console.error("Error al guardar el archivo:", err);
    }
}

// Agrega un nuevo objeto
export async function agregarObjeto(objeto) {
    const datos = await leerDatos(); // Lee los datos actuales
    datos.objetos.push(objeto); // Agrega el nuevo objeto
    await guardarDatos(datos); // Guarda los datos actualizados en el archivo
}
