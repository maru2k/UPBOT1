module.exports = {
    info,error,warn,log
}

let logData = {
    reset :"\x1b[0m",
    textColor: {
        black : "\x1b[30m",
        red : "\x1b[31m",
        green : "\x1b[32m",
        yellow : "\x1b[33m",
        blue : "\x1b[34m",
        magenta : "\x1b[35m",
        cyan : "\x1b[36m",
        white : "\x1b[37m",
    },
    bgColor: {
        black : "\x1b[40m",
        red : "\x1b[41m",
        green : "\x1b[42m",
        yellow : "\x1b[43m",
        blue : "\x1b[44m",
        magenta : "\x1b[45m",
        cyan : "\x1b[46m",
        white : "\x1b[47m",
    }
}

function info(_prefixLog, _messageLog) 
{
    log([
        {
            bgColor : "white",
            textColor: "blue",
            message : `[${_prefixLog}]:`
        },
        {
            textColor: "green",
            message :` ${_messageLog}`
        }
    ])
}

function error(_prefixLog, _messageLog) 
{
    log([
        {
            bgColor : "white",
            textColor: "blue",
            message :`[${_prefixLog}]:`
        },
        {
            textColor: "red",
            message :` ${_messageLog}`
        }
    ])
}

function warn(_prefixLog, _messageLog) 
{
    log([
        {
            bgColor : "white",
            textColor: "blue",
            message : `[${_prefixLog}]:`
        },
        {
            textColor: "yellow",
            message :` ${_messageLog}`
        }
    ])
}

function log(_dataLog)
{
    let message = ''
    for (let i = 0; i < _dataLog.length; i++)
    {
        let textColor = _dataLog[i].textColor || ''
        let bgColor = _dataLog[i].bgColor || ''

        message += `${logData.textColor[textColor.toLowerCase().trim()] || ''}${logData.bgColor[bgColor.toLowerCase().trim()] || ''}${_dataLog[i].message || ''}${logData.reset}`
    }
    console.log(message)
}
