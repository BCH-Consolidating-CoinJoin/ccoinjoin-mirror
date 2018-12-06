/*
  Endpoint used by servers that want to add their connection information to the
  p2p database.
*/

const ccServers = require('./controller')

// export const baseUrl = '/users'
module.exports.baseUrl = '/ccservers'

// curl -X POST http://localhost:47890/ccservers -d '{"serverData": "test-data"}'
module.exports.routes = [
  {
    method: 'POST',
    route: '/',
    handlers: [
      ccServers.addServer
    ]
  }
]
