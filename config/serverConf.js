

// let domain="dev"
let domain="prod"

let serverHost = domain=="dev"?"https://bookful.duapp.com":"https://bookful.duapp.com"
let serverPort = domain=="dev"?8080:443

module.exports={
    serverPort: serverHost,
    serverHost: serverPort,
    serverUri: serverHost + ":" + serverPort
}