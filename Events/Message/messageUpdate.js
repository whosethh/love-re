const { WebhookClient, MessageEmbed, Message } = require('discord.js');
const clk = require('chalk');


module.exports = {
    name: "messageUpdate",

    /**
     * 
     * @param {Message} oldMessage
     * @param {Message} newMessage
     * 
     */
    
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "...": "");
        const editedMessage = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "...": "");

        const Response = new MessageEmbed()
            .setColor('DARK_ORANGE')
            .setDescription(`📙 message was **edited** in ${newMessage.channel} \n **Original Message**: ${Original} \n **Edited Message**: ` + editedMessage.slice("0", "4096"))
            .setFooter(`Member: ${newMessage.author.username}#${newMessage.author.discriminator} | ID: ${newMessage.author.id}`, newMessage.author.avatarURL({ dynamic: true, size: 512 }))

            new WebhookClient({ url: "https://discord.com/api/webhooks/924377201254752357/1Ecg5zNo3ftCf1EMVWMrkIITPGTl93l-YSOZ5U1vnji0qRbFyr4y40KaEJA1fjsWAA5y" }).send({ embeds: [Response] }).catch((err) => console.log(clk.brightRed.bold(err)))
    }
}