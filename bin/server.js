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
util.inspect.defaultOptions = { depth: 1 }

// Load locally saved data.
const ccoinjoinBootstrap = require('../peers/ccoinjoin-bootstrap.json')
const knownPeers = require('../peers/known-peers.json')

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

  const now = new Date()
  const hostname = `test${Math.floor(Math.random() * 1000)}`

  // Construct the server information
  const serverConfig = {
    server: hostname,
    timestamp: now.toISOString(),
    localTimestamp: now.toLocaleString()
  }

  // Connect to the IPFS network and subscribe to the DB.
  await network.connectToIPFS()

  // Determine the IPFS ID for use with the /ipfsid endpoint.
  /*
  let ipfsId
  network.ipfs.id(function (err, identity) {
    if (err) {
      throw err
    }
    // console.log(`my identity: ${util.inspect(identity)}`)

    ipfsId = identity.id
    process.env.IPFS_ID = ipfsId
    console.log(`IPFS ID: ${ipfsId}`)

    // console.log(`Database IPFS ID: ${network.db.id}`)
    // process.env.ORBITDB_ID = network.db.id
  })
  */
  const thisIpfsInfo = await network.ipfs.id()
  const ipfsId = thisIpfsInfo.id
  process.env.IPFS_ID = ipfsId
  console.log(`IPFS ID: ${util.inspect(ipfsId)}`)

  // Add all bootstrap peers to the IPFS swarm.
  for (var i = 0; i < ccoinjoinBootstrap.bootstrapPeers.length; i++) {
    const thisPeer = ccoinjoinBootstrap.bootstrapPeers[i]

    // Prevent the node from trying to connect to itself.
    if (thisPeer.indexOf(ipfsId) === -1) {
      console.log(`thisPeer: ${thisPeer}`)
      // Connect to the bootstrap peers
      await network.ipfs.swarm.connect(thisPeer)
    }
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
    serverConfig.localeTimestamp = newNow.toLocaleString()

    console.log(`Updating server entry at ${newNow.toLocaleString()}`)

    const peers = await network.ipfs.swarm.peers()
    console.log(`peers: ${peers.length}`)

    await network.writeDB(serverConfig)

    let latest = await network.db.readDB()
    latest = latest.slice(0, 5)
    console.log(`Latest entries: ${JSON.stringify(latest, null, 2)}`)
  }, UPDATE_PERIOD)

  return app
}
// startServer()

// export default app
// module.exports = app
module.exports = {
  startServer
}
