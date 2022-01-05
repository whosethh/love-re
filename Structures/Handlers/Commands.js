const { Perms } = require('../Validation/Permissions');
const { Client } = require('discord.js');


/**
 * 
 * @param {Client} client
 * 
 */

module.exports = async (client, PG, Ascii, clk) => {
    const Table = new Ascii('Command Loaded'); 

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "Failed", "Code: 417")

        if(!command.context && !command.description)
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

    console.log(Table.toString())

    client.on('ready', async () => {
        const MainGuild = await client.guilds.cache.get("920779820856643655");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumlator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumlator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []); 

                return [...accumlator, {id: r.id, permissions}]
            }, []);

            await MainGuild.commands.permissions.set({ fullPermissions })

        })
    })

}