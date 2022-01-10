const { Perms } = require('../Validation/Permissions');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Ascii = require('ascii-table');

module.exports = {
    name: "disable",
    description: "Disable a slash command in this server.",
    permission: "ADMIN",
    options: [
        {
            name: "name",
            description: "Please provide the slash command you want to disable.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Name = options.getString('name');

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor('DARK_BUT_NOT_BLACK');

        const Table = new Ascii();
      
        CommandsArray = [];

        (await PG(`${process.cwd()}/Commands/**/*.js`)).map(async (file) => {
            const command = require(file);

            if(!command.name)
            return Table.addRow(file.split("/")[7], "Failed", "Code: 417")

            if(!command.description)
            return Table.addRow(command.name, "Failed", "Code: 417") 

            if(command.permission) {
                if(Perms.includes(command.permission))
                command.defaultPermission = false;
                else 
                return Table.addRow(command.name,"Failed", "Code: 403")
            }

            client.commands.set(command.name, command);
            CommandsArray.push(command);

            await Table.addRow(command.name, ("Succsesfull"))

        });
    }
}
