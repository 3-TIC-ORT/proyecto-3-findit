import soquetic from 'soquetic';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataPath = join(new URL(import.meta.url).pathname, 'data', 'data.json');
const io = new soquetic.Server();

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('publicar', (data) => {
        let objetos = JSON.parse(readFileSync(dataPath, 'utf-8'));
        objetos.push(data);
        writeFileSync(dataPath, JSON.stringify(objetos, null, 2), 'utf-8');
        socket.emit('publicar-respuesta', { mensaje: 'Objeto publicado con éxito' });
    });

    socket.on('buscar', (query) => {
        let objetos = JSON.parse(readFileSync(dataPath, 'utf-8'));
        let resultados = objetos.filter(objeto =>
            objeto.nombre.includes(query) || objeto.caracteristicas.includes(query)
        );
        socket.emit('buscar-respuesta', resultados);
    });
});

io.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
