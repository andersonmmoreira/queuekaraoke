import express from 'express'

const app = express.Router()

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

export default app;