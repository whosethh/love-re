const { MessageEmbed, WebhookClient, GuildMember, Webhook, Message } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    /**
     * 
     * @param {GuildMember} member
     * 
     */

    execute(member) {

        const { user, guild } = member;

        member.roles.add('924094172812701737')
        
        const Welcomer = new WebhookClient({
            id: '924100119194902529',
            token: 'JwrmvQcqTZccXlQzEHbvs2xBeHVfMuqFd66cqk5QdZFB0wCZtVs_gPPgVN19FinqwFYT'
        });

        const Welcome = new MessageEmbed()
            .setColor('RED')
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512}))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512}))
            .setDescription(`${member} left the community **${guild.name}**! \n Account Created at: <t:${parseInt(user.createdTimestamp / 1000)}:R> \n Joined at: <t:${parseInt(member.joinedTimestamp / 1000)}:R> \n Member Count: **${guild.memberCount}**`)
            .setFooter(`ID: ${user.id}` )

            Welcomer.send({ embeds: [Welcome] })
    }
    
}