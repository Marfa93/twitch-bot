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
            client.say(channel, `${userstate.username} rolled a ${randNum}!`);
        }
    },
    // {
    //     name: "social",
    //     type: "message",
    //     message: "Je ne suis nul part pour le moment."
    // },
    {
        name: "tchip",
        type: "message",
        message: "/me tchipe tout le monde, sans exception."
    },
    {
        name: "fdp",
        type: "message",
        message: "Faites des phrases complètes bordel !!!"
    }
];
module.exports = commands
