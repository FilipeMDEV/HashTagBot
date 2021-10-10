const game = new Map()
const REACTIONS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
const REACTIONS_FULL = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"]
const X = ["❌", ":x:"]
const O = ["⭕", ":o:"]

module.exports = {
    name: "jogodavelha",
    aliases: ["velha", "velhadojogo", "tictactoe", "hashtaggame", "jogodovelho"],
    execute(client, message, args) {
        let player = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!player) return message.channel.send("Você deve mencionar um outro usuário para iniciar o jogo")
        
        game.set("time", message.author.id)

        let letter = ["x", "o"]
        let letterRandom = letter[Math.floor(Math.random() * letter.length)]
        game.set("player1_letter", letterRandom)
        game.set("player1_id", message.author.id)
        let pLetter = game.get("player1_letter")

        if (pLetter === "x") {
            game.set("player2_letter", "o")
            game.set("player2_id", player.id)
        } else {
            game.set("player2_letter", "x")
            game.set("player2_id", player.id)
        }
        
        const filter = (reaction, user) => reaction.emoji.name === REACTIONS[0] && user.id === game.get("time")
        const filter1 = (reaction, user) => reaction.emoji.name === REACTIONS[1] && user.id === game.get("time")
        const filter2 = (reaction, user) => reaction.emoji.name === REACTIONS[2] && user.id === game.get("time")
        const filter3 = (reaction, user) => reaction.emoji.name === REACTIONS[3] && user.id === game.get("time")
        const filter4 = (reaction, user) => reaction.emoji.name === REACTIONS[4] && user.id === game.get("time")
        const filter5 = (reaction, user) => reaction.emoji.name === REACTIONS[5] && user.id === game.get("time")
        const filter6 = (reaction, user) => reaction.emoji.name === REACTIONS[6] && user.id === game.get("time")
        const filter7 = (reaction, user) => reaction.emoji.name === REACTIONS[7] && user.id === game.get("time")
        const filter8 = (reaction, user) => reaction.emoji.name === REACTIONS[8] && user.id === game.get("time")
        
        var XO = {
            [message.author.id]: `:${game.get("player1_letter")}:`,
            [player.id]: `:${game.get("player2_letter")}:`
        }
        
        var userTime = client.users.cache.get(game.get("time"))
        message.channel.send(`| :one: | :two: | :three:  |\n  ――――――\n| :four: | :five: | :six:  |\n  ――――――\n| :seven: | :eight: | :nine:  |\n\n${message.author.username}: ${game.get("player1_letter").toUpperCase()}\n${player.username}: ${game.get("player2_letter").toUpperCase()}`).then(msg => {
            REACTIONS.forEach(reaction => {
                msg.react(reaction)
            })
            
            const collector = msg.createReactionCollector(filter);
            const collector1 = msg.createReactionCollector(filter1);
            const collector2 = msg.createReactionCollector(filter2);
            const collector3 = msg.createReactionCollector(filter3);
            const collector4 = msg.createReactionCollector(filter4);
            const collector5 = msg.createReactionCollector(filter5);
            const collector6 = msg.createReactionCollector(filter6);
            const collector7 = msg.createReactionCollector(filter7);
            const collector8 = msg.createReactionCollector(filter8);

            collector.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[0], XO[game.get("time")]))
                
                let array = filterArray(m)
                let v = verification(client, array)

                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector1.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[1], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector2.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[2], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector3.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[3], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector4.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[4], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector5.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[5], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector6.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[6], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector7.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[7], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })

            collector8.on("collect", async (r, u) => {
                r.users.remove(game.get("time"))
                r.users.remove(client.user.id)
                let m = await msg.edit(msg.content.replace(REACTIONS_FULL[8], XO[game.get("time")]))

                let array = filterArray(m)
                let v = verification(client, array)
                if (v.result === true) {
                    msg.delete()
                    message.channel.send(`O usuário ${v.userWin} ganhou a partida! :clap:\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                } else if (v.result === "empate") {
                    msg.delete()
                    message.channel.send(`O jogo terminou em um empate, deu velha! :o\n\n| ${v.tabuleiro[0]} | ${v.tabuleiro[1]} | ${v.tabuleiro[2]} |\n  ――――――\n| ${v.tabuleiro[3]} | ${v.tabuleiro[4]} | ${v.tabuleiro[5]} |\n  ――――――\n| ${v.tabuleiro[6]} | ${v.tabuleiro[7]} | ${v.tabuleiro[8]} |`)
                }

                if (u.id === message.author.id) {
                    game.set("time", player.id)
                } else {
                    game.set("time", message.author.id)
                } 
            })
        })  
    }
}

function filterArray(msng) {
    let msgContentSplited = msng.content.split("|")

    msgContentSplited.shift()
    msgContentSplited.pop()
    msgContentSplited.splice(3, 1)
    msgContentSplited.splice(6, 1)
    return msgContentSplited
}

function verification(client, array) {
    let value =  {}
    let p1Letter = game.get("player1_letter")
    let p2Letter = game.get("player2_letter")
    let p1 = client.users.cache.get(game.get("player1_id"))
    let p2 = client.users.cache.get(game.get("player2_id"))

    if ((array[0].includes(":x:") && array[1].includes(":x:") && array[2].includes(":x:")) || (array[3].includes(":x:") && array[4].includes(":x:") && array[5].includes(":x:")) || (array[6].includes(":x:") && array[7].includes(":x:") && array[8].includes(":x:")) || (array[0].includes(":x:") && array[3].includes(":x:") && array[6].includes(":x:")) || (array[1].includes(":x:") && array[4].includes(":x:") && array[7].includes(":x:")) || (array[2].includes(":x:") && array[5].includes(":x:") && array[8].includes(":x:")) || (array[0].includes(":x:") && array[4].includes(":x:") && array[8].includes(":x:")) || (array[2].includes(":x:") && array[4].includes(":x:") && array[6].includes(":x:"))) {
        value.result = true
        
        if (p1Letter === "x") {
            value.userWin = p1
        } else if (p2Letter === "x") {
            value.userWin = p2
        }
    } else if ((array[0].includes(":o:") && array[1].includes(":o:") && array[2].includes(":o:")) || (array[3].includes(":o:") && array[4].includes(":o:") && array[5].includes(":o:")) || (array[6].includes(":o:") && array[7].includes(":o:") && array[8].includes(":o:")) || (array[0].includes(":o:") && array[3].includes(":o:") && array[6].includes(":o:")) || (array[1].includes(":o:") && array[4].includes(":o:") && array[7].includes(":o:")) || (array[2].includes(":o:") && array[5].includes(":o:") && array[8].includes(":o:")) || (array[0].includes(":o:") && array[4].includes(":o:") && array[8].includes(":o:")) || (array[2].includes(":o:") && array[4].includes(":o:") && array[6].includes(":o:"))) {
        value.result = true

        if (p1Letter === "o") {
            value.userWin = p1
        } else if (p2Letter === "o") {
            value.userWin = p2
        }
    } else if (!array[0].includes(":one:") && !array[1].includes(":two:") && !array[2].includes(":three:") && !array[3].includes(":four:") && !array[4].includes(":five:") && !array[5].includes(":six:") && !array[6].includes(":seven:") && !array[7].includes(":eight:") && !array[8].includes(":nine:")) {
        value.result = "empate"
    }   else {
        value.result = false
    }

    value.tabuleiro = array

    return value
}