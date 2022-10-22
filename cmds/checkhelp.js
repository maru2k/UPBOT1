exports.run = async (message, args)=> {
    
    let roomCommand = config.checkroomid
    if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
   
    let help = `
    ---------------------Lệnh Check--------------------------------------- 
    ${config.prefix}CHECK [Tên Ingame] : Check người chơi theo tên Ingame 
    ${config.prefix}CHECKID [Server ID] : Check người chơi theo Server ID
    ${config.prefix}CHECKDISCORD [Discord ID] : Check người chơi theo Discord ID
    ${config.prefix}CHECKSTEAM [Steam ID] : Check người chơi theo Steam ID
    ----------------------------------------------------------------`

    message.reply('```yaml\n' + help +  '```')
}
    
    