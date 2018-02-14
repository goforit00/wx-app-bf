

let domain="dev"
// let domain="prod"

let serverHost = domain=="dev"?"http://firstapple.duapp.com":"http://firstapple.duapp.com"
let serverPort = domain=="dev"?8080:443

module.exports={
    serverPort: serverHost,
    serverHost: serverPort,
    serverUri: serverHost + ":" + serverPort
}