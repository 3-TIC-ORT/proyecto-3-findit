import http from 'http';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {startServer, onEvent} from "soquetic";

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/publicar') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const objeto = JSON.parse(body);

            try {
                const dataPath = resolve('data.json');
                const data = await readFile(dataPath, 'utf8');
                const jsonData = JSON.parse(data);

                jsonData.objetos.push(objeto);

                await writeFile(dataPath, JSON.stringify(jsonData, null, 2));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "El objeto fue publicado exitosamente, gracias por usar FindIT" }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
                console.error(err);
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método no permitido');
    }
});

server.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});

startServer()