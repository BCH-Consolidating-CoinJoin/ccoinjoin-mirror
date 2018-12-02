/*
export default {
  session: 'secret-boilerplate-token',
  token: 'secret-jwt-token',
  database: 'mongodb://localhost:27017/p2pvps-server-dev'
}
*/

module.exports = {
  session: 'secret-boilerplate-token',
  token: 'secret-jwt-token',
  database: 'mongodb://localhost:27017/coinjoin-dev',
  port: 67890,
  ipfsData: {
    peerHash: '',
    multiaddr: '',
    behindFirewall: true
  },
  orbitDBAddr: '/orbitdb/QmSFYQzb4MtowNsZ6hYhBqvQAdPxLUFGj9RH5XY32TTFvU/ccoinjoin'
}
