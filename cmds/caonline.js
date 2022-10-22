exports.run = async (message, args)=> {
    
var fetch = require("node-fetch");

function cach(maxcach , length)
{
  khoangcach = "                                                                                                                                                                                    "
  return khoangcach.substring(0, maxcach - length)
}

function hasnametag(typenametag, namestring)
{
  namestring = namestring.trim().toLowerCase();
  var nametagdata = config.nametag[typenametag]
  if (!nametagdata || nametagdata.length == 0) return console.log('Nametag [' + typenametag + '] not found!')

  for (let i = 0; i < nametagdata.length; i++)
  if (namestring.indexOf(nametagdata[i]) === 0) return true;
  return false;
}

try
{
  data = await fetch(`http://${config.ip}/players.json`) 
  data = await data.json()
} 
catch (error)
{
  console.log(error)
  return message.reply('`Server đang Offline`')
}
if (data === null || data === []) online = 0
else online = data.length

var caonline = '';
var stt = 1;
var sttquany = 1 ;
for (i=0; i < online ; i ++ )
{ 
  ten =data[i].name
 
  if (hasnametag('ca' , ten))
  { 
    caonline += '\r\n#' + stt + cach(4, stt.toString().length) + '[ID:' + data[i].id + ']' + cach(6 , data[i].id.toString().length ) + ': ' + data[i].name
    stt++
  }
  if (hasnametag('qy' , ten))
  { 
    quanyonline += '\r\n#' + sttquany + cach(4, sttquany.toString().length) + '[ID:' + data[i].id + ']' + cach(6 , data[i].id.toString().length ) + ': ' + data[i].name
    sttquany++
  }

} 
if (caonline) var caonline = '```fix\r\n' + caonline +'```' 
else var caonline = '`Không Có Công An Nào ONLINE`'
if (quanyonline) var quanyonline = '```' + quanyonline +'```' 
else var quanyonline = '`Không Có Quân Y Nào ONLINE`'
 var embed = new Discord.MessageEmbed()
  .setTitle('Hang Đá RP')
  .setThumbnail(config.linkavt)
  .setColor('RANDOM')
  .addFields(
    { name: 'Công An Online:'   , value: caonline, inline: false },
    { name: 'Quân Y Online:'   , value: quanyonline, inline: false },
  

  )
  .setTimestamp();
  message.reply(embed);

}
    
    