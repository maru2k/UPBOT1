
exports.timeInterval = 60*1000
exports.main = async function () { 

  d        = new Date();
  datenow  = d.getDate()
  monthnow = d.getMonth() + 1
  yearnow  = d.getFullYear()
  daynow   = (yearnow + ', ' + monthnow + ', ' +datenow )
  now      = new Date(daynow)  
  time     = datenow + '/' +monthnow 

  await Runner.UpdateBlacklistNganh('ca')
  await Runner.UpdateBlacklistNganh('med')
  await Runner.UpdateBlacklistNganh('ch') 

  await Runner.UpdateDoiTen('ca')
  await Runner.UpdateDoiTen('med')
  await Runner.UpdateDoiTen('ch') 
}


