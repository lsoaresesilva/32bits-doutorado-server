const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { dockStart } = require('@nlpjs/basic');
const { InterpretationErrorFactory } = require('programming-monitor/src/programming_errors/interpretationErrorFactory');

/* 
const port = process.env.PORT || 4001;

const app = express();
//app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let usuariosConectados = new Set();



io.on('connection', (socket) => {

    console.log("Conexão")
    console.log("Sala " + socket.handshake.query.sala);

    if (socket.handshake.query.sala) {
        console.log("Entrou na sala");
        socket.join(socket.handshake.query.sala)
    }



    socket.on('disconnect', () => {
        usuariosConectados.delete(socket.userId);
    });

    socket.on('enviarMensagem', (data) => {
        console.log("Mensagem recebida")
        console.log(data)
        let salaId = Object.keys(socket.rooms)[0];
        console.log("Sala " + salaId);
        io.to(salaId).emit('mensagemRecebida', data);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
 */
function iniciarChat() {
    (async () => {

    })();
}

iniciarChat();

let x = InterpretationErrorFactory.build("bla");
console.log(x)