/*

*/

async function addServer (ctx) {
  const serverData = ctx.request.body.serverData
  console.log(`serverData: ${JSON.stringify(serverData, null, 2)}`)

  // Validation checks.

  // Make an API call to ensure the server really exists.

  // Add the server to the known-peers information.

  /*
  ctx.body = {
    ipfsid: process.env.IPFS_ID,
    orbitAddr: process.env.ORBITDB_ID
  }
  */

  ctx.body = true
}

module.exports = {
  addServer
}
