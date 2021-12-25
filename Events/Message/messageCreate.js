const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message
     * 
     */

    execute(message) {
        if(message.author.bot) return;

        
    }

}
