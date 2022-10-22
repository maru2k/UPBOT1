exports.run = async (message, args)=> {
  
    var embed = new Discord.MessageEmbed();
  var user = message.mentions.users.first()
  if (!user)
  {
    message.reply("");
    embed.setTitle('Avatar Của Bạn: ')
    embed.setAuthor('Link Ảnh Gốc','', message.author.displayAvatarURL({ fomat: 'png', dynamic: 'true',size: 2048}))
    embed.setImage(message.author.displayAvatarURL({ fomat: 'png', dynamic: 'true',size: 1024} ) )
    embed.setColor('RANDOM').setTimestamp()
  }
  else
  {
    message.reply("  " );
    embed.setTitle(" Avatar của " + user.username +" : " )
    embed.setAuthor('Link Ảnh Gốc','', user.displayAvatarURL({ fomat: 'png', dynamic: 'true',size: 2048}))
    embed.setImage(user.displayAvatarURL({ fomat: 'png', dynamic: 'true',size: 1024} ) )
    embed.setColor('RANDOM').setTimestamp()
  }

  message.channel.send(embed);
   
     }
    
    
  