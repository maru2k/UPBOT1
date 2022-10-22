exports.timeInterval = 15*1000
exports.main = async function () {
  try {
    data = await fetch(`http://${config.ip}/players.json`).then(dfetch => {return dfetch.json()})
    if (data === null || data === []) var online = 0
    else var online = data.length;
    data = await fetch(`http://${config.ip}/info.json`).then(dfetch => {return dfetch.json()})

    client.user.setActivity(online + '/' + data.vars.sv_maxClients + ' | ' + data.vars["Công Việc"] +' | Uptime: ' + data.vars.Uptime );
  }
  catch  (err) {
        Logger.warn("AUTO UPDATE UPTIME", err)
        client.user.setActivity('Server Offline')
  }   

  
  if (cachevoice.length !=0) { 
    cachevoice.forEach( cache => {
      var d = new Date();
      timeoutvoice = Math.round((d.getTime().toString() - cache.time) / 1000 / 60);
  
      if (timeoutvoice >=5) { 
        let voicechannel_bot_connect = client.guilds.cache.get(cache.guildid).voice.channel
        if (voicechannel_bot_connect)  voicechannel_bot_connect.leave();
        cachevoice.splice(cachevoice.indexOf(cache) , 1)
      }
    })
  }

}