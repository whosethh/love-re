const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "snipe",
    description: "Display the latest message sent in the server (bots excluded)",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */

    async execute(interaction) {
        const { channel } = interaction;

        const Messages = await channel.messages.fetch();
    }
}
