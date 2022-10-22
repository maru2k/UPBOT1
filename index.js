Discord = require("discord.js");
fs = require('fs');
fetch = require("node-fetch");
converter = require('hex2dec');
clearRequire = require('clear-require');
const { createCanvas, loadImage } = require('canvas');
const Parser  =  require('rss-parser');
const MongoDB =  require('mongodb');

Logger  = require("./log.js");
Runner  = require('./function.js');
config  = require("./config.json");
WebApp  = require("./webapp.js");


parser = new Parser();
client = new Discord.Client();
ObjectId =  MongoDB.ObjectID;
MongoClient = new MongoDB.MongoClient(encodeURI(config.mongodb) , { useUnifiedTopology: true } );



//////////////CACHE BOT////////////	
cachevoice = []	
covidcache = {"newsid" :[] , "cache" : {} , 'title' : {}}	
resourcesMoudles = { } 
///////////////////////////////////
  

async function main()
{
  try {

    await MongoClient.connect();
    Logger.info("Database" , "connected!")
    WebApp.main()
    Logger.info("WebApp" , "Started!")

  }
  catch (err) {
    return Logger.error("System Loading", err)
  }

  client.on("ready", async () => 
  {
    try {
      Logger.log([
        {
          textColor : "black",
          bgColor : "cyan",
          message: client.user.tag,
        },
        {
          textColor : 'green',
          message: ` ONLINE!`
        }
      ]);  

 
      var d         = new Date();
      var minutenow = d.getMinutes();
      var hournow   = d.getHours();
      var datenow   = d.getDate();
      var monthnow  = d.getMonth()+1;
      var yearnow   = d.getFullYear(); 
      var timenow   =(hournow + ':' + minutenow + ' - ' + datenow + '/' + monthnow + '/' + yearnow);
      data = await  fetch('https://httpbin.org/ip').then(dfetch => {return dfetch.json()})
      await client.channels.cache.get(config.systemlogid).send('`BOT Online` (IP: `' +data.origin + '` )|| `' + timenow + '`');
    }
    catch (err) {
      Runner.SendErrorLog( "Send Confirm Message Started" , err)
    }

    await Runner.LoadResources()
  
 
  })





  client.on("message", async (message) => {
    try
    {
      ////////Hàm reaction + gửi chat log /////////////////
      async function seen()
      {
        try {

            let d         = new Date();
            let minutenow = d.getMinutes();
            let hournow   = d.getHours();
            let datenow   = d.getDate();
            let monthnow  = d.getMonth()+1;
            let yearnow   = d.getFullYear();
            let timenow   = (hournow + ':' + minutenow + ' Ngày ' + datenow + '/' + monthnow + '/' + yearnow);
            let chatlog   = ( '**' + message.author.username + "** *đã gửi lệnh* : `" + message.content + '` | tới <#' + message.channel.id +  '>' + '|| `' + timenow + '`' ) ;
            client.channels.cache.get(config.chatlogid).send(chatlog);
            react();
        }
        catch (err) {
          Logger.error("Seen Message", err)
        }

      }

      async function react() {
        reactarr = Array.from(client.emojis.cache.keys())
        reacterr = false;

        do {
          try {
            message.react(reactarr[Math.floor(Math.random() * reactarr.length)])
          }
          catch (err) {
            reacterr = true
          }
        }
        while (reacterr);

      }
      //////////////////////////////////////////////////////////////////////    


      ////////////////CHECK --- 1 ///////////////////
      if (message.author.bot) return;  ///BOT RETURN
      if (message.channel.type == 'dm') return ;  ////INBOX RETURN
      ///////////////////////////////////////////////


      /////////////////////////CHAT SIMSIMI  ////////////////////////////////
      if ((config.simsimroomid == message.channel.id) && (message.content.indexOf(config.prefix) !== 0) || message.content.trim().toLowerCase().indexOf(`${config.prefix}s `) == 0 )
      { 
        react()
        if (message.content.trim().toLowerCase().indexOf(`${config.prefix}s `) == 0) seen()
        content = message.content.trim().toLowerCase()
        messagesend = (content.indexOf(`${config.prefix}s`) == 0)? content.replace(`${config.prefix}s` , '').trim() :content
        reply  = await Runner.GetSimsimiReply(messagesend)
        return message.reply(reply)
      }
      //////////////////////////////////////////////////////////////////////  
      
      ////////////////CHECK --- 2 ///////////////////
      if (message.content.indexOf(config.prefix) !== 0) return; ///NON-PREFIX RETURN
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g); /// TO ARGS
      const command = args[0].toLowerCase();  //// GET COMMAND
      ///////////////////////////////////////////////


     
      ///////////////////////CMDS////////////////////////////////
      if (!config.allowall && !config.allowchannelid.includes(message.channel.id)) return; // Không có trong channel cho phép


      if (fs.existsSync(`./cmds/${command}.js`))  {
        try {
          let commandFile = new require(`./cmds/${command}.js`);
          seen()
          commandFile.run(message, args);
          clearRequire(`./cmds/${command}.js`)
        }
         catch (err) {
          Runner.SendErrorLog( "CMDS RUN: " + command , err)
        }
        return;
      }
      ///////////////////////////////////////////////////////////
    }
    catch (err)
    {
      Runner.SendErrorLog( "BODY MAIN"  , err)
    }
  });

  client.login(config.token);
}

main();
