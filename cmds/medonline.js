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
var medonline = '';
var sttmed = 1;
var sttquany = 1 ;
var quanyonline = '';
for (i=0; i < online ; i ++ )
{ 
  ten =data[i].name
  if(hasnametag('med' , ten))
  { 
    medonline += '\r\n#' + sttmed + cach(4, sttmed.toString().length) + '[ID:' + data[i].id + ']' + cach(6 , data[i].id.toString().length ) + ': ' + data[i].name
    sttmed++
  }
} 
 if (medonline) var medonline = '```fix\r\n' + medonline +'```'
  else var medonline = '`Không Có MED Nào ONLINE`' 
 var embed = new Discord.MessageEmbed()
  .setTitle('Hang Đá RP')
  .setThumbnail(config.linkavt)
  .setColor('RANDOM')
  .addFields(
    { name: 'MED Online:'   , value: medonline, inline: false },
  )
  .setTimestamp();
  message.reply(embed);

}
    
    