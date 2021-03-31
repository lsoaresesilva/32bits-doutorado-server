
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const ShareDB = require("sharedb");

const shareDBServer = new ShareDB();
const connection = shareDBServer.connect();

const wss = new WebSocket.Server({ port: 8080 });

let salas = new Map();

wss.on("connection", function cnt(ws) {
  // For transport we are using a ws JSON stream for communication
  // that can read and write js objects.

  ws.on("message", (buffer) => {
    let data = JSON.parse(buffer);

    /* if (!data.sala) return;

    let sala = salas.get(data.sala);
    if (sala == null) {
      salas.set(data.sala, new SalaChat());
    }

    sala = salas.get(data.sala); */

    if (data.tipo != null) {
 /*      if (data.tipo == "CHAT") {
        sala.enviarMensagem(data.texto, data.estudante);
      } else if (data.tipo == "ACESSO") {
        sala.adicionarEstudante(data.estudante, ws); */
        const doc = connection.get("documents", data.sala);

        doc.fetch(function (err) {
          if (err) throw err;
          if (doc.type === null) {
            /**
             * If there is no document with id "firstDocument" in memory
             * we are creating it and then starting up our ws server
             */

            // TODO: preciso modificar o objeto cursor para representar os dois usuários. Usar o insert no primeiro acesso para inserir uma chave como sendo o PK do usuário

            doc.create(
              { algoritmo: [""], cursor: { lineNumber: 1, column: 1 }, autor:"" },
              () => {
                ws.send(JSON.stringify({ tipo: "CONEXAO", status: "OK" }));

                const jsonStream = new WebSocketJSONStream(ws);
                shareDBServer.listen(jsonStream);
              }
            );
            return;
          } else {
            ws.send(JSON.stringify({ tipo: "CONEXAO", status: "OK" }));

            const jsonStream = new WebSocketJSONStream(ws);
            shareDBServer.listen(jsonStream);
          }
        });
      //}
    }
    
    /*  */
  });

  console.log("Conectou");
});
