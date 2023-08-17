const qr_code = require('qrcode');
const { Client } = require('whatsapp-web.js');
const client = new Client();

async function bot(ip,id) {
    console.log(`Gerando QR-CODE para ${ip} aguarde...`);
    await client.on('qr', qr => {
        qr_code.toFile(`qr-${id}.png` ,qr, function(err)
        {
            if(err) return console.log("error");
        });
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.initialize();
    
    client.on('message', message => {
        if(message.body === 'Hello') {
            client.sendMessage(message.from, 'Hello');        
        }
    })
}

module.exports = { bot };