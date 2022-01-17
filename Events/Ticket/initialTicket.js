const { ButtonInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton,
    } = require("discord.js");
    const DB = require("../../Structures/Schemas/TicketDB");
    const { ParentID, EveryoneID, OpenedParentID } = require("../../Structures/config.json");
    const { nanoid, customAlphabet} = require("nanoid");
        
module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction
     * 
     */

    async execute(interaction) {
        if(!interaction.isButton()) return;
        
        const  {guild, member, customId} = interaction;

        if(!["other", "issue", "user"].includes(customId)) return;

        const nanoidd = customAlphabet('123456789abcdef', 14);

          const ID = await nanoidd(10);

          await guild.channels.create(`${customId}` +  " - "  +  ID,  {
              type: "GUILD_TEXT",
              parent:   OpenedParentID,
              permissionOverwrites: [
                  {

                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]

                  },

                  {
                       id: EveryoneID,
                       deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                  },
              ],
          }).then(async(channel) => {
              await DB.create({
                  GuildID: guild.id,
                  MemberID: member.id,
                  TicketID: ID,
                  ChannelID: channel.id,
                  Closed: false,
                  Locked: false,
                  Type: customId,
              });

              const Embed = new MessageEmbed()
              .setAuthor(`${guild.name} | Ticket: ${ID}`, guild.iconURL({ dynamic: true }))
              .setDescription("Please Wait Until Our Support Team Arrives for help,  Please don't ping us for useless reasons. ")
              .setFooter(`${guild.name} ticketing system.`, guild.iconURL({ dynamic: true }))
              .setThumbnail(`https://cdn.discordapp.com/attachments/851922612409335818/869032854376546344/R_6.jpg`)
              .setImage(`https://media.discordapp.net/attachments/854514305176305664/896332727933079562/--9.gif`)
              .setColor('DARK_VIVID_PINK')
          
              const Buttons = new MessageActionRow();
              Buttons.addComponents(
                  new MessageButton()
                  .setCustomId("lock")
                  .setLabel("Lock's the ticket")
                  .setStyle("SECONDARY")
                  .setEmoji("🔒"),
                  new MessageButton()
                  .setCustomId("close")
                  .setLabel("Closes & removes the ticket")
                  .setStyle("SECONDARY")
                  .setEmoji("♻"),
                  new MessageButton()
                  .setCustomId("unlock")
                  .setLabel("Unlock the ticket")
                  .setStyle("SECONDARY")
                  .setEmoji("🔓"),
              )

              await channel.send({ embeds: [Embed], components: [Buttons] })

          });

        }
    
}