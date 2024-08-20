import http from 'http';
import fs from 'fs/promises';
import { agregarObjeto } from './datos.js';

const port = 5500;

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/publicar') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const objeto = JSON.parse(body);

                if (objeto && objeto.nombre && objeto.caracteristicas && objeto.lugarEncontrado && objeto.lugarDejado) {
                    await agregarObjeto(objeto);
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'Objeto publicado exitosamente' }));
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'Datos del objeto incompletos' }));
                }
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Error al procesar el JSON' }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/') {
        try {
            const data = await fs.readFile('publicar.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        } catch (err) {
            res.writeHead(500);
            res.end('Error al cargar la página');
        }
    } else if (req.method === 'GET' && req.url === '/script.js') {
        try {
            const data = await fs.readFile('script.js');
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        } catch (err) {
            res.writeHead(500);
            res.end('Error al cargar el script');
        }
    } else {
        res.writeHead(404);
        res.end('Recurso no encontrado');
    }
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
