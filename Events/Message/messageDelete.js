const { MessageEmbed, Message, WebhookClient } = require('discord.js');

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message
     * 
     */



    execute(message) {
        if(message.author.bot) return;

        console.log(client)

        const Log = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`📕 a message was **deleted** in <#${message.channel.idd}> \n **Deleted Message**: \`${message.content ? message.content : "None"}\``.slice(0, 4096))

            if(message.attachments.size >= 1){
                Log.addField(`**Attachments**: ${message.attachments.map(a => a.url)}`, `‎`)
            }

            new WebhookClient({ url: 'https://discord.com/api/webhooks/924401636435165264/bzSoYMOUxBGe2hdQdhk-vATtSDkFKAbWSeg1EoNBq19ehSvDJmoGcSF8jxOOpfm2yZ0O' }).send({ embeds: [Log] }).catch((err) => console.log(clk.brightRed.bold(err)))
    }

}