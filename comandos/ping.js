module.exports = {
    name: "ping",
    aliases: ["pingo"],
    execute(client, message, args) {
        message.channel.send("pong")
    }
}