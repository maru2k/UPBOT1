exports.run = async (message, args)=> {

  let roomCommand = config.blacklistnganhdata["ch"].commandroomid

  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )

  if ((!args[1]) || (!args[2]) || (!args[3]) ) 
    return  message.reply(":warning: :warning: **SAI CÚ PHÁP**:warning: :warning: \n *Tạo BlackList*:     `!CHBAN [Link steam] [Số ngày blacklist (không quá 30 ngày)] [Lý Do]`");
 
  if ((args[1].indexOf('https://steamcommunity.com/profiles/') != 0) || (args[1].length <= 36) ) 
    if (args[1].indexOf('steamcommunity.com') == -1 ) return message.reply('`Link Steam Không Hợp Lệ`')
  else 
    return message.reply('`Link Steam Sai Định Dạng ` (<https://steamcommunity.com/profiles/xxxxxxxxxxxxxx>)')

  if  ( (args[2]%1 != 0) || (args[2] < 0) || (args[2]>30) ) return message.reply('`Thời Gian Không Hợp Lệ`');

  let steamid = args[1].replace('https://steamcommunity.com/profiles/', '').replace('/','').trim()
  if (steamid%1 != 0) return message.reply('`Link Steam Không Hợp Lệ`')

  let linksteam =  'https://steamcommunity.com/profiles/' +steamid 
  let thoigian = args[2]
  let lydo = message.content.replace(config.prefix , '').replace(args[0] , '').replace(args[1], '').replace(args[2], '').trim();
 
 
  let chbanroomid =config.blacklistnganhdata["ch"].banroomid
  let chbanchannel = client.channels.cache.get(chbanroomid);

  let chbanlogid = config.blacklistnganhdata["ch"].banlogid
  let chbanlogchannel = client.channels.cache.get(chbanlogid);

  let resuft = message.guild.members.cache.find( f => f.user.id === message.author.id)
  let name = resuft.nickname || message.author.username
  
  let data = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=F14BC8A2DD09043535A5F7A59745BFA1&format=json&steamids=' + steamid)
  .then((response) => {return (response.json())})

  username  = data.response.players.find(ff => ff).personaname
  if ((data === null) || (data === []) || (!username)) return message.reply('`Link Stream Không Đúng`')
 

  let check = await MongoClient.db("bannganh").collection("chban").find({"steamid" : `${steamid}`}).toArray()
  if ( check.length != 0 ) return message.reply('`Người này đang bị blacklist`')
 
  let d = new Date();
  let datestart = d.getDate();
  let monthstart = d.getMonth() + 1 ;
  let yearstart = d.getFullYear()
  let timestart = (datestart + "/" + monthstart); 
  m= datestart + parseInt(thoigian);
  d.setDate(m);
  let dateend = d.getDate();
  let monthend = d.getMonth() + 1 ;
  let yearend = d.getFullYear()
  let timeend = (dateend + "/" + monthend);

  let embed = new Discord.MessageEmbed()
  .setColor([255, 0, 0])
  .addFields(
    {  name: 'Ghi Nhận Blacklist Bác Sĩ: ', value: 'Người Blacklist: '+ name + '\r\nNgười Bị Blacklist: **' + username+ "**\r\nThời Gian: `" + timestart +" - "+ timeend + "` (" + thoigian + " ngày)\r\nLý Do: *" + lydo + '*\r\n' + "Link Steam: " + linksteam   , inline:  true }
  )
  
  await chbanchannel.send(embed);

  timestart = yearstart + '-' + monthstart + '-' + datestart
  timeend = yearend + '-' + monthend + '-' + dateend
  await MongoClient.db("bannganh").collection("chban").insertOne({"steamid" : `${steamid}` , "name" : `${name}`, "username" : `${username}` ,  "reason" : `${lydo}` , "timestart" : new Date(timestart)  , "timeend" :  new Date(timeend) })
   
  let minutenow= d.getMinutes();
  let hournow = d.getHours();
  let datenow = d.getDate();
  let monthnow = d.getMonth()+1;
  let yearnow = d.getFullYear();
  let timenow =(hournow + ':' + minutenow + ' Ngày ' + datenow + '/' + monthnow + '/' + yearnow);
  
  chbanlogchannel.send("**" + name + "** đã Ban **" + username + "** `(ID steam: "+ steamid + ")` thời gian: `" + timestart +" - "+ timeend + "` ( Lý Do: *" + lydo + "*). - `" + timenow + '` ');
  message.reply(":white_check_mark: **LƯU THÀNH CÔNG**:white_check_mark: ");
}

