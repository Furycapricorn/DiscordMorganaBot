//index.js

require("dotenv").config();
const {Discord, Client, Intents, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder,Partials, Events } = require('discord.js');
const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
 });


//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
  //client.channels.cache.get('1076923514117955696').send('Testooo')

});

//Listen to new messages on the server
client.on("message", async (message) => {
  console.log("Recived Message")
  console.log(message.content)
  if (message.content === "ping") {
    message.reply("pong :cookie: ");
    message.react('🍪')
  }else if(message.content ==="loud ping")
  message.reply("/tts pong")
});


client.on(Events.MessageReactionAdd, async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});


//Login to the server using bot token
client.login(process.env.TOKEN);