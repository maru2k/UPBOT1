exports.run = async (message, args)=> {
  let roomCommand = config.blacklistnganhdata["ca"].commandroomid

  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
 
  if ((!args[1]) || (!args[2])) 
    return message.reply(":warning: :warning: **SAI CÚ PHÁP**:warning: :warning: \n *Gỡ Truy Nã*:     `!GOTRUYNA [Link steam] [Lý Do]`");
  
  if ((args[1].indexOf('https://steamcommunity.com/profiles/') != 0) || (args[1].length <= 36) )  
    if (args[1].indexOf('steamcommunity.com') == -1 ) return message.reply('`Link Steam Không Hợp Lệ`')
  else 
    return message.reply('`Link Steam Sai Định Dạng ` (<https://steamcommunity.com/profiles/xxxxxxxxxxxxxx>)')

  let steamid = args[1].replace('https://steamcommunity.com/profiles/', '').replace('/','').trim()
  let linksteam =  'https://steamcommunity.com/profiles/' +steamid 

  let lydo = message.content.replace(config.prefix , '').replace(args[0] , '').replace(args[1], '').trim()

  let banroomid = config.blacklistnganhdata["ca"].banroomid
  let banchannel = client.channels.cache.get(banroomid);

  let banlogid = config.blacklistnganhdata["ca"].banlogid
  let banlogchannel = client.channels.cache.get(banlogid);

  let resuft = message.guild.members.cache.find( f => f.user.id === message.author.id)
  let name = resuft.nickname || message.author.username

  let check  =  await MongoClient.db("bannganh").collection("caban").find({"steamid" : `${steamid}`}).toArray()   
  if ( check.length == 0 ) return message.reply('`Người này chưa bị truy nã`')


  let embed = new Discord.MessageEmbed()
  .setColor([0, 0, 255])
  .addFields(
    {  name: 'Gỡ Truy Nã Công An: ', value: 'Người Gỡ Truy Nã: '+ name + '\r\nNgười Được Gỡ Truy Nã: **' + check[0].username + "** \r\nLý Do: *" + lydo + "*\r\nLink Steam: " + linksteam   }
  )
 
  banchannel.send(embed);
 
  await MongoClient.db("bannganh").collection("caban").deleteMany({"steamid" : `${steamid}`})

  let d = new Date();
  let minutenow= d.getMinutes();
  let hournow = d.getHours();
  let datenow = d.getDate();
  let monthnow = d.getMonth()+1;
  let yearnow = d.getFullYear();
  let timenow =(hournow + ':' + minutenow + ' Ngày ' + datenow + '/' + monthnow + '/' + yearnow);

  banlogchannel.send("**" + name + "** đã gỡ Truy Nã cho **" + check[0].username + "** (`ID steam: "+ check[0].steamid + "`- Lý Do: *" + lydo + "*. - `" + timenow + '` ');
  message.reply(":white_check_mark: **GỠ TRUY NÃ THÀNH CÔNG**:white_check_mark: ");
}

