exports.run = async (message, args)=> {

  var moment = require('moment-timezone');


  let embed = new Discord.MessageEmbed();
  let member = message.mentions.users.first() ||  message.author;
  let status = "Không rõ"
  if (member.presence.status === 'dnd') status = 'Vui Lòng Không Làm Phiền';
  else if (member.presence.status === 'online') status = 'Trực Tuyến';
  else if (member.presence.status === 'idle') status  = 'Chờ';
  else if (member.presence.status === 'offline') status = 'Ngoại Tuyến';

  let now = Date.now();
  let joindTime = now - message.guild.members.cache.get(member.id).joinedAt;
  let joined = Math.round(joindTime / 1000 / 60 / 60 / 24);
  moment.locale('vi');
  let joineddate = moment(message.guild.members.cache.get(member.id).joinedAt).tz('Asia/Saigon').format("dddd,Do MMMM YYYY, HH:mm:ss");
  let createddate = moment(member.createdAt).tz('Asia/Saigon').format("dddd,Do MMMM YYYY, HH:mm:ss");

  embed
  .setAuthor(member.username + '#' + member.discriminator, member.displayAvatarURL)
  .setColor("RANDOM")
  .setAuthor(member.tag, member.displayAvatarURL())
  .setTimestamp()
  .setColor("RANDOM")
  .setThumbnail(member.displayAvatarURL())
  .addFields(
    { name: 'ID Người Dùng:', value: member.id , inline: true },
    { name: 'Trạng Thái:', value: status , inline: true },
    { name: 'Tài Khoản Tạo Vào:', value: `${createddate}` ,  inline: false},
    { name: 'Tham Gia Máy Chủ Vào:', value: `${joineddate} ( `+ joined +  ` Ngày Trước)` , inline: false },
  )
  .addField('Roles:',  `<@&${message.guild.member(member)._roles.join('> <@&')}>`)

  message.reply(embed);
  
}
    
    