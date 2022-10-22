exports.run = async (message, args)=> {

  let userdata = config.adminid.find(d => d == message.author.id)
  if( (!message.member.hasPermission("ADMINISTRATOR"))  && !userdata ) return message.reply('`Bạn Không Có Quyền Sử Dụng Lệnh Này`');
  await MongoClient.db("xoso").collection(`${message.guild.id}`).deleteMany({})
 message.channel.send('`Đã RESET Xổ Sô Thành Công`');

}