module.exports = {
    name:"Help",
    run:function(prefix, message, args) {
      var page = 1;
      if(args.length > 0) {
        if(!isNaN(parseInt(args[0])))
          page = parseInt(args[0]);
        else {
          message.reply({embeds: [(new MessageEmbed()).setTitle("Not a number.")
            .setDescription("I need a number.")]});
          return;
        }
      }
  
      var pages = splitArray(Commands, 5, c => !c.restriction);
        
      if(pages[page-1] !== undefined) {
        var msg = new Discord.MessageEmbed();
        msg.setColor("#99ff99").setTitle("Help menu").setDescription(`page ${page}/${pages.length}`);
        for(let i = 0; i < pages[page-1].length; i++) {
          if(pages[page-1][i].subCommands) {
            var subs = pages[page-1][i].subCommands;
            var subDisplay = "";
            for(var _i = 0; _i < subs.length; _i++)
              subDisplay+=`\n${(pages[page-1][i].subCommands.length > 1 && _i < pages[page-1][i].subCommands.length-1) ? "┣" : "┗"} ***${pages[page-1][i].subCommands[_i].name}${pages[page-1][i].maintenance ? " <a:Gear_Animated:922687932891025488>" : ""}***\n${(pages[page-1][i].subCommands.length > 1 && _i < pages[page-1][i].subCommands.length-1) ? "┃" : "  "} *${prefix}${pages[page-1][i].subCommands[_i].syntax.replace(/{p}/g, prefix)}*\n${(pages[page-1][i].subCommands.length > 1 && _i < pages[page-1][i].subCommands.length-1) ? "┃" : "  "} *${pages[page-1][i].subCommands[_i].desc}*`;
          }
          msg.addField(`${pages[page-1][i].name}${pages[page-1][i].maintenance ? " <a:Gear_Animated:922687932891025488>" : ""}`, `${prefix}${pages[page-1][i].syntax.replace(/{p}/g, prefix)}\n${pages[page-1][i].desc}${pages[page-1][i].subCommands ? subDisplay : ""}`, false);
        }
        message.reply({embeds: [msg]});
      }
      else message.reply({embeds: [(new MessageEmbed()).setTitle("Out of bounds.")
        .setDescription("Try another number.")]});
    },
    maxArgs:1,
    syntax:"Help [Page]",
    desc:"Brings up this help message.",
    message:"Implementing discord buttons ;D"
  }