exports.run = async (message, args)=> {
    
let help = `
${config.prefix}IP 
${config.prefix}UPTIME
${config.prefix}T [Nội Dung]: Talk Nội Dung 
${config.prefix}AVATAR @[TAGNAME] : check avatar người dùng
${config.prefix}INFO @[TAGNAME] : check info người dùng
${config.prefix}CLEAR [Số Lượng Tin Nhắn] : Xóa Tin Nhắn
${config.prefix}COVID : Cập nhật tình hình Covid-19 ở nước ta
${config.prefix}CHECK [Tên IG] (hoặc bỏ trống) : Check danh sách người chơi online có tên
${config.prefix}CHECKID [ID] : Check Thông Tin Theo ID 
${config.prefix}CHECKSTEAM [STEAM ID] : Check Thông Tin Theo Steam ID 
${config.prefix}CHECKDISCORD [DISCORD ID] : Check Thông Tin Theo Discord ID
${config.prefix}S [tin nhắn] : Nhắn tin với Simsimi
${config.prefix}DAYSIM : Dạy Simsimi nói chuyện
${config.prefix}RANDOM [Số A] [Sô B] : Random từ số a đến số b
${config.prefix}CAONLINE : Xem danh sách CA Online
${config.prefix}CHONLINE : Xem danh sách CH Online
${config.prefix}MEDONLINE : Xem danh sách MED Online
${config.prefix}GANGONLINE : Xem danh sách Gangters Online
--------------------Danh Sách Lệnh Ngành-----------------------
${config.prefix}CAHELP: Xem danh sách lệnh ngành CA
${config.prefix}MEDHELP: Xem danh sách lệnh ngành MED
${config.prefix}CHHELP: Xem danh sách lệnh ngành CH
${config.prefix}CHECKHELP: Xem danh sách lệnh CHECK
---------------------Lệnh Event Quay Số------------------------
${config.prefix}RESETXOSO : reset lại dữ liệu
${config.prefix}LAYSO : Tham gia event quay số
${config.prefix}DANHSACHXOSO : Show Danh Sách người chơi EVENT
${config.prefix}QUAYSO : Quay số chọn ra người may mắn ( tự động xóa tên trong danh sách quay)
---------------------------------------------------------------`

message.reply('```yaml\n' + help +  '```')
   
}
    
    