exports.run = async (message, args)=> {
  let userdata = config.adminid.find(d => d == message.author.id)
  if( (!message.member.hasPermission("ADMINISTRATOR"))  && !userdata ) return message.reply('`Bạn Không Có Quyền Sử Dụng Lệnh Này`');

  let xosodata =  await  MongoClient.db("xoso").collection(`${message.guild.id}`).find({}).toArray()

  if (xosodata.length == 0) return message.reply('`Chưa Có Ai Tham Gia`')

  lucky = Math.floor(Math.random()*xosodata.length);
  userid = xosodata[lucky].userid;
  number = xosodata[lucky].number;
  randomsolan = Math.floor(Math.random()*8)+11
  
  message.channel.send(Math.floor(Math.random()*100)).then(async (msg) => {
  
    
  
    async function randommess(n)
    {
      if (n == randomsolan)
      {
        await msg.edit(number)
        await Runner.delay(1000)
        await  msg.edit('Con Số May mắn là `' + number + '`\r\nChúc Mừng <@' + userid + '>')
        await MongoClient.db("xoso").collection(`${message.guild.id}`).deleteMany({"userid" : `${userid}`})
      }
      else
      {
        await msg.edit(Math.floor(Math.random()*100))
        await Runner.delay(800)
        await randommess(n+1)
      } 
    }
  
    await randommess(1)
    
  })
  

}

