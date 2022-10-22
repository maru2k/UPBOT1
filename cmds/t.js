exports.run = async (message, args)=> {
  const voiceChannel = message.member.voice.channel;   
  if (!voiceChannel) return message.reply("`Bạn cần vào phòng mic trước khi sử dụng lệnh này!`");
  if (!voiceChannel.speakable) return message.reply( "`Tôi không có quyền NÓI trong Room Mic này`"  );
  if (client.voice.connections.get(message.guild.id) && client.voice.connections.get(message.guild.id).channel.id == voiceChannel.id ) var connection = client.voice.connections.get(message.guild.id)
  else
  {
    if (!voiceChannel.joinable) return message.reply( "`Tôi không có quyền KẾT NỐI Room Mic này`" );
    var connection = await voiceChannel.join()
  }
  content = args.filter((a,i) => i > 0).join(" ").trim()
  if (!content) return message.reply('**SAI CÚ PHÁP** : `!T [Nội Dung]`')
  if (content.length >= 200) return message.reply('`Nội Dung quá dài tôi không thể đọc được`')
  var d = new Date();
  cachevoiceguild = cachevoice.find(f => f.guildid = message.guild.id)
  if (!cachevoiceguild) cachevoice.push( {'guildid' : message.guild.id , 'time' : d.getTime().toString()})
  else cachevoiceguild.time = d.getTime().toString()
  connection.play(`https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${content}`, { volume: 1.55 });
}
    
    
  