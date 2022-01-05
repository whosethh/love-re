const 
{ MessageEmbed,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
    } = require("discord.js");

const { OpenTicket } = require("../../Structures/config.json");

module.exports = {
    name: "ticket",
    description: "Toggle Ticket System",
    permissions: "ADMINISTRATOR",

/**
 * 
 * @param {CommandInteraction} interaction
 * 
 */
async execute(interaction) {
    const guild = interaction.guild;
    
    const Embed = new MessageEmbed()
    .setAuthor(guild.name + " | Ticketing System", guild.iconURL({ dynamic: true }))
    .setColor("DARK_BUT_NOT_BLACK")
    .setDescription("Open a ticket in order to get help. \n Please don't abuse ticketing system. Don't Open useless tickets.")


    const Buttons = new MessageActionRow();
    Buttons.addComponents(
        new MessageButton()
        .setCustomId("user")
        .setLabel("Report a User.")
        .setStyle("SECONDARY")
        .setEmoji("<:ban:922971709466882098>"),
        new MessageButton()
        .setCustomId("issue")
        .setLabel("Report a Server/Bot issue.")
        .setStyle("SECONDARY")
        .setEmoji("<:mod:922971699136315442>"),
        new MessageButton()
        .setCustomId("other")
        .setLabel("Report other stuff")
        .setStyle("SECONDARY")
        .setEmoji("<a:zorangeheartlol:923243350776242236>"),

    );

    await guild.channels.cache.get(OpenTicket).send({ embeds: [Embed], components: [Buttons] });
    
    interaction.reply({ content: "Ticket System has been Activated.", ephemeral: true })
    },
};