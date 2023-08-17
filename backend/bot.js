const qr_code = require('qrcode');
const { Client } = require('whatsapp-web.js');
const path = require('path'); // Importar o módulo 'path' para lidar com caminhos de arquivo
const client = new Client();

async function bot(ip, id) {
    console.log(`Gerando QR-CODE para ${ip}, aguarde...`);
    
    const qrPath = path.join(`${__dirname}/../front/src/qr`, `qr-${id}.png`); // Caminho completo para a pasta de qr code
    
    client.on('qr', qr => {
        qr_code.toFile(qrPath, qr, function(err) {
            if (err) return console.log(err);
        });
    });
    
    client.on('ready', () => {
        console.log(`Client id ${id} is ready to chat!`);
    });
    
    client.initialize();
    
    client.on('message', message => {
        if (message.body === 'hello') {
            client.sendMessage(message.from, 'Hello');
        }
        if (message.body === 'exit') {
            client.sendMessage(message.from, `quitando aqui ${message.author}`);
            client.destroy();
        }
    });
}

module.exports = { bot };
