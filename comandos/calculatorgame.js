const math = require("mathjs")

module.exports = {
    name: "mathduel",
    aliases: [],
    async execute(client, message, args) {
      const challengedUser = message.mentions.users.first() || client.users.cache.get(args[0])
      if (!challengedUser) {
        return message.channel.send("Você deve mencionar um usuário para desáfia-lo ao duelo.")
      } 
      
      var numbersArray = math.evaluate(":1596")._data
      var randomNumber1 = numbersArray[Math.floor(Math.random() * numbersArray.length)]
      var randomNumber2 = numbersArray[Math.floor(Math.random() * numbersArray.length)]
      var operation = randomNumber1 + randomNumber2

      var msg = await message.channel.send(`Iniciando o desafio com o ${challengedUser.username}.\n1º Operação matemática: ${randomNumber1} + ${randomNumber2}\nResultado: ${operation} `)


      let filter = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter1 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter2 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter3 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter4 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter5 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter6 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter7 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter8 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let filter9 = (m) => m.author.id === message.author.id || m.author.id === challengedUser.id
      let collector = msg.channel.createMessageCollector(filter, { maxProcessed: 2 })
      let collector1 = msg.channel.createMessageCollector(filter1, { maxProcessed: 2 })
      let collector2 = msg.channel.createMessageCollector(filter2, { maxProcessed: 2 })
      let collector3 = msg.channel.createMessageCollector(filter3, { maxProcessed: 2 })
      let collector4 = msg.channel.createMessageCollector(filter4, { maxProcessed: 2 })
      let collector5 = msg.channel.createMessageCollector(filter5, { maxProcessed: 2 })
      let collector6 = msg.channel.createMessageCollector(filter6, { maxProcessed: 2 })
      let collector7 = msg.channel.createMessageCollector(filter7, { maxProcessed: 2 })
      let collector8 = msg.channel.createMessageCollector(filter8, { maxProcessed: 2 })
      let collector9 = msg.channel.createMessageCollector(filter9, { maxProcessed: 2 })

      collector.on("collect", m => {
        if (m.content === operation.toString()) {
          message.channel.send(`${m.author.username} ganhou!`)
          collector.stop()
        } else {
          message.channel.send("Errou!")
        }
      })
    }
}