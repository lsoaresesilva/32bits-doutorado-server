const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const ShareDB = require('sharedb');

const shareDBServer = new ShareDB();
const connection = shareDBServer.connect();

const doc = connection.get('documents', 'algoritmo');
console.log("Iniciando")
doc.fetch(function (err) {
    if (err) throw err;
    if (doc.type === null) {
      /**
       * If there is no document with id "firstDocument" in memory
       * we are creating it and then starting up our ws server
       */


      // TODO: preciso modificar o objeto cursor para representar os dois usuários. Usar o insert no primeiro acesso para inserir uma chave como sendo o PK do usuário


      doc.create({'algoritmo':[""], "cursor":{lineNumber:1, column:1}}, () => {
        const wss = new WebSocket.Server({ port: 8080 });
  
        wss.on('connection', function connection(ws) {
          // For transport we are using a ws JSON stream for communication
          // that can read and write js objects.
          console.log("Conectou")
          const jsonStream = new WebSocketJSONStream(ws);
          shareDBServer.listen(jsonStream);
        });
      });
      return;
    }
  });