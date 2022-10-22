exports.run = async (message, args)=> {
  let roomCommand = config.blacklistnganhdata["ca"].commandroomid
  let roomBan     = config.blacklistnganhdata["ca"].banroomid
  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand+ '>' )
  
  let bandata  =  await MongoClient.db("bannganh").collection("caban").find({}).toArray()
  let banchannel = client.channels.cache.get(roomBan);  

  d = new Date()
  datenow = d.getDate()
  monthnow = d.getMonth() + 1
  yearnow = d.getFullYear()
  daynow =(yearnow + ', ' + monthnow + ', ' +datenow )
  now = new Date(daynow)
  time = datenow + '/' +monthnow 

  if (bandata.length == 0) return banchannel.send(" `Hôm Nay Không Có Truy Nã`" );

  banchannel.send("<@" + message.author.id +  ">" );
  banchannel.send("**DANH SÁCH TRUY NÃ NGÀY " + time + "**" );
  await Runner.LoadBlacklist("ca" , banchannel , bandata)
}

