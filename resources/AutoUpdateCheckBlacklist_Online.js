exports.timeInterval = 5*60*1000

cachecheckingban = true

exports.main = async function() { 

  data = await fetch(`http://${config.ip}/players.json`).then(dfetch => {return dfetch.json()})
  liststeamid = {}
  data.forEach((sd) => {
    steamidhex = sd.identifiers.find(fd => (fd.indexOf('steam') === 0))
    steamid    = converter.hexToDec(steamidhex.slice(6, steamidhex.length))
    liststeamid[steamid] = {"id" : sd.id , "name" : sd.name}
  })
  if (cachecheckingban) {
    await Runner.CheckBlacklistNganh("ca")
    await Runner.CheckBlacklistNganh("med")
    await Runner.CheckBlacklistNganh("ch") 
  }
  await Runner.CheckOnlineNganh()
  cachecheckingban = !cachecheckingban

}