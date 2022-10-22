exports.run = async (message, args)=> {
 
var moment = require('moment-timezone');

fetch('https://corona.lmao.ninja/v2/countries/vn')
.then((response) => {
return (response.json());
})
.then((data) => {
  var updateddate = moment(data.updated).locale('vi').tz('Asia/Saigon').format("dddd,Do MMMM YYYY, HH:mm:ss");

   var tuvong =Math.round (data.deaths/data.cases*100*1000)/1000;
  var embed = new Discord.MessageEmbed().setTitle('Thông Tin Covid-19 Tại Việt Nam')
  .setThumbnail("https://disease.sh/assets/img/flags/vn.png")
  .setColor('RANDOM')
  .addFields(
    { name: 'Số Ca Nhiễm: ' + data.cases +' ( Tăng ' + data.todayCases + ' ca )' + '   Đang Điều Trị: ' + data.active   , value:  'Tỷ lệ bị nhiễm: ' + data.casesPerOneMillion/1000 + '%        ', inline: true },
   { name: 'Tử Vong: ' + data.deaths + " ( Tăng " + data.todayDeaths + ' ca )' + '                 Hồi Phục: ' + data.recovered  , value: 'Tỷ lệ tử vong: ' + tuvong + '%        ' , inline: false },

  )
  .setFooter('Cập Nhật Vào: ' + updateddate);
  message.channel.send(embed);
})

     }
    
    