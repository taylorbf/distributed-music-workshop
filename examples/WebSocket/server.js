var WebSocket = require('ws')

// Create server, execute callback when server is started
var wss = new WebSocket.Server({ port: 8080 }, function() {
  console.log('server started!')
})

// When new client connects, listens to its messages
wss.on('connection', function connection(ws) {

  // When client sends message, transmit it to all other clients
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function(client) {
      if (client !== ws) {
        client.send(message)
      }
    })
  })
})
