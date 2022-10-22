exports.run = async (message, args)=> {
    
    let roomCommand = config.blacklistnganhdata["ca"].commandroomid
    if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )

    let help = `
    ---------------------Lệnh Công An--------------------------------------- 
    ${config.prefix}TRUYNA [Linksteam] [Số ngày] [Lý Do] : Tạo Truy Nã
    ${config.prefix}GOTRUYNA [Linksteam] [Lý Do] : Gỡ Truy Nã
    ${config.prefix}CATRUYNA : Xuất Danh Sách Truy Nã
    ${config.prefix}CHECKROLECA : Check ngưỡi ai chưa có role Ở Discord BTN
    ${config.prefix}TKONLINE [Số tuần trước] : Thống kê thời gian online của các nhân viên (Số tuần trước bỏ trống sẽ mặc định này tuần này)
    ------------------------------------------------------------------------`
    
    message.reply('```yaml\n' + help +  '```')
   
}
    
    