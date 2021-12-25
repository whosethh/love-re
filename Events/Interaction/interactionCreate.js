const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
/**
 * 
 * @param {CommandInteraction} interaction
 * @param {Client} client
 * 
 */

async execute(interaction, client) {
    if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if(!command) return interaction.reply({ embeds: [
    new MessageEmbed()
            .setColor('#ff1e8e')
            .setTitle('Error')
            .setDescription(' <:error:924084462545956905> An error has occured please report this error to the bot owner using \` /support \` command! Thank You')
        ]}) && client.commands.delete(interaction.commandName);

        command.execute(interaction, client)

            }
        }
        }