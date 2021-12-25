const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { connection } = require('mongoose');
require('../../Events/Client/ready')

module.exports = {
    name: 'status',
    description: 'Displays bot status/uptime/ping/etc.',
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * 
     */

    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor('DARK_BUT_NOT_BLACK')
        .setDescription(`**Client Ping**: \`${client.ws.ping}\`ms \n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R> \n Database: ${switchTo(connection.readyState)}`)

        interaction.reply({ embeds: [Response] })

    }

}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0: status = `Disconnected from database. <:error:924084462545956905>`      
            break;
        case 1: status = `Connected to the database. <:valid:924084462516584468>`
            break;
        case 2: status = `Connecting to the database <a:status2:924090251343958086>`
            break;
        case 3: status = `Disconnecting from the database <a:status3:924090198046949386>`
            break;
    }
    return status;
    
}