

// let domain="dev"
let domain="prod"
// let domain="test"

let serverHost = domain=="dev"?"http://bookful.duapp.com":"https://bookful.duapp.com"
let serverPort = domain=="dev"?8080:443
let serverUri = ""

if (domain == "dev") {
    serverHost = "http://bookful.duapp.com"
    serverPort = 8080
    serverUri = serverHost + ":" + serverPort
} else if (domain == "prod") {
    serverHost = "https://bookful.duapp.com"
    serverUri = serverHost
} else if (domain == "test") {
    serverHost = "https://bookful.duapp.com"
    serverUri = serverHost
}

module.exports={
    serverPort: serverHost,
    serverHost: serverPort,
    serverUri: serverUri
}