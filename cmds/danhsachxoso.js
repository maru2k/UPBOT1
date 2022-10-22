exports.run = async (message, args)=> {

  let userdata = config.adminid.find(d => d == message.author.id)
  if( (!message.member.hasPermission("ADMINISTRATOR"))  && !userdata ) return message.reply('`Bạn Không Có Quyền Sử Dụng Lệnh Này`');
  
  let xosodata = await  MongoClient.db("xoso").collection(`${message.guild.id}`).find({}).toArray()
  let danhsach = ``
  if (xosodata.length == 0) return message.reply('`Chưa Có Ai Tham Gia`')
  else xosodata.forEach(data => danhsach += ' - <@' +data.userid + '> : `' +data.number + '`')

  message.channel.send('**Danh Sách Xổ Số**: ' + danhsach)  

}

