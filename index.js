//index.js
const { 
  Client, 
  Events, 
  GatewayIntentBits, 
  Partials, 
  EmbedBuilder,
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  ButtonInteraction
 } = require('discord.js');
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
client.on("ready", async () => {
  console.log(`logged in as ${client.user.tag}`);

  console.log('Send Button')
  const buttonRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('acceptButton')
        .setLabel('Accept')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('declineButton')
        .setLabel('Decline')
        .setStyle(ButtonStyle.Secondary)
    );
    //message.reply({ content: 'Do you accept your fate', components: [row] });
    
  const ruleChannel = client.channels.cache.get(`1077287262754197625`)
  const fetched = await ruleChannel.messages.fetch({limit: 2})
  console.log(fetched)
  ruleChannel.bulkDelete(fetched)
  ruleChannel.send({ content: 'Do you accept your fate', components: [buttonRow] })
  
});

//Listen to new messages on the server
client.on("messageCreate", async (message) => {
  console.log('recived message: '+ message.content)
  
  if (message.content === "ping") {
    message.reply("pong");
    }
    if (message.content === "try embed"){
      console.log(`Embed Message send`);
      const exampleEmbed = new EmbedBuilder()
      .setColor(0xA02323)
      .setTitle('You have been selected to become part of the Phantom Thieves! Here are some rules before we can start stealing hearts together.')
      .setURL('https://discord.js.org/')
      .setAuthor({ name: 'Joker', iconURL: 'https://cdna.artstation.com/p/assets/images/images/014/300/896/large/connor-mcleod-lookincooljoker.jpg', url: 'https://discord.js.org' })
      .setDescription('Sehr wichtige Regeln. Also wirklich super wichtig. Du hast keine Vorstellung wie unfassbar wichtig diese Regeln sind die hier alle stehen könnten. Hoo boy, das ist wirklich sehr wichtig und informativ hier. Du bist bestimmt genauso froh wie ich, dass du so weit gelesen hast. Also Belohnung hast du dir einen Cookie verdient. :cookie:')
      //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
      /*.addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      .setImage('https://i.imgur.com/AfFp7pu.png')*/
      .setTimestamp()
      .setFooter({ text: 'Bitte bestätige unten, dass du verstanden hast.', iconURL: 'https://cdna.artstation.com/p/assets/images/images/014/300/896/large/connor-mcleod-lookincooljoker.jpg' });
      console.log({ embeds: [exampleEmbed] })
  
      message.channel.send({ embeds: [exampleEmbed] });
    }
  if (message.content === "button"){
    console.log('Send Button')
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('acceptButton')
					.setLabel('Accept')
					.setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('declineButton')
          .setLabel('Decline')
          .setStyle(ButtonStyle.Secondary)
			);
    await message.reply({ content: 'Do you accept your fate', components: [row] });
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



client.on(Events.InteractionCreate, async interaction => {
  
	if (interaction.isButton()){
    switch(interaction.customId){
      case "acceptButton":
        await interaction.reply({ content: 'Thank you', ephemeral: true });
        break
      case "declineButton":
        await interaction.reply({ content: 'Not Pog', ephemeral: true })
        break
    }
  }
});


//Login to the server using bot token
client.login(process.env.TOKEN);