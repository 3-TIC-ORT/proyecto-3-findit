import { startServer, onEvent, sendEvent } from 'soquetic';
import fs from 'fs';
import path from 'path';

const dataFile = path.resolve("./data/data.json");

startServer(3000);

onEvent('publicarObjeto', (data) => {
    fs.readFile(dataFile, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            sendEvent('publicarObjeto', { success: false });
            return;
        }
        const objetos = JSON.parse(jsonData).objetos;
        objetos.push(data);

        fs.writeFile(dataFile, JSON.stringify({ objetos }, null, 2), (err) => {
            if (err) {
                console.error('Error escribiendo el archivo:', err);
                sendEvent('publicarObjeto', { success: false });
                return;
            }
            sendEvent('publicarObjeto', { success: true });
        });
    });
});

onEvent('buscarObjeto', (data) => {
    fs.readFile(dataFile, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            sendEvent('buscarObjeto', { objetos: [] });
            return;
        }
        const objetos = JSON.parse(jsonData).objetos;
        const resultado = objetos.filter(objeto => objeto.nombre.toLowerCase().includes(data.nombre.toLowerCase()));
        sendEvent('buscarObjeto', { objetos: resultado });
    });
});
