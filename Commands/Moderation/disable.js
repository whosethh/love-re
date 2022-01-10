const { Perms } = require('../Validation/Permissions');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "disable",
    description: "Disable a slash command in this server.",
    permission: "ADMIN",
    options: [
        {
            name: "name",
            description: "Please provide the slash command you want to disable.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Name = options.getString('name');

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor('DARK_BUT_NOT_BLACK');
      
        
    }
}
