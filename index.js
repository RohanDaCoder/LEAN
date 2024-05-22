require("dotenv").config();
console.clear();
const {
  Client,
  GatewayIntentBits,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");

const { CommandKit } = require("commandkit");
const config = require("./config.js");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.config = config;
process.client = client;
process.config;

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "Commands"),
  eventsPath: path.join(__dirname, "Events"),
  validationsPath: path.join(__dirname, "Validations"),
  devGuildIds: ["1101454417586294854"],
  devUserIds: config.devIDs,
  bulkRegister: true,
});

client.login(process.env.TOKEN);
