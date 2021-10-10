const { Client, Collection } = require("discord.js")
const client = new Client()
const { prefix } = require("./config.json")
const fs = require('fs');
const express = require("express")
const app = express()
const axios = require("axios")
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT || 3000, () => {
  setInterval(() => {
    axios.get('https://HashTagBot.iiamfilippin.repl.co')
  }, 25 * 60000)
})

require("dotenv").config()

client.commands = new Collection()

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", () => console.log("[BOT] Ligado"))

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		client.commands.get(command.name).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.channel.send("Ocorreu um erro ao executar este comando.")
	}
});

client.on("messageUpdate", (oldMsg, newMsg) => client.emit("message", newMsg))

client.login(process.env.TOKEN)