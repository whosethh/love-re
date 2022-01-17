const { MessageEmbed, CommandInteraction, Message } = require("discord.js");

module.exports = {
    name: "eval",
    description: "developer test command",
    permission: "ADMINISTRATOR",
    options: [
        
        {
            name: "code",
            description: "Put the code you want to eval.",
            type: "STRING",
        },

        {
            name: "lang",
            description: "Put the Language of your code.",
            type: "STRING",
        }

    ],

/**
* 
* @param {CommandInteraction} interaction
* @param {Client} client
* 
*/

    async execute(interaction, client) {

        const Response = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setAuthor(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.user.avatarURL({ dynamic: true }))
      //  .setDescription(`Generated Code \`\`\`${codeblocks()} \n ${code} \`\`\` `)

        const code = interaction.options.getString("code")

        const codeblocks = ["python","js"]
        
        
        const lang = interaction.options.getString("lang")
        
        const langname = lang

        const evalledCode = eval(code) 


    if(!codeblocks.includes(lang)) {
        Response.setDescription("Couldn't find this language Please Provide a real language or, Please use. " + `\`\`\`\j\s\n ${codeblocks[1]} or ${codeblocks[0]}  \`\`\`` + "Anyone of these.");
        Response.setTitle("Error <:error:924084462545956905>");
    }
    
    if(codeblocks.includes(lang)) {
        Response.setDescription(`Given Code: \n` + `\`\`\`${langname}\n ${code}  \`\`\`\ \n Out Code: \n \`\`\`${langname}\n ${evalledCode} \`\`\``);
        Response.setTitle("Success <a:verify:930269771990179931>");

    }

    if(evalledCode == undefined) {
        Response.setDescription(`Given Code: \n` + `\`\`\`${langname}\n ${code}  \`\`\`\ \n Out Code: \n \`\`\`${langname}\n Code Returns Undefined. \`\`\``);
    }
            //      if(code == null) {
        //            code = "No code were given."
        //       }

        if(code == null ) {
            Response.setTitle(`Error <:error:924084462545956905>`);
            Response.setDescription(`**\`\`\`${langname}\n Please Provide a Valid Code. \`\`\`**`);
        }
        interaction.reply({ embeds: [Response] })
        
       

        
    }
}