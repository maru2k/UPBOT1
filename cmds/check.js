exports.run = async (message, args)=> {  

  function cach(maxcach , length)
  {
    khoangcach = "                                                                                                                                                                                    "
    return khoangcach.substring(0, maxcach - length)
  }


  let roomCommand = config.checkroomid
  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
 
  namefind = args.filter((a,i) => i > 0).join(' ').toLowerCase().trim().toLowerCase();
  
  let data
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
  var listname = [];
  var page = 1;
  var stt = 1;
  var list = '';
  for (i=0; i < online ; i ++ )
  { 
   
    if(data[i].name.trim().toLowerCase().indexOf(namefind) !== -1)  
    {
      thutu = stt + cach(5 , stt.toString().length)
      ID = '[ID:' + data[i].id + ']' + cach(7 , data[i].id.toString().length)
      var list = list +  '\r\n' + '#' + thutu + ID + ': ' + data[i].name ;
      if (list.length > 900) {
        listname[page++] = list;
        var list = '';
      };  
      if (stt == 1 ) cacheonly = {"status": 1  ,  "data" : {"name" : data[i].name , "id" : data[i].id , "ping" : data[i].ping , "identifiers" : data[i].identifiers} }
      else if (stt == 2) cacheonly.status = 0
      stt++;
    }
    if (i == online - 1)
    { 
      if (list) listname[page] = list;
      if (!listname[page])  page--;
    }
  
  }  

  if (!listname[1] ) return message.reply('`ERROR: Không Tìm Thấy`') ;

  if  (cacheonly.status == 1)
  { 
   input = cacheonly.data.identifiers
   var linksteam = 'N/A'
   var DiscordID = 'N/A'
   for (a = 0 ; a  < input.length ; a++) if (input[a].indexOf('steam') === 0) linksteam = 'https://steamcommunity.com/profiles/' + converter.hexToDec(input[a].slice(6, input[a].length))
   else if (input[a].indexOf('discord') === 0) DiscordID = '<@' + input[a].slice(8, input[a].length) + '>'

    var embed = new Discord.MessageEmbed()
    .setTitle('Thông Tin Người Dùng:')
    .setThumbnail(config.linkavt)
    .setColor('RANDOM')
    .addFields(
     {  name: 'Tên Ingame: ', value:  cacheonly.data.name , inline:  true },
     {  name: 'Server ID: ', value: cacheonly.data.id , inline:  true },
     {  name: 'Ping: ', value: cacheonly.data.ping   , inline:  true },
     {  name: 'Danh Tính: ', value: 'Link Steam: ' + linksteam + '\r\nDiscord: '  + DiscordID   , inline:  true },
     )
    .setTimestamp();
    return message.reply(embed);
  }    

  for (j=1 ; j<= page ; j++)
  {
   var embed = new Discord.MessageEmbed()
   .setTitle('Hang Đá RP')
   .setThumbnail(config.linkavt)
   .setColor('RANDOM')
   .addFields(
     { name: 'List Tìm Kiếm | Trang ' + j + '/' +page   , value: '```fix\r\n' + listname[j] +'```'  , inline: false },
   )
   .setTimestamp();
   message.channel.send(embed);
  }     
  
  message.reply('`Vui lòng nhập ID của người cần check thông tin, thời gian phản hồi trong 30s`')

  var collector = new Discord.MessageCollector(message.channel, m => (m.author.id === message.author.id) , { time: 30000});
  
  collector.on('collect', message => {
    if (message.content.trim().startsWith(config.prefix)) return collector.stop();
    if (message.content%1 === 0 )
   { 
    result = data.find( found  => found.id == message.content);
    if (!result) return message.reply('`ID không tồn tại hoặc người chơi không online`')
    var input = result.identifiers
    var linksteam = 'N/A'
    var DiscordID = 'N/A'
    for (a = 0 ; a < input.length ; a++)  if (input[a].indexOf('steam') === 0)  linksteam = 'https://steamcommunity.com/profiles/' + converter.hexToDec(input[a].slice(6, input[a].length))
    else if (input[a].indexOf('discord') === 0) DiscordID = '<@' + input[a].slice(8, input[a].length) + '>'
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
    collector.stop();
   }
   else message.channel.send('`ID Không Hợp Lệ`')
  })
             
}
    
    