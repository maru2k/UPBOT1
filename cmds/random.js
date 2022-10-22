exports.run = async (message, args)=> {
    if (args[1])
    {
      if (args[2])
         { 
           var a=Number(args[1]);
           var b=Number(args[2]);
           if ((a === 'NaN')  || (a%1 !== 0 ))    message.channel.send(":x::x::x: **SỐ ĐẦU KHÔNG HỢP LỆ**:x::x::x:")
           else if ((b === 'NaN') || (b%1 !== 0 ))     message.channel.send(":x::x::x: **SỐ ĐUÔI KHÔNG HỢP LỆ**:x::x::x:")
           else if (a>b)              message.channel.send(":x::x::x: **SỐ ĐẦU KHÔNG ĐƯỢC PHÉP LỚN HƠN SỐ ĐUÔI**:x::x::x:")
           else
           {
            randomnumber = Math.floor(Math.random() * (b - a + 1)) + a;
            message.reply("Number: "+randomnumber);
           }
           
         }
      else 
         {
           message.reply(":warning: :warning: **SAI CÚ PHÁP**:warning: :warning:");
           message.channel.send(" *Số Ngẫu nhiên*:     `!RANDOM [Số Đầu] [Số Đuôi]` ");
         }
    }
  else 
    {
      message.reply(":warning: :warning: **SAI CÚ PHÁP**:warning: :warning:");
      message.channel.send(" *Số Ngẫu nhiên*:     `!RANDOM [Số Đầu] [Số Đuôi]` ");
    }  
     }
    
    