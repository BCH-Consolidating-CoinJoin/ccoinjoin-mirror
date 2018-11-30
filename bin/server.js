const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const session = require('koa-generic-session')
const passport = require('koa-passport')
const mount = require('koa-mount')
const serve = require('koa-static')
const cors = require('kcors')

const util = require('util')
util.inspect.defaultOptions = { depth: 3 }

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

  // Connect to the Mongo Database.
  mongoose.Promise = global.Promise
  await mongoose.connect(
    config.database,
    { useNewUrlParser: true }
  )
  mongoose.set('useCreateIndex', true) // Stop deprecation warning.

  // Wipe the database on startup.
  for (const collection in mongoose.connection.collections) {
    if (mongoose.connection.collections.hasOwnProperty(collection)) {
      mongoose.connection.collections[collection].deleteMany()
    }
  }

  // MIDDLEWARE START

  app.use(convert(logger()))
  app.use(bodyParser())
  app.use(session())
  app.use(errorMiddleware())

  // Used to generate the docs.
  app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))))

  // User Authentication
  require('../config/passport')
  app.use(passport.initialize())
  app.use(passport.session())

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

  // Connect to the IPFS network and subscribe to the DB.
  await network.connectToIPFS()

  // Initialze the P2P library
  const p2p = new P2P(network)

  // Connect to the known peers
  await p2p.connectToPeers()

  /*

  // Construct the server information DB entry
  const now = new Date()
  const serverConfig = {
    server: multiaddr,
    timestamp: now.toISOString(),
    localTimestamp: now.toLocaleString()
  }

  // Connect to the Orbit DB
  await network.connectToOrbitDB(ccoinjoinBootstrap.dbAddress)

  // Broadcast server information onto the network.
  await network.writeDB(serverConfig)

  // Create a timer that periodically updates the server information on the DB.
  setInterval(async function () {
    console.log(`DB has synced: ${network.dbHasSynced}`)

    const newNow = new Date()
    serverConfig.timestamp = newNow.toISOString()
    serverConfig.localTimestamp = newNow.toLocaleString()

    console.log(`Updating server entry at ${newNow.toLocaleString()}`)

    const peers = await network.ipfs.swarm.peers()
    console.log(`peers: ${peers.length}`)

    await network.writeDB(serverConfig)

    let latest = await network.readDB()
    const servers = getUniquePeers(latest)
    console.log(`servers: ${JSON.stringify(servers, null, 2)}`)
  }, UPDATE_PERIOD)
  */

  return app
}
// startServer()

// Gets the mutliaddr for unique peers
function getUniquePeers (dbRawData) {
  const payloads = dbRawData.map(entry => entry.payload.value)
  const peers = payloads.map(entry => entry.server)

  const uniquePeers = peers.filter(getUnique)
  return uniquePeers
}

// A filter function for identifying unique entries.
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function getUnique (value, index, self) {
  return self.indexOf(value) === index
}

// export default app
// module.exports = app
module.exports = {
  startServer
}
