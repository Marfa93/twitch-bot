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

app.get('/chat', function(req, res, next) {
  chat.emit('chat', client.chat(req, res));
})

app.use(function (req, res, next) {
  res.status(404).send("Il n'y a rien par ici !")
})

io.sockets.on('connection', function (socket) {
  console.log('Un client est connecté !');
});

const chat = io.of('/chat')
  .on('connection', function (socket) {
    console.log(`Quelqu'un s'est connecté`)
  });

server.listen(port, () => console.log(`App listening to ${port}`));
