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
const lista = [
    
];
app.get('/', (req, res) => {
    return res.sendFile(process.cwd() + '/index.html')
})

app.get('/musicas', (req, res) => {
    return res.status(200).json(lista)
})

app.post('/musicas', (req, res) => {
    const body = req.body;
    const myUUID = uuidv4();
    body.id = myUUID;
    lista.push(body);
    return res.status(200).json({ message: 'Música Salva com Sucesso.'})
})

app.put('/musicas/:indice', (req, res) => {
    const indice = req.params.indice;
    const body = req.body;
    const indiceLista = lista.findIndex(indiceLista => indice === indiceLista)
    return res.status(200).json({ message: 'Música Atualizada com Sucesso.'})
})

app.delete('/musicas/:id', (req, res) => {
    const id = req.params.id;
    const indice = lista.findIndex(item => item.id === id)
    lista.splice(indice, 1);
    return res.status(200).json({ message: 'Música Removida com Sucesso.'})
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

    socket.on('remove_music', (data) => {
        const indice = lista.findIndex(item => item.id === data.id);
        lista.splice(indice, 1);
        socket.broadcast.emit('actually', lista);
        socket.emit('actually', lista);
    });
    
    socket.on('save_music', (data) => {
        const myUUID = uuidv4();
        data.id = myUUID;
        lista.push(data);
        socket.broadcast.emit('actually', lista);
        socket.emit('actually', lista);
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Server is running on port http://localhost:3000');
});

export default app;