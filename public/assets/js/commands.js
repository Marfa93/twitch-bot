const fs = require('fs');

function removeCommandsMessage(message) {
    const tokens = message.split(' ')
    tokens.splice(0, 2);

    return tokens.join(' ').trim();
}

const commands = [
    {
        name: "hello",
        type: "function",
        func: function (channel, userstate, message, client, sides = 20) {
            client.say(channel, `Coucou @${userstate.username} ! :)`);
        }
    },
    {
        name: "roll",
        type: "function",
        func: function (channel, userstate, message, client, sides = 20) {
            let randNum = Math.floor(Math.random() * sides) + 1;
            client.say(channel, `@${userstate.username} rolled a ${randNum}!`);
        }
    },
    {
        name: "tchip",
        type: "message",
        message: "/me tchipe tout le monde, sans exception."
    },
    {
        name: "fdp",
        type: "message",
        message: "Faites des phrases complètes bordel !!!"
    },
    {
        name: "sons",
        type: "message",
        message: "Vous retrouverez les sons à cette adresse : http://marfabot.cloudno.de/sounds"
    }
];
module.exports = commands
