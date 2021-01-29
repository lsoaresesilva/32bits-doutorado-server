const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { dockStart } = require('@nlpjs/basic');
const { InterpretationErrorFactory } = require('programming-monitor/src/programming_errors/interpretationErrorFactory');
const Estudante = require("./Estudante");
const Edicao = require("./Edicao");
const Algoritmo = require("./Algoritmo");
const port = process.env.PORT || 4001;

const app = express();
//app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let usuariosConectados = new Set();

let algoritmos = new Map();

io.on('connection', (socket) => {

    console.log("Conexão")
    console.log("Sala " + socket.handshake.query.sala);

    if (socket.handshake.query.sala) {
        console.log("Entrou na sala");
        socket.join(socket.handshake.query.sala);
        let algoritmo = algoritmos.get(socket.handshake.query.sala);
        if(algoritmo == null){
            //let edicao = new Map();
            //edicao.set(1, new Edicao(1, "", null));
            //algoritmos.set(socket.handshake.query.sala, edicao);

            algoritmo = new Algoritmo();
            algoritmo.edicoes.push(new Edicao(1, "", null));
            algoritmos.set(socket.handshake.query.sala, algoritmo);

        }else{
            console.log("Enviou algoritmo entrada")
            io.to(socket.handshake.query.sala).emit('editorCodigo', algoritmo);
        }
        
    }



    socket.on('disconnect', () => {
        usuariosConectados.delete(socket.userId);
    });

    socket.on('enviarMensagem', (data) => {
        console.log("Mensagem recebida")
        console.log(data)
        let salaId = Object.keys(socket.rooms)[1];
        console.log("Sala " + salaId);
        io.to(salaId).emit('mensagemRecebida', data);
    });

    socket.on('editorKeyEvent', (data) => {
        console.log("Edicao")
        let salaId = Object.keys(socket.rooms)[1];
        console.log("Data "+data);
        let algoritmo = algoritmos.get(salaId);
        if(algoritmo != null){
            //algoritmo.edicoes.push(data.linha, new Edicao(data.linha, data.texto, data.estudante))
            algoritmo.modificar(new Edicao(data.linha, data.texto, data.estudante))
            // TODO: Verifica se na linha já tem edição
            //algoritmos.set(socket.handshake.query.sala, edicoes);
        }
        io.to(salaId).emit('editorCodigo', algoritmo);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});

/* function iniciarChat() {
    (async () => {

    })();
}

iniciarChat();

let x = InterpretationErrorFactory.build("bla");
console.log(x) */