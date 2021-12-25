const { CommandInteraction, MessageEmbed } = require('discord.js');
const Mongoose = require("mongodb");

module.exports = {
    name: "snipe",
    description: "Display the latest message sent in the server (bots excluded)",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */

    async execute(interaction) {
        if(Mongoose.connection.readyState == 1)
        {
            Guild.findOne({id: interaction.guild.id}).then(guild=>{
                if(guild === null)
                {
                    interaction.reply({embeds: [
                        new MessageEmbed().addField("No messages yet", "Be the first to send one!").setColor("#ff0000")
                    ], ephemeral:true});
                    return;
                }
                
                interaction.reply({embeds: [
                    new MessageEmbed().setAuthor(guild.latestMessage.user.name, guild.latestMessage.user.pfp)
                    .setDescription(`${guild.latestMessage.content}\n\n*Sent in <#${guild.latestMessage.channel}> at <t:${guild.latestMessage.timestamp}:>*`).setColor("#ff0000")
                ]});
            });
        }
        else
        {
            interaction.reply({embeds: [
                new MessageEmbed().addField("Database connection error!", "Tell the devs right now!").setColor("#ff0000")
            ], ephemeral:true});
        }
    }
}
