/*
  Router for retrieving information about the p2p database and IPFS peer information
  for this node.
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
