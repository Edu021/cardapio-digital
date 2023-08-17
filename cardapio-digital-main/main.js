const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const database = require('./backend/database');
const filters = require('./backend/filterinputs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const session = require('express-session');
require('dotenv').config()
bot = require('./backend/bot')

const app = express()
const PORT = process.env.PORT || config.port;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.get('/', async (req, res) => {
    row = "*"
    table = "vendedores"
    promise = await database.crud().select(table, row)
    console.log(promise)

    let ip = req.socket.remoteAddress;
    res.send(`-= MAIN PAGE =- <br> IP: ${ip}`);

    // try {
    //     promise = await database.crud().select(table, row)
    //     console.log(promise)        
    // } catch (error) {
    //     console.log(error)
    // }
})

app.get('/rota', (req, res) => {
    let session = req.session;
    if (session.email && session.name && session.conta) {
        res.redirect(`/rota/${session.conta}`);
    } else {
        res.redirect(`/entrar?from=rota`);
    }
})

app.get('/rota/:conta', async (req, res) => {
    let session = req.session;
    if (session.email && session.name && session.conta) {
        let ip = req.socket.remoteAddress;
        try {
            await bot.bot(ip,session.conta); // gera qr code e inicia o bot    
        } catch (error) {
            console.log(error);
        }
        res.sendFile(__dirname + '/front/html/teste.html');
    } else {
        res.redirect(`/entrar?from=rota`);
    }

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

// ACCOUNT MENU

app.get('/conta/', (req, res) => {
    let session = req.session;
    if (session.email && session.name && session.conta) {
        res.redirect(`conta/${session.conta}`);
    } else {
        res.redirect(`/entrar?from=conta`);
    }
    res.send()
}) 


app.get('/conta/:conta', (req, res) => {
    let session = req.session;
    if (session.email && session.name && session.conta) {
        res.send(`<h1>Welcome ${session.name} to your account menu</h1> <br> <h6>Your email: ${session.email}</h6> <br> <a href='/sair'> Sair </a>`);
    } else {
        res.redirect(`/entrar?from=conta`);
    }
    res.send()
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

app.post('/planos', async (req, res) => {
    plano = req.body.plano;
    if (plano != undefined) {
        table = 'planos';
        row = '*';
        condition = `nm_plano = '${plano}'`;
        promise = await database.crud().selectWhere(table, row, condition);
        plano = promise[0][0];

        //


        // L�GICA API DE PAGAMENTOS
        pagamento = await false;

        //
        
        if (pagamento) {
            let set = `plano = '${plano.nm_plano}'`;
            let conditionUpdate = `id = ${usr}`;

            await database.crud().insert();
            let query = `UPDATE ${table} SET ${set} WHERE ${condition}`;
            await database.crud().update('vendedores', );
        }

        //res.redirect('/conta');
    } else {
        res.redirect('/planos?erro=1');
    }
});

app.get('/planos', (req, res) => {
    res.sendFile(__dirname + "/front/html/planos.html");
});

app.get('/src/js/planos.js', (req, res) => {
    res.sendFile(__dirname + "/front/js/planos.js");
});

app.get('/entrar', (req, res) => {
    let session=req.session;
    console.log(session);

    if (session.email && session.name) {
        res.send(`Welcome ${session.name} <a href=\'/sair'>click to logout</a>`);
    }else {
        res.sendFile(__dirname + "/front/html/login.html");
    }
    
});

app.post('/entrar', async (req, res) => {
    let table = `vendedores`;
    let row = `id,responsavel,email,senha`;
    sanitizedEmail = await filters.filter().string(`'${req.body.email}'`);
    sanitizedPass = await filters.filter().string(`'${req.body.password}'`);
    let condition = `email = '${sanitizedEmail}' and senha = '${sanitizedPass}'`;
    let name, email, pass;

    try {
        promise = await database.crud().selectWhere(table, row, condition);
        console.log(promise[0])
        if (promise[0].length == 1) {
            idConta = promise[0][0].id;
            name = promise[0][0].responsavel;
            email = promise[0][0].email;
            pass = promise[0][0].senha;
        }
    } catch (err) {
        console.error(err);
    }

    if (req.body.email == email && req.body.password == pass) {
        let session = req.session;
        session.conta = idConta;
        session.email = email;
        session.name = name;
        console.log(session);
        if (req.query.from != null) {
            console.log("REDIRECIONANDO ")
            res.redirect(`/${req.query.from}`);
        } else {
            res.redirect(`/conta`);
        }
        
    }
    else {
        res.redirect('/entrar?warning=1');
    }
    
});

app.get('/sair', (req, res) => {
    req.session.destroy(); 
    res.redirect("/entrar");
});

app.get('/src/js/login.js', (req, res) => {
    res.sendFile(__dirname + "/front/js/login.js");
});

const server = app.listen(PORT, () => {
    console.log(`SERVER RUNNING: \nIP: localhost \nPORT: ${ server.address().port }`,);
});