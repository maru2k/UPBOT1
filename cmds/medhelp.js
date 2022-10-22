exports.run = async (message, args)=> {
    
    let roomCommand = config.blacklistnganhdata["med"].commandroomid
    if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
   
    let help = `
    ---------------------Lệnh Bác Sĩ--------------------------------------- 
    ${config.prefix}MEDBAN [Linksteam] [Số ngày] [Lý Do] : Tạo Blacklist
    ${config.prefix}MEDUNBAN [Linksteam] [Lý Do] : Gỡ Blacklist
    ${config.prefix}MEDBLACKLIST : Xuất Danh Sách Blacklist
    ${config.prefix}TKONLINE [Số tuần trước] : Thống kê thời gian online của các nhân viên (Số tuần trước bỏ trống sẽ mặc định này tuần này)
    ------------------------------------------------------------------`
    
    message.reply('```yaml\n' + help +  '```')
   
}
    
    