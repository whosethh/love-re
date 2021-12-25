const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    /**
     * 
     * @param {GuildMember} member
     * 
     */

    execute(member) {

        const { user, guild } = member;

        member.roles.add('924094172812701737')
        
        const Welcomer = new WebhookClient({
            id: '924093958773178398',
            token: 'GP9iTf4rSX5w1AO84XxoDEFZ0Trga2_5EwOCKa2shT5eySz50HxOEExj3g4sKdry4Gj9'
        });

        const Welcome = new MessageEmbed()
            .setColor('DARK_BLUE')
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`Welcome ${member} to **${guild.name}**! \n Account Created at: <t:${parseInt(user.createdTimestamp / 1000)}:R> \n Joined at: <t:${parseInt(member.joinedTimestamp / 1000)}:R> \n Member Count: **${guild.memberCount}**`)
            .setFooter(`ID: ${user.id}` )

            Welcomer.send({ embeds: [Welcome] })
    }
    
}