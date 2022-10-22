exports.run = async (message, args)=> {
  function cach(maxcach , length)
  {
    khoangcach = "                                                                                                                                                                                    "
    return khoangcach.substring(0, maxcach - length)
  }
  
  function hasnametag(nametagdata, namestring)
  {
    namestring = namestring.trim().toLowerCase();
  
    for (let i = 0; i < nametagdata.length; i++)
      if (namestring.indexOf(nametagdata[i]) === 0) return true;
    return false;
  }
  
  try
  {
    data = await fetch(`http://${config.ip}/players.json`).then(d => d.json())
  
  } 
  catch (error)
  {
    console.log(error)
    return message.reply('`Server đang Offline`')
  }


  
  for (let i = 0; i < config.gang.length; i++) {
    let gangdata = config.gang[i]
    let onlinelist = ''
    let stt = 1
 
    
    for (let j=0; j < data.length ; j++ ) { 
      ten =data[j].name


      if(hasnametag(gangdata.nametag , ten))
      { 
        onlinelist += '\n#' + stt + cach(4, stt.toString().length) + '[ID:' + data[j].id + ']' + cach(6 , data[j].id.toString().length ) + ': ' + data[j].name
        stt++
      }
    
    }
  
    if (onlinelist) {
   
      let embed = new Discord.MessageEmbed()
      .setTitle('Hang Đá RP')
      .setThumbnail(config.linkavt)
      .setColor('RANDOM')
      .addFields(
        { name: `${gangdata.label} Online:`   , value: onlinelist, inline: false },
     
      )
      .setTimestamp();
      message.reply(embed);
  
    }
  
  }

}
    
    