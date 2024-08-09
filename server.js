import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

const lista = [];

console.log(process.env)
app.get('/', (req, res) => {
    res.sendFile(process.env.INIT_CWD + '/index.html');
})

app.get('/musicas', (req, res) => {
    return res.status(200).json(lista)
})

app.post('/musicas', (req, res) => {
    const body = req.body;
    lista.push(body);
    return res.status(200).json({ message: 'Música Salva com Sucesso.'})
})

app.put('/musicas/:indice', (req, res) => {
    const indice = req.params.indice;
    const body = req.body;
    const indiceLista = lista.findIndex(indiceLista => indice === indiceLista)
    lista[indiceLista] = body;
    return res.status(200).json({ message: 'Música Atualizada com Sucesso.'})
})

app.delete('/musicas/:id', (req, res) => {
    const indice = req.params.indice;
    lista.splice(indice, 1);
    return res.status(200).json({ message: 'Música Removida com Sucesso.'})
})

app.get('/', (req, res) => {
    res.sendFile('C:/Users/Thaila/Documents/PROJETOS_SOFTWARE/karaoke/index.html');
})

app.listen(3000, 'localhost', () => {
    console.log('Server is running on port http://localhost:3000');
});