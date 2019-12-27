const express = require("express");
const client = require('./public/assets/js/bot.js')
const port = 8080

app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
  res.sendFile('./public/index.html');
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => console.log(`App listening to ${port}`));
