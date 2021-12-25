const { Message } = require('discord.js');
const Mongoose = require('mongoose');

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message
     * 
     */

    execute(message) {
        if(message.author.bot) return;
        
        var msgData = {
            user:{
                name: message.author.tag,
                pfp: message.author.displayAvatarURL
            },
            channel: message.channel.name,
            content: message.content,
            timestamp: Date.now()
        }

        if(Mongoose.connection.readyState == 1)
            Guild.findOne({id: message.guild.id}).then(guild=>{
                if(server === null)
                {
                    server = new Server({
                        id: message.guild.id,
                        latestMessage:msgData
                    });
                    server.save();
                }
                else
                {
                    server.latestMessage = msgData;
                    server.save();
                }
            });
    }

}
