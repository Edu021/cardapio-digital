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
    //row = "*"
    //table = "vendedores"
    //promise = await database.crud().select(table, row)
    //console.log(promise)

    let ip = req.socket.remoteAddress;
    res.send(`-= MAIN PAGE =- <br> IP: ${ip}`);

    // try {
    //     promise = await database.crud().select(table, row)
    //     console.log(promise)        
    // } catch (error) {
    //     console.log(error)
    // }
})

app.get('/rota', async (req,res) => {
    let ip = req.socket.remoteAddress;
    try {
        await bot.bot(ip); // gera qr code e inicia o bot    
    } catch (error) {
        console.log(error);
    }
    res.sendFile(__dirname + '/front/html/teste.html');
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

// ORDERS REGISTER
app.post('/:restaurante/pedido', (req,res) => {
    
}) 

// VENDORS REGISTER
app.post('/conta/cadastro', async (req,res) => {
    let hasAccount;
    user = {
        name: req.body.nm_completo,
        cpf: req.body.cpf,
        delivery: req.body.nm_delivery,
        cnpj: req.body.cnpj,
        celular: req.body.celular,
        email: req.body.email,
        endereco: req.body.endereco,
        senha: req.body.senha,
        senha2: req.body.confirmar_senha,
        plano: req.body.plano
    }
    console.log("Origem: " + req.headers.origin)

    // CHECK IF PASSWORDS ARE EQUALS
    if (user.senha === user.senha2) {
        // CHECK IF EMAIL IS REGISTERED 
        try {
            table = 'vendedores';
            row = '*';
            condition = `email = '${user.email}'`;
            promise = await database.crud().selectWhere(table,row,condition);
            // console.log(promise[0]);
            if(promise[0].length == 0) {
                hasAccount = false;
            } else {
                hasAccount = true;
                console.log(`${user.email} ALREADY REGISTERED!`);
            }

            // CREATING ACCOUNT IF VALIDATED
            if(!hasAccount) {
            
                try {
                    let rows = `responsavel,cpf,nm_fantasia,cnpj,celular,email,endereco,senha,plano,renov_automatica`;
                    let values =`'${user.name}','${user.cpf}','${user.delivery}','${user.cnpj}','${user.celular}','${user.email}','${user.endereco}','${user.senha}','${user.plano}','1'`;

                    await database.crud().insert(table,rows,values);
                    let conta_timestamps = await database.crud().selectWhere(table,'id',condition);
                    await database.crud().insert('conta_timestamps','vendedores_id',conta_timestamps[0][0].id);
                    console.log(`${user.email} SUCCESFULLY REGISTERED`);
                } catch(err) {
                    console.log(err);
                }
                // FAZER REDIRECIONAR PARA PAGINA DE ASSINATURA DE PLANO 
                // res.redirect(`/conta/cadastro?email=${user.email}`)
            } else {
                res.redirect(`/conta/cadastro?warningEmail=1&infos=${user}`);
            }
        } catch(err) {
            console.log(err);
        }
    } else {
        res.redirect(`/conta/cadastro?warningPass=1&infos=${user}`);
    }
});

app.get('/conta/planos', (req,res) => {
    res.send();
    
});

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING: \nIP: localhost \nPORT: ${ server.address().port }`,);
});