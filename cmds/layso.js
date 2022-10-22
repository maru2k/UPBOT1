exports.run = async (message, args)=> {
    

var checkuserxoso = await MongoClient.db("xoso").collection(`${message.guild.id}`).find({"userid" : `${message.author.id}`}).toArray()
if (checkuserxoso.length != 0) return message.reply('`Bạn Đã Lấy Số rồi`');

async function random()
{
  var randomnumber = Math.floor(Math.random() * 100);
  var checknumber = await MongoClient.db("xoso").collection(`${message.guild.id}`).find({"number" : `${randomnumber}`}).toArray()
  if (checknumber.length == 0) return randomnumber
  else return random()
}
number = await random()
await MongoClient.db("xoso").collection(`${message.guild.id}`).insertOne({"userid" : `${message.author.id}` , "number" : `${number}`})
message.reply('**Chúc Mừng Bạn Đã Lấy Cho Mình Một Con Số May Mắn: **`' + number+'`');

}