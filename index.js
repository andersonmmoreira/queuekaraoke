import express from 'express';
import cors from 'cors';

import { v4 as uuidv4 } from 'uuid';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

const lista = [];
const lista_espera = [];

app.get('/', (req, res) => {
    return res.sendFile(process.cwd() + '/index.html')
})

app.get('/lista-espera', (req, res) => {
    return res.sendFile(process.cwd() + '/lista-espera.html')
})

app.use('**', (request, response) => {
    response.status(404).send('Página não encontrada.');
})

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send({ error: 'Something went wrong.' });
})

io.on('connection', (socket) => {
    socket.emit('actually', lista);
    
    socket.on('update_music', (data) => {
        const indice = lista.findIndex(item => item.id === data.id);
        lista[indice] = data;
        socket.broadcast.emit('send_music', data);
    });

    socket.on('remove_music', (id) => {
        const indice = lista.findIndex(item => item.id === id);
        lista.splice(indice, 1);

        socket.broadcast.emit('actually', lista);
        socket.emit('actually', lista);
    });

    socket.on('alter_status_music', (id) => {
        const indice = lista.findIndex(item => item.id === id);
        lista[indice].status = 'finished';

        socket.broadcast.emit('actually', lista);
        socket.emit('actually', lista);
    });

    
    
    socket.on('save_music', (data) => {
        const myUUID = uuidv4();
        if(!data.id) {
            console.log(data)
            data.id = myUUID;
            data.status = 'open';
        }
        
        lista.push(data);
        socket.broadcast.emit('actually', lista);
        socket.emit('actually', lista);
    });

    // ------------- LISTA ESPERA ---------------
    socket.emit('actually_espera', lista_espera);
    
    socket.on('update_music_espera', (data) => {
        const indice = lista_espera.findIndex(item => item.id === data.id);
        lista_espera[indice] = data;
        socket.broadcast.emit('send_music_espera', data);
    });

    socket.on('remove_music_espera', (id) => {
        const indice = lista_espera.findIndex(item => item.id === id);
        lista_espera.splice(indice, 1);
        socket.broadcast.emit('actually_espera', lista_espera);
        socket.emit('actually_espera', lista_espera);
    });
    
    socket.on('save_music_espera', (data) => {
        const myUUID = uuidv4();
        data.id = myUUID;
        lista_espera.push(data);
        socket.broadcast.emit('actually_espera', lista_espera);
        socket.emit('actually_espera', lista_espera);
    });
    
});

server.listen(3000, 'localhost', () => {
    console.log('Server is running on port http://localhost:3000');
});

export default app;