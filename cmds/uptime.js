exports.run = async (message, args)=> {
 
var fetch = require("node-fetch");

try 
{
  data = await fetch(`http://${config.ip}/players.json`)
  data = await data.json()
  if (data === null || data === []) var online = 0
  else var online = data.length;

  data = await fetch(`http://${config.ip}/info.json`)
  data = await data.json()

  var embed = new Discord.MessageEmbed()
  .setTitle('Hang Đá RP')
  .setThumbnail(config.linkavt)
  .setColor('RANDOM')
  .addFields(
    { name: 'Developer:'   , value:  data.vars.Developer, inline: true },
    { name: 'Administrator:'   , value:  data.vars.AdTeam, inline: true },
    { name: 'Uptime:'     , value:  data.vars.Uptime, inline: true },
    { name: 'Trong Game: ', value:  '```yaml\r\n Số Người Chơi: '+ online + "/" +data.vars.sv_maxClients  + ' ' +  data.vars["Công Việc"] + '```' , inline: true },

  )
  .setTimestamp();
  message.reply(embed);

}
catch  { message.reply('`Server đang Offline`') }


}
    
    