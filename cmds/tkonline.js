exports.run = async (message, args)=> {
    typecheck = ""
    for (let keytype in config.blacklistnganhdata) 
        if (config.blacklistnganhdata[keytype].tkroomid == message.channel.id ) {
            typecheck = keytype
            break
        }
    
    if (!typecheck || (typecheck != 'ca' &&typecheck != 'med' &&typecheck != 'ch') ) return message.reply('`Kênh này không hỗ trợ lệnh này`')

    let weekcountlast = args[1] || 0;
    if (weekcountlast > 4 ) return message.reply('`Dữ liệu chỉ lưu trong 4 tuần vui lòng thống kê từ 4 tuần đổ lại`')

    let d = new Date();
    let dayofweeknow = d.getDay() -1 
    if (dayofweeknow < 0 ) dayofweeknow = 6;
    d.setHours(24*(- dayofweeknow  - 7*weekcountlast )  ,0,0,0);
    let timerangestart = d.getTime()

    let tokenid = await Runner.GetRandomString(25)

    let checktokenid = await MongoClient.db("botdata").collection("tokenaccess").find({"tokenid" : tokenid}).toArray()

    while (checktokenid.length != 0)
    {
        tokenid = await Runner.GetRandomString(25)
        checktokenid = await MongoClient.db("botdata").collection("tokenaccess").find({"tokenid" : tokenid}).toArray()
    }

    await MongoClient.db("botdata").collection("tokenaccess").insertOne({ "tokenid" : tokenid , "type" : typecheck , "timerange" : timerangestart , "expire" : new Date().getTime() + 30*60*1000})
    

    let urlstring = `https://hangda.xyz/ tkonline?tokenaccess=${tokenid}`
    message.reply(`**Thống Kê Online Tuần ${new Date(timerangestart).getDate()}/${new Date(timerangestart).getMonth() +1} Ngành ${typecheck}**\nLink: ${urlstring} \n${'`'}Lưu Ý: LINK hết hạn sau 30p${'`'}`)
}
  
  
