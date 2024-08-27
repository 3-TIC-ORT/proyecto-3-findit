import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'data.json');

// Crear un objeto vacío
const vaciarData = () => {
    const data = { objetos: [] };
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error al vaciar el archivo:', err);
        } else {
            console.log('Archivo data.json vaciado con éxito.');
        }
    });
};

vaciarData();
