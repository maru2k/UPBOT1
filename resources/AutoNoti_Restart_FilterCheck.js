
exports.timeInterval = 5*60*1000
exports.main = async function() { 

  let notimesscache = await MongoClient.db("botdata").collection("notimess").find({}).toArray()
  d = new Date();
  date   = d.getDate();
  day    = d.getDay();
  month  = d.getMonth() + 1;
  year   = d.getFullYear();
  minute = d.getMinutes();
  hour   = d.getHours();
  if ((hour == 5) && (minute >= 0) && (minute < 5)) {  //// Restart BOT 5h && FITLER CHECKING
    try {
      let dayofweeknow = (day == 0 )? 6 : day -1 ;
      d.setHours(24*(- dayofweeknow  - 7*3 )  ,0,0,0);
      let rangetime = d.getTime()
      
      let typearr_CHECKING = ['ca' , 'med' , 'qy' , 'ch']

      for (let i_checking_type ; i_checking_type < typearr_CHECKING.length; i_checking_type++) {
        let datachecking = await MongoClient.db("checkingonline").collection(typearr_CHECKING[i_checking_type]).find().toArray()
        for (let j_checking_index ; j_checking_index < datachecking.length ; i++) {
          let timelistfilter = datachecking[j_checking_index].timelist.filter(time => time >=rangetime )
          if (timelistfilter.length == 0) await MongoClient.db("checkingonline").collection(typearr_CHECKING[i_checking_type]).deleteMany( { "steamid": datachecking[j_checking_index].steamid })  
          else  await MongoClient.db("checkingonline").collection(typearr_CHECKING[i_checking_type]).updateMany( { "steamid": datachecking[j_checking_index].steamid }, {$set: { "timelist": timelistfilter }} ) 
        }
      }
    }
    catch (err) {
      Runner.SendErrorLog("Checking Online" , err)
    }

    await MongoClient.db("botdata").collection("settings").updateMany({"type" : "nhacnho" },{ $set : {"content" : true} })
    await client.channels.cache.get(config.systemlogid).send('`AUTO RESTART 5H...`');
    Runner.restart()
  }
 

}