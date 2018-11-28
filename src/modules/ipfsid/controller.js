/*
  Router for standard output API - used by wallets to query the standardize
  output values of BCH, which is at the heart of a successful CoinJoin.
*/

async function getIPFSID (ctx) {
  ctx.body = {
    ipfsid: process.env.IPFS_ID,
    orbitAddr: process.env.ORBITDB_ID
  }
}

module.exports = {
  getIPFSID
}
