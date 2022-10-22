exports.run = async (message, args)=> {
  let roomCommand = config.checkroomid
  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
 
  if (!args[1]) return message.reply('**Sai Cú Pháp** : `!CHECKDISCORD [DISCORD ID]`')
  discordid = args[1]   

  if ( (discordid < 0) || (discordid%1 != 0 ) ) return message.reply('`Discord ID Không Hợp Lệ`')
   
  fetch(`http://${config.ip}/players.json`)
  .then((response) => {
    return (response.json())
  })
  .then((data) => { 

   result = data.find( found  =>  (found.identifiers.find(fdata => fdata.indexOf('discord') === 0)) && found.identifiers.find(fdata => fdata.indexOf('discord') === 0).replace('discord:' , '') === discordid  );
    if (!result) return message.reply('`Discord ID không tồn tại hoặc người chơi không online`')
    var input = result.identifiers
  
     var stop = 1
     var linksteam = 'N/A'
     var DiscordID = 'N/A'
     for (a = 0 ; stop == 1 ; a++)
     {
       if(input[a])
       {
         if (input[a].indexOf('steam') === 0)
         {
           var linksteam = 'https://steamcommunity.com/profiles/' + converter.hexToDec(input[a].slice(6, input[a].length))
         }
         if (input[a].indexOf('discord') === 0)
         {
           var DiscordID = '<@' + input[a].slice(8, input[a].length) + '>'
         }
       }
       else var stop = 0;
     }
      
    var embed = new Discord.MessageEmbed()
    .setTitle('Thông Tin Người Dùng:')
    .setThumbnail(config.linkavt)
    .setColor('RANDOM')
    .addFields(
      {  name: 'Tên Ingame: ', value:  result.name , inline:  true },
      {  name: 'Server ID: ', value: result.id , inline:  true },
      {  name: 'Ping: ', value: result.ping   , inline:  true },
      {  name: 'Danh Tính: ', value: 'Link Steam: ' + linksteam + '\r\nDiscord: '  + DiscordID   , inline:  true },
    )
    .setTimestamp();
    message.reply(embed);


  
  })
  .catch(function(error)  {
    console.log(error)
    message.reply('`Server đang Offline`')
  });  
   
      
         
}
      
      