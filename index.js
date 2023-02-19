//index.js

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

//Listen to new messages on the server
client.on("message", async (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

//Login to the server using bot token
client.login(process.env.TOKEN);