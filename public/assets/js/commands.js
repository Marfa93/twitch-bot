const fs = require('fs');
const gtts = require('gtts');
const CHAR_LIMIT = 100;

function removeCommandsMessage(message) {
    const tokens = message.split(' ')
    tokens.splice(0, 2);

    return tokens.join(' ').trim();
}

function speech(message) {
    const speech = new gtts(message, 'fr');
    speech.save('./dist/assets/sounds/tts.mp3', function (err, result) {
        if(err) {
            throw new Error(err);
        }
        console.log('Success! Open file assets/sounds/tts.mp3 to hear result.');
    });
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
    },
    {
        name: "tts",
        type: "function",
        func: function (channel, userstate, message, client, text) {
            if (message.length > CHAR_LIMIT + 4) {
                speech("");
                client.say(channel, `@${userstate.username} : le message contient plus de ${CHAR_LIMIT} caractères.`);
            } else {
                speech(message.substring(4));
            }
        }
    }
];
module.exports = commands
