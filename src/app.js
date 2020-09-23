const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();
//app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let usuariosConectados = new Set();


io.on('connection', (socket) => {
    console.log("Usuário conectado");
    socket.on('conectado', (data) => {
        console.log("Usuário conectados");
        if(data != null){
            socket.userId = data;
            /*usuariosConectados.add(data);
            io.emit("conectado", [...usuariosConectados]);*/
            
        }
    });
    
    socket.on('disconnect', () => {
        usuariosConectados.delete(socket.userId);
    });

    socket.on('enviarMensagem', (data) => {
        console.log("Mensagem recebida")
        console.log(data)
        io.emit('mensagemRecebida', data);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});