/*
  This server acts as an IPFS peer for connecting to the IPFS network and
  mirroring the Consolidating CoinJoin database of peers. The workflow is as
  follows:
  -Initialize IPFS
  -Connect to the boostrap IPFS nodes
  -Connect to any previously validated IPFS nodes.
  -Open the Consolidating CoinJoin database via OrbitDB
  -Add the connection information for this peer to the database.
  -Periodically review the database and validate peers listed in the DB. Validated
   peers are added to this nodes verifiedPeers list.
  -Periodically rebroadcast this peers connection information by adding a new
   entry to the database.
*/

'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const logger = require('koa-logger')
const mount = require('koa-mount')
const serve = require('koa-static')
const cors = require('kcors')

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

// P2P library used to connect to find and connect to other peers in the IPFS network.
const P2P = require('../src/utils/p2p')

// Load the ccoinjoin-network library.
// const Network = require('../../ccoinjoin-network')
const Network = require('ccoinjoin-network')
const network = new Network()
const UPDATE_PERIOD = 1000 * 60 // 1 minute

// Winston logger
const wlogger = require('../src/utils/logging')

const config = require('../config')
const errorMiddleware = require('../src/middleware')

async function startServer () {
  // Create a Koa instance.
  const app = new Koa()
  app.keys = [config.session]

  // MIDDLEWARE START

  app.use(convert(logger()))
  app.use(bodyParser())
  app.use(errorMiddleware())

  // Used to generate the docs.
  app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))))

  // Custom Middleware Modules
  const modules = require('../src/modules')
  modules(app)

  // Enable CORS for testing
  app.use(cors({ origin: '*' }))

  // MIDDLEWARE END

  // app.listen(config.port, () => {
  //  console.log(`Server started on ${config.port}`)
  // })
  await app.listen(config.port)
  console.log(`Server started on ${config.port}`)
  wlogger.info(`Server started on ${config.port}`)

  if (process.env.COINJOIN_ENV !== 'test') {
    // Connect to the IPFS network and subscribe to the DB.
    await network.connectToIPFS()

    // Initialze the P2P library
    const p2p = new P2P(network)

    // Connect to the known peers
    await p2p.connectToPeers()

    // Connect to the Consolidating CoinJoin OrbitDB.
    await network.connectToOrbitDB(config.orbitDBAddr)

    // Broadcast server information onto the network.
    const writeHash = await network.writeDB(p2p.ipfsData)
    wlogger.silly(`Added this information to the OrbitDB: ${JSON.stringify(p2p.ipfsData, null, 2)}`)
    wlogger.silly(`writeHash: ${writeHash}`)

    // Add the network and p2p instances to the context.
    app.context.network = network
    app.context.p2p = p2p

    // Create a timer that periodically updates the server information on the DB.
    setInterval(async function () {
      wlogger.silly(`Starting interval.`)
      wlogger.silly(`DB has synced: ${network.dbHasSynced}`)

      const peers = await network.ipfs.swarm.peers()
      wlogger.silly(`peers: ${peers.length}`)

      // Broadcast server information onto the network.
      const writeHash = await network.writeDB(p2p.ipfsData)
      wlogger.silly(`Added this information to the OrbitDB: ${JSON.stringify(p2p.ipfsData, null, 2)}`)
      wlogger.silly(`writeHash: ${writeHash}`)

      // Find and validate peers
      p2p.validatePeers()
    }, UPDATE_PERIOD)
  }

  return app
}
// startServer()

// export default app
// module.exports = app
module.exports = {
  startServer
}
