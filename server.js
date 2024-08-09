import express from 'express';

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile('C:/Users/Thaila/Documents/PROJETOS_SOFTWARE/karaoke/index.html');
})



app.listen(3000, 'localhost', () => {
    console.log('Server is running on port http://localhost:3000');
});