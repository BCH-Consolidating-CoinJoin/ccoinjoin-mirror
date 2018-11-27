/*
  Router for standard output API - used by wallets to query the standardize
  output values of BCH, which is at the heart of a successful CoinJoin.
*/

const ipfsid = require('./controller')

// export const baseUrl = '/users'
module.exports.baseUrl = '/ipfsid'

module.exports.routes = [
  {
    method: 'GET',
    route: '/',
    handlers: [
      ipfsid.getIPFSID
    ]
  }
]
