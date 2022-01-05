const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

const { TranscriptsID } = require("../../Structures/config.json");
const DB = require("../../Structures/Schemes/TicketDB");
const data = DB

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const { guild, customId, channel } = interaction;

        if(!["close", "lock", "unlock"].includes(customId)) return;
        
        const Embed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")

        DB.findOne({ ChannelID: channel.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) return; interaction.reply({ content: "No data was found related to this ticket, please delete it manually"})
        });
        switch(customId) {
            case "lock" :
                if(docs.Locked == true)
                return; interaction.reply({ 
                    content: "Ticket is already locked.",
                    ephemeral: true
                });
                await DB.updateOne({ ChannelID: channel.id}, { Locked: true });
                Embed.setDescription("🔒 | This ticket is locked.");
                channel.permissionOverwrites.edit(docs.memberID, {
                    SEND_MESSAGES: false,
                });
                interaction.reply({ embeds: [Embed] });
                break;
                case "unlock":
                    if(docs.Locked == false)
                    return; interaction.reply({ 
                        content: "Ticket is already unlocked.",
                        ephemeral: true
                    });
                    await DB.updateOne({ ChannelID: channel.id}, { Locked: false });
                    Embed.setDescription("🔓 | This ticket is now unlocked.");
                    channel.permissionOverwrites.edit(docs.memberID, {
                        SEND_MESSAGES: true,
                    });
                    interaction.reply({ embeds: [Embed] });
                    break;
                    case "close":
                        if(docs.closed == true)
                        return interaction.reply({
                            content: "Ticket is already closed please wait for it to get removed!",
                            ephemeral: true
                        });
                        const attachment = await createTranscript(channel, {
                            limit: -1,
                            returnBuffer: false,
                            fileName: `${docs.type} - ${docs.TicketID}.html`,
                        });
                        await DB.updateOne({ ChannelID: channel.id }, { closed: true });

                        const MEMBER = guild.members.cache.get(docks.memberID);
                        const Message = await guild.channels.cache.get(TranscriptsID).send({ embeds: [Embed.setAuthor(MEMBER.user.tag, Member.user.displayAvatarURL({ dynamic: true }).setTitle(`Transcript Type: ${docs.Type} \n ID: ${docs.TicketID}`))], files: [attachment], });

                        interaction.reply({ embeds: [Embed.setDescription(`The Transcript is saved: [Transcript](${Message.url})`)]})

                        setTimeout(() => {
                            channel.delete();

                        }, 10 * 1000); 
        }
    }
}