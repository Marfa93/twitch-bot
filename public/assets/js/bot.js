const tmi = require('tmi.js');
const options = require("./config.js");
const commands = require("./commands.js");
const CMD_PREFIX = "!";

// Create a client with our options
const client = new tmi.client(options);

// Connect to Twitch:
client.connect();

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

client.on("chat", function (channel, userstate, message, self) {
  if (self) return;
  const msg = message.trim();
  // console.log(userstate, msg);
  handleCommmand(channel, userstate, msg);
});

function handleCommmand(channel, userstate, message) {
  if (message.charAt(0) == CMD_PREFIX) {
    processCommand(channel, userstate, message)
  }
}

function processCommand(channel, userstate, message) {
  console.log("processing commands...");
  message = message.replace(CMD_PREFIX, '');
  command = message.split(' ');
  subCommand = command[1] ? command[1].toLowerCase() : ''
  for (let i = 0; i < commands.length; i++) {
    if (command[0].toLowerCase() === commands[i].name) {
      if (commands[i].type == "function") {
        commands[i].func(channel, userstate, message, client, command[1]);
      } else if (commands[i].type == "message") {
        client.say(channel, commands[i].message);
      }
    }
  }
}

function getChatLine(userstate, message) {
  try {
    return {
      id: userstate.id || Date.now(),
      sent: userstate['tmi-sent-ts'] || Date.now(),
      sender: userstate['display-name'],
      message: message
    }
  } catch(err) {
    return { errors: err }
  }
}

exports.getChatLine = getChatLine
exports.chatClient = client
