const http = require("http")
const express = require("express");
const socketio = require("socket.io")
const client = require('./public/assets/js/bot.js')
const port = process.env.app_port || 8080

app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  res.sendFile('./public/index.html');
});

app.use(function (req, res, next) {
  res.status(404).send("Il n'y a rien par ici !")
})

io.on('connection', async function (socket) {
  console.log('Un client est connecté !');

  client.chatClient.on("chat", function (channel, userstate, message, self) {
    let messageLine = client.getChatLine(userstate, message)
    socket.emit('chat-message', messageLine)
  })

});

server.listen(port, () => console.log(`App listening to ${port}`));
