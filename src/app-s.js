#!/usr/bin/env node



  
const socketIo = require("socket.io");
const https = require("https");
const express = require("express");
const fs = require('fs');
const app = express();

var https_options = {
  key: fs.readFileSync("/etc/letsencrypt/live/32b.com.br/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/32b.com.br/fullchain.pem")
  };

const server = https.createServer(http_options, app);
const io = socketIo(server);

let estudantesConectados = new Map();



function getSala(salaId) {
  if (salaId != null) {
    let sala = estudantesConectados.get(salaId);
    if (sala == null) {
      estudantesConectados.set(salaId, []);
    }

    return estudantesConectados.get(salaId);
  }
}

function adicionarEstudanteSala(salaId, estudanteId) {
  if (salaId != null && estudanteId != null) {
    let sala = getSala(salaId);

    if (!sala.includes(estudanteId)) {
      sala.push(estudanteId);
    }
  }
}

function removerEstudanteSala(salaId, estudanteId) {
  if (salaId != null && estudanteId != null) {
    let sala = getSala(salaId);
    const index = sala.indexOf(estudanteId);
    if (index > -1) {
      sala.splice(index, 1);
    }
  }
}

io.on("connection", (socket) => {
  console.log("Conexão");
  console.log("Sala " + socket.handshake.query.sala);
  console.log("Usuario " + socket.handshake.query.estudanteId);
  socket.estudanteId = socket.handshake.query.estudanteId;
  if (socket.handshake.query.sala) {
    console.log("Entrou na sala");
    socket.join(socket.handshake.query.sala, () => {
      let salaId = Object.keys(socket.rooms)[1];
      socket.salaId = salaId;
      adicionarEstudanteSala(salaId, socket.handshake.query.estudanteId);

      io.to(salaId).emit("conexaoAluno", getSala(salaId));
    });
    socket.emit("conexao");
  }

  socket.on("disconnect", () => {
    removerEstudanteSala(socket.salaId, socket.estudanteId);
    io.to(socket.salaId).emit("conexaoAluno", getSala(socket.salaId));
  });

  socket.on("enviarMensagem", (data) => {
    console.log("Mensagem recebida");
    console.log(data);
    let salaId = Object.keys(socket.rooms)[1];
    console.log("Sala " + salaId);
    io.to(salaId).emit("mensagemRecebida", data);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
