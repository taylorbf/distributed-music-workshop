var clientId = process.argv[2]
var WebSocket = require('ws')
// Create client
var ws = new WebSocket('ws://localhost:8080')

// When client receives a message, simply quote it and echo it to others
ws.on('message', function(message) {
  console.log(message)
  setTimeout(function() {
    ws.send(clientId + ' says "' + message + '"')
  }, 5000)
})

// When client is open, execute callback to send a first message
ws.on('open', function() {
  ws.send(clientId + ' says "what?"')
})
