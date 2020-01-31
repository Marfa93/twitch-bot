// const sqlite = require('sqlite3').verbose()
var fs = require('fs')

// function initDB() {
//     const db = new sqlite.Database('./db/quotes.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             let sql = fs.readFileSync('./db/quotes.sql', 'utf8')
//             db.run(sql)
//             console.log('Connected to the database')
//         }
//     })

//     return db
// }

function removeCommandsMessage(message) {
    const tokens = message.split(' ')
    tokens.splice(0, 2)

    return tokens.join(' ').trim()
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
    /*{
        name: "quote",
        type: "function",
        func: function (channel, userstate, message, client, subCommand = '') {
            const db = initDB()
            switch (subCommand) {
                case 'add':
                    //Save the quote
                    let quote = removeCommandsMessage(message)
                    if (quote === '') {
                        client.say(channel, `@${userstate.username}: Il n'y a pa de citation ! Escroc !`)
                        db.close()
                        return
                    }
                    let insertSql = `INSERT INTO quotes (quote, author) VALUES (?, ?)`
                    db.run(
                        insertSql,
                        [quote, userstate.username],
                        function (err) {
                            if (err) {
                                console.log(err)
                                client.say(channel, `@${userstate.username}: Une erreur est survenue lors de l'ajout de la citation`)
                            } else {
                                client.say(channel, `@${userstate.username}: La citation a été ajoutée ! :)`)
                            }
                        }
                    )
                    db.close()
                    break
                case 'remove':
                    //Remove a quote
                    let removeSql = `DELETE FROM quotes WHERE quotes_id = ?`
                    let quoteId = removeCommandsMessage(message)
                    db.run(
                        removeSql,
                        [quoteId],
                        function(err) {
                            if (err) {
                                console.log(err)
                                client.say(channel, `@${userstate.username}: Une erreur est survenue lors de la suppression :(`)
                            } else {
                                return this.changes === 0
                                ? client.say(channel, `@${userstate.username}: La citation #${quoteId} n'existe pas.`)
                                : client.say(channel, `@${userstate.username}: La citation #${quoteId} a été supprimé !`)
                            }
                        }
                    )
                    // client.say(channel, `@${userstate.username}: La commande "remove" sera disponible sous peu ;)`)
                    db.close()
                    break
                default:
                    let randomQuoteSql = `SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1`
                    db.get(randomQuoteSql, [], (err, row) => {
                        if (err) {
                          console.log(err)
                          client.say(channel, `@${userstate.username}: Une erreur est survenue :(`)
                        } else {
                            return row
                            ? client.say(channel, `@${userstate.username}: #${row.quotes_id} ${row.quote}`)
                            : client.say(channel, `@${userstate.username}: Pas de citation dipsoninible :(`)
                        }
                    })
                    db.close()
            }
        }
    }*/
];
module.exports = commands
