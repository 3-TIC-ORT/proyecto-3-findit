import http from 'http';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

let servidor = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
            let objeto = JSON.parse(body);

            try {
                let dataPath = resolve('data.json');
                let data = await readFile(dataPath, 'utf8');
                let jsonData = JSON.parse(data);

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

servidor.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});
