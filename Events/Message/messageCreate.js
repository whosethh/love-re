const { client } = require("../../Structures/index")
const { Client, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/Server");
const Commands = require("../../Commands/Message/help.js");

//where is it?
//
module.exports = {
  name: 'messageCreate',
    once: false,
    /**
     * 
     * @param {Message} message
     */
    execute:async message=>{
      if(message.author.bot)
        return;

      var server = await DB.findOne({id: message.guild.id});

      var prefix = "!";
      if(server !== null)
        prefix = server.prefix;

      var args = message.content.toLowerCase().slice(prefix.length).split(' ').splice(1);
      var mentionArgs = message.content.toLowerCase().slice(`<@!${client.user.id}> `.length).split(' ').splice(1);

      //Execute the command
      if(message.content.toLowerCase().startsWith(prefix))
        getCommand(prefix, message, args);
      else if(message.content.toLowerCase().startsWith(`<@!${client.user.id}> `))
        getCommand(`<@!${client.user.id}> `, message, mentionArgs, prefix);
    }
}

async function getCommand(prefix, message, args, serverPrefix) {
  //Check argument lengths
  var lengthCheck = message.content.toLowerCase().slice(prefix.length).split(' ');
  for(var i = 0; i < lengthCheck.length; i++)
    if(lengthCheck[i].length >= 100) {
      message.reply({embeds: [(new MessageEmbed()).setTitle("Argument length overflow")
        .setDescription("In what world would you need to use 100+ word in a single command argument?")]});
      return;
    }
  //Get corresponding command
  for(var i = 0; i < Commands.length; i++)
    if(message.content.toLowerCase().slice(prefix.length).split(' ')[0] == Commands[i].name.toLowerCase() || (Commands[i].alt && message.content.toLowerCase().slice(prefix.length).split(' ')[0] == Commands[i].alt.toLowerCase())) {
      //If has subcommands, get the corresponding subcommand
      if(Commands[i].subCommands && message.content.toLowerCase().slice(prefix.length).split(' ').length > 1) {
        for(var _i = 0; _i < Commands[i].subCommands.length; _i++)
          if(message.content.toLowerCase().slice(prefix.length).split(' ')[1] == Commands[i].subCommands[_i].name.toLowerCase() || (Commands[i].subCommands[_i].alt && message.content.toLowerCase().slice(prefix.length).split(' ')[1] == Commands[i].subCommands[_i].alt.toLowerCase())) {
            var subargs = args.slice(1);
            if(await executeCommand(serverPrefix ? serverPrefix : prefix, message, subargs, Commands[i].subCommands[_i]))return;
          }

        if(await executeCommand(serverPrefix ? serverPrefix : prefix, message, args, Commands[i]))return;
      }
      else
        if(await executeCommand(serverPrefix ? serverPrefix : prefix, message, args, Commands[i]))return;
    }
  
  //If nothing matched, send an error
  message.reply({embeds: [(new MessageEmbed()).setTitle("Command not found.").setDescription("Try using `Help`.")]});
}

async function executeCommand(prefix, message, args, cmd)
{
  //Check argument restrictions
  if((!cmd.minArgs || args.length >= cmd.minArgs) &&
  (!cmd.maxArgs || args.length <= cmd.maxArgs) &&
  (cmd.minArgs || cmd.maxArgs || args.length == cmd.argsAmount)) {
    //Run the command
    try{cmd.run(prefix, message, args);}
    catch(e){message.reply({embeds: [(new MessageEmbed()).setTitle("Internal error ;-;").setDescription(e)]})}
    return true;
  }
  else {
    //Display the corresponding argument error message
    if(cmd.minArgs && !cmd.maxArgs)
      message.reply({embeds: [(new MessageEmbed()).setTitle("Invalid argument amount.")
        .setDescription(`There must be at least ${cmd.minArgs} argument(s).`)]});
    else if(!cmd.minArgs && cmd.maxArgs)
      message.reply({embeds: [(new MessageEmbed()).setTitle("Invalid argument amount.")
        .setDescription(`There must be no more than ${cmd.maxArgs} argument(s).`)]});
    else if(cmd.minArgs && cmd.maxArgs)
      message.reply({embeds: [(new MessageEmbed()).setTitle("Invalid argument amount.")
        .setDescription(`There must be ${cmd.minArgs} to ${cmd.maxArgs} arguments.`)]});
    else
      message.reply({embeds: [(new MessageEmbed()).setTitle("Invalid argument amount.")
        .setDescription(`There must be ${cmd.argsAmount} argument(s).`)]});
    return true;
  }
  return false;
}