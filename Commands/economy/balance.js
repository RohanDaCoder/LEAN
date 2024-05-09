const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const EconomyManager = require("../../Util/EconomyManager");
const { emojis } = require("../../config.js")
const economyManager = new EconomyManager();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check Someone's Balance")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select the User You Want to Check Balance Of")
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("The User's ID You Want to Check Balance Of")
        .setRequired(false),
    ),
  run: async ({ client, interaction }) => {
    await interaction.deferReply();

    let id;
    const userOption = interaction.options.getUser("user");
    const userId = interaction.options.getString("user_id");
    if (!userOption && !userId) {
      id = interaction.user.id;
    } else if (userOption) {
      id = userOption.id;
    } else if (userId) {
      id = userId;
    }
   const user = await client.users.cache.find(i => i.id === id);
   if(!user) return interaction.reply(`:x: Could Not Find That User.`)
    try {
      const wallet = await economyManager.fetchMoney(id);
      const balanceEmbed = new EmbedBuilder()
        .setTitle(`Balance`)
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})})
        .addFields({
          name: "Wallet",
          value: `${wallet.toLocaleString()} ${emojis.money}`,
        })
        .setColor("Random")
        .setTimestamp();

      await interaction.editReply({ embeds: [balanceEmbed] });
    } catch (error) {
      console.error("Error fetching balance:", error.message);
      await interaction.editReply("An error occurred while fetching balance.");
    }
  },
};
