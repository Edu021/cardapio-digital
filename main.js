const express = require('express')
const database = require('./backend/database')
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
require('dotenv').config()
bot = require('./backend/bot')

const app = express()
const PORT = process.env.PORT || config.port;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    row = "*"
    table = "vendedores"
    promise = await database.crud().select(table, row)
    console.log(promise)
    res.send(promise)
    // try {
    //     promise = await database.crud().select(table, row)
    //     console.log(promise)        
    // } catch (error) {
    //     console.log(error)
    // }
})

app.get('/rota', async (req,res) => {
    try {
        await bot.bot(); // gera qr code e inicia o bot    
    } catch (error) {
        console.log(error);
    }
    res.sendFile(__dirname + '/front/html/teste.html')    
})

app.get('/src/:img', (req,res) => {
    res.sendFile(__dirname + '/' + req.params.img)
})

app.get('/:restaurante/pedido', (req,res) => {
    res.send(req.params.restaurante)
})

app.get('/conta/cadastro', (req,res) => {
    res.sendFile(__dirname + '/front/html/conta_cadastrar.html')
})

// cadastrar pedidos
app.post('/:restaurante/pedido', (req,res) => {
    
}) 

// cadastro de vendedor
app.post('/conta/cadastro', (req,res) => {
    user = {
        name: req.body.nm_completo,
        cpf: req.body.cpf,
    }
    console.log("Origem: " + req.headers.origin)
    console.log(user)
    res.send(user)
    // res.redirect('/conta')
}) 
const server = app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO: \nIP: localhost \nPORT: ${ server.address().port}`,);
});