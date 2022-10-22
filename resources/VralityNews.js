

////////////////////Auto Vrality News////////////////////
/* 
0---------------------------README-----------------------------------
1- Lọc News theo Covid == FilterDataCovid(<NEWSDATA>)
2- Tạo Ảnh News == GetImageNews(<ẢNH CHÍNH> , <TIÊU ĐỀ> , <NỘI DUNG NGẮN>)
*/

exports.timeInterval = 15*60*1000
exports.main = async function () { 

  fetch("https://hangda.xyz")
  
  cachenews = await MongoClient.db("botdata").collection("newsdata").find({}).toArray()
  datanews  =  await parser.parseURL('https://tuoitre.vn/rss/tin-moi-nhat.rss');

  channellist = config.covidnewsid
  
  datacov = await Runner.FilterDataCovid(datanews)

  for (newsi = 0 ; newsi < datacov.length ; newsi++) {
    let buffer = await Runner.GetImageNews(datacov[newsi].photo , datacov[newsi].title , datacov[newsi].content)
    let attachment = new Discord.MessageAttachment(buffer , 'covid-vralitynews.png');
    sendcovnoti(attachment  , datacov[newsi])
    await MongoClient.db("botdata").collection("newsdata").insertOne({ "newsid": datacov[newsi].newsid ,"title" : datacov[newsi].title , "link" : datacov[newsi].link , "photo" : datacov[newsi].photo , "content" : datacov[newsi].content , "time" : datacov[newsi].time})
  }

  async function sendcovnoti(attachment , datacov) {
    client.channels.cache.get(config.systemlogid).send("**UPDATE COVID** : `Load Covid NewsID["  + datacov.newsid + "]`")
    covidcache.newsid.push(`${datacov.newsid}`)
    covidcache.cache[datacov.newsid] = []
    title = datacov.title.split(" ")
    title = title.filter((a,i) => (i <= 4))
    covidcache.title[datacov.newsid] = title.join(" ") + "..."
    for (i= 0 ; i < channellist.length ; i++)
    client.channels.cache.get(channellist[i]).send(`<${datacov.link}>` , attachment ).then((c_msg) => {covidcache.cache[datacov.newsid].push({"channelid" :c_msg.channel.id , "messageid" : c_msg.id })})  
  }
        

        
}

//////////////////////////////////////////////////////////////////////