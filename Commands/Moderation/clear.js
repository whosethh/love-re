const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    description: "Deletes proven amount of mesages from proven user. either every single.",
    permission: "MANAGE_MESSAGES",
    options: [

        {
            name: "amount",
            description: "Please prove the amount of messages you want to delete.",
            type: "NUMBER",
            required: true
        },

        {
            name: "target",
            description: "Do you want to prove any targets?",
            type: "USER",
            required: false
        }

    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber('amount');
        const Target = options.getMember('target');

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor('DARK_BUT_NOT_BLACK');

        if(Target) {
            let i = 0
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;

                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🚀 Cleared \`${messages.size}\` from ${Target}`)
                interaction.reply({ embeds: [Response] })
            })

        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🚀 Cleared \`${messages.size}\` from <#${interaction.channel.id}>`)
                interaction.reply({ embeds: [Response] })
            })
        }
    }
}