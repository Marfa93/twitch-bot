const http = require("http")
const express = require("express");
const socketio = require("socket.io")
const path = require('path');
const fs = require('fs');
const client = require('./public/assets/js/bot.js')
const port = process.env.app_port || 8080

app = express();
const server = http.createServer(app)
const io = socketio(server)

const root = { root: __dirname }

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/music'));

app.get('/', function(req, res, next) {
  res.sendFile('dist/index.html', root);
});

app.get('/home', function(req, res, next) {
  res.sendFile('dist/index.html', root);
});

app.get('/sounds', function(req, res, next) {
  res.sendFile('dist/index.html', root);
});

app.get('/soundslist', function(req, res, next) {
  const directoryPath = path.join(__dirname, 'dist/assets/music');
  const fileList = []
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      res.json({error: 'Error'})
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file, index) {
      // Do whatever you want to do with the file
      fileList.push({ id: index, soundname: file.replace('.mp3', '')})
    });

    res.json(fileList)
  });
})

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
