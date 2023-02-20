//index.js
const { 
  Client, 
  Events, 
  GatewayIntentBits, 
  Partials, 
  MessageEmbed} = require('discord.js');
require('dotenv').config()

const client = new Client({
	intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
	partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.Reaction],
});

//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
  client.channels.cache.get(`1076914336745922725`).send(`Ich kann nicht sprechen, nyaaaa~ :C`)
});

//Listen to new messages on the server
client.on("messageCreate", async (message) => {
  console.log('recived message'+ message.content)
  
  if (message.content === "ping") {
    message.reply("pong");
    }
  if (message.content === "try embed"){
    console.log(`logged in as ${client.user.tag}`);
    const exampleEmbed = new MessageEmbed()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    console.log({ embeds: [exampleEmbed] })

    message.channel.send({ embeds: [exampleEmbed] });
  }
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