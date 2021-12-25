const { MessageEmbed, Message } = require('discord.js');
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
            channel: message.channel.id,
            content: message.content,
            timestamp: Date.now()
        }

        if(Mongoose.connection.readyState == 1)
            Guild.findOne({id: message.guild.id}).then(guild=>{
                if(guild === null)
                {
                    guild = new guild({
                        id: message.guild.id,
                        latestMessage:msgData
                    });
                    guild.save();
                }
                else
                {
                    guild.latestMessage = msgData;
                    guild.save();
                }
            });
    }
    else
    {
        message.reply({embeds: [
            new MessageEmbed().addField("Database connection error!", "Tell the devs right now!").setColor("#ff0000")
        ], ephemeral:true});
    }
}
