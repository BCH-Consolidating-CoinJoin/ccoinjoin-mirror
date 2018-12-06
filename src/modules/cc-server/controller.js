/*
  This is an API handler for Consolidating CoinJoin servers to register
  themselves with the Mirror.
*/

const rp = require('request-promise')

async function addServer (ctx) {
  try {
    const serverData = ctx.request.body.serverData
    console.log(`serverData: ${JSON.stringify(serverData, null, 2)}`)

    // Validation checks.
    if (!serverData) ctx.throw(400, `serverData object expected`)

    if (!serverData.serverType || serverData.serverType === '') {
      ctx.throw(400, 'serverType can not be empty.')
    }

    if (!serverData.fee || serverData.fee === '') {
      ctx.throw(400, 'fee can not be empty')
    }

    if (!serverData.url || serverData.url === '') {
      ctx.throw(400, 'url can not be empty')
    }

    // Make an API call to ensure the server really exists.
    const options = {
      method: 'GET',
      uri: `${serverData.url}/coinjoinout`,
      // resolveWithFullResponse: true,
      json: true
    }

    let result = await rp(options)
    console.log(`result: ${JSON.stringify(result, null, 2)}`)

    // Add the server to the known-peers information.

    /*
  ctx.body = {
    ipfsid: process.env.IPFS_ID,
    orbitAddr: process.env.ORBITDB_ID
  }
  */

    ctx.body = true
  } catch (err) {
    console.log(`Error /ccservers: `, err)
    ctx.throw(400, err)
  }
}

module.exports = {
  addServer
}
