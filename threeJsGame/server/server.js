const express = require('express');
const WebSocket = require('ws');

const server = express();

server.use(express.static('../client/static'));
server.use(express.json());



const httpServer = server.listen(8080,'0.0.0.0', () => {
    console.log('http://localhost:8080/threeJsGame.html');
});

const ws = new WebSocket.Server({ server: httpServer });

const clients = new Set();
let serial = 0;
ws.on('connection', (clientWs) => {
    serial++;
    //console.log(serial);
    clientWs.send(JSON.stringify({
        youSerial:serial
    }));
    //serial++;

    clients.add(clientWs);
    console.log(`新的客户端连接序列号为${serial}`);
    //console.log(clients);
    clientWs.on('message', (message) => {
        
        message = message.toString();
        //console.log(message);
        clients.forEach(client =>{
            client.send(message);
        })
    })
});


