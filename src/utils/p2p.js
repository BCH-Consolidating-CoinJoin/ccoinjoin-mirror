/*
  This library contains functions used to communicate with the P2P network over
  IPFS.
*/

'use strict'

const fs = require('fs')
const wlogger = require('../../src/utils/logging')

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

const KNOWN_PEERS = `${__dirname}/../../peers/known-peers.json`

// Load the boostrap peer list. This is used to initialize the P2P network.
// This is a list mirror servers dedicated to supporting the CCoinJoin network
// over the long term.
const ccoinjoinBootstrap = require('../../peers/ccoinjoin-bootstrap.json')

// Load the server config file.
const config = require('../../config')

class P2P {
  constructor (network) {
    try {
      wlogger.silly(`entering P2P constructor.`)

      // Locally store the network object.
      this.network = network

      // Contains identification information for this peer.
      this.id = {
        hash: '',
        multiaddr: ''
      }

      // Open the known-peers file with saved peer information.
      this.knownPeers = this.openKnownPeers(KNOWN_PEERS)

      this.bootstrapPeers = ccoinjoinBootstrap

      // Load the config data for this IPFS peer.
      this.ipfsData = config.ipfsData
    } catch (err) {
      wlogger.debug(`Error in p2p.js/constructor()`, err)
      throw err
    }
  }

  // Try connecting to every known peer.
  async connectToPeers () {
    try {
      wlogger.silly(`entering p2p.js connectToPeers().`)

      // Determine the IPFS ID for use with the /ipfsid endpoint.
      const thisIpfsInfo = await this.network.ipfs.id()
      // console.log(`thisIpfsInfo: ${util.inspect(thisIpfsInfo)}`)

      this.id.hash = thisIpfsInfo.id
      this.id.multiaddr = this.getMultiaddr(thisIpfsInfo)

      // Not sure which redundunt objects I'll use in the future.
      this.ipfsData.peerHash = this.id.hash
      this.ipfsData.multiaddr = this.id.multiaddr

      wlogger.info(`IPFS ID: ${this.id.hash}`)
      wlogger.info(`multiaddr: ${this.id.multiaddr}`)

      // Connect to all bootstrap peers
      await this.connectToBootstrapPeers()

      // Wait 10 seconds before trying to connect to circuit-relay peers,
      // if this isn't a test.
      if (process.env.COINJOIN_ENV !== 'test') { await sleep(10000) }

      // Connect to all previously seen peers
      await this.connectToVerifiedPeers()

      // Connect to the OrbitDB.
      // await network.connectToOrbitDB(ccoinjoinBootstrap.dbAddress)

      // Add this nodes IPFS connection information to the OrbitDB.
      // await this.broadcastMyPeerInfo()
    } catch (err) {
      wlogger.debug(`Error in p2p.js/connectToPeers()`, err)
      throw err
    }
  }

  /*
  // Broadcasts the IPFS peer information for this peer to the network.
  async broadcastMyPeerInfo () {
    try {
      wlogger.silly(`entering p2p.js broadcastMyPeerInfo().`)
      // Construct the server information DB entry
      const now = new Date()

      this.ipfsData.timestamp = now.toISOString()
      this.ipfsData.localTimestamp = now.toLocaleString()
    } catch (err) {
      wlogger.debug(`Error in p2p.js/broadcastMyPeerInfo()`, err)
      throw err
    }
  }
*/

  // Connects to all peers listed in the knownPeers.verifiedPeers array.
  async connectToVerifiedPeers () {
    try {
      wlogger.silly(`entering p2p.js connectToVerifiedPeers().`)
      // For now, using the first bootstrap peer to form a circuit relay. This
      // needs to be improved.
      const circRelay = ccoinjoinBootstrap.bootstrapPeers[0]

      const verifiedPeers = this.knownPeers.verifiedPeers

      for (var i = 0; i < verifiedPeers.length; i++) {
        const thisPeer = verifiedPeers[i]

        // Prevent the node from trying to connect to itself.
        if (thisPeer.indexOf(this.id.hash) === -1) {
          try {
          // Generate the circuit-relay mutliaddr
          // const crAddr = `${circRelay}/p2p-circuit/ipfs/${thisPeer}`
            const crAddr = `/p2p-circuit/ipfs/${thisPeer}`

            wlogger.info(`Connecting to IPFS peer: ${crAddr}`)
            // Connect to the bootstrap peers
            await this.network.ipfs.swarm.connect(crAddr)
          } catch (err) {
          // console.log(`Error connecting to peer: `, err)
            wlogger.error(`Error connecting to peer ${thisPeer}`)
          }
        }
      }
    } catch (err) {
      wlogger.debug(`Error in p2p.js/connectToVerifiedPeers()`, err)
      throw err
    }
  }

  // Connect to the peers listed in the ccoinjoin-bootstrap.json file.
  async connectToBootstrapPeers () {
    try {
      wlogger.silly(`entering p2p.js connectToBootstrapPeers().`)

      // console.log(`this.bootstrapPeers: ${util.inspect(this.bootstrapPeers)}`)
      // console.log(`bootstrapPeers.length: ${this.bootstrapPeers.length}`)

      // Add all bootstrap peers to the IPFS swarm.
      for (var i = 0; i < this.bootstrapPeers.bootstrapPeers.length; i++) {
        const thisPeer = this.bootstrapPeers.bootstrapPeers[i]

        // Prevent the node from trying to connect to itself.
        if (thisPeer.indexOf(this.id.hash) === -1) {
          try {
            wlogger.debug(`Connecting to IPFS peer: ${thisPeer}`)
            // Connect to the bootstrap peers
            await this.network.ipfs.swarm.connect(thisPeer)
          } catch (err) {
            wlogger.debug(`Error connecting to peer.`)
          }
        }
      }
    } catch (err) {
      wlogger.debug(`Error in p2p.js/connectToBootstrapPeers()`, err)
      throw err
    }
  }

  // This function should (hopefully) return the correct mutliaddr for
  // connecting to this peer.
  getMultiaddr (thisIpfsInfo) {
    try {
      wlogger.silly(`entering p2p.js getMultiaddr().`)

      let addresses = thisIpfsInfo.addresses
      addresses = addresses.filter(x => x.indexOf('p2p-circuit') === -1)
      addresses = addresses.filter(x => x.indexOf('127.0.0.1') === -1)

      // Return an empty string if no external multiaddr is generated.
      if (addresses.length === 0) return ''

      const last = addresses.length - 1
      return addresses[last]
    } catch (err) {
      wlogger.debug(`Error in p2p.js/getMultiaddr()`, err)
      throw err
    }
  }

  // Open and read known-peers.json
  openKnownPeers (filename) {
    // const filename = '../../peers/known-peers.json'

    try {
      wlogger.silly(`entering p2p.js openKnownPeers().`)

      // Delete the cached copy of the wallet. This allows testing of list-wallets.
      delete require.cache[require.resolve(filename)]

      const data = require(filename)
      return data
    } catch (err) {
      wlogger.debug(`Error in p2p.js/openKnownPeers()`, err)
      throw new Error(`Could not open ${filename}`)
    }
  }

  // Save data to known-peers.json
  saveKnownPeers (data) {
    try {
      wlogger.silly(`entering p2p.js saveKnownPeers().`)

      const filename = `${__dirname}/../../peers/known-peers.json`

      return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data, null, 2), function (err) {
          if (err) {
            wlogger.error(`Error in p2p.js/saveKnownPeers(): `, err)
            return reject(err)
          }

          wlogger.silly(`Successfully saved to known-peers.json`)

          // console.log(`${name}.json written successfully.`)
          return resolve()
        })
      })
    } catch (err) {
      wlogger.debug(`Error in p2p.js/saveKnownPeers()`, err)
      throw err
    }
  }

  // Compare an array of peer hashes from OrbitDB with this nodes internal
  // verifiedPeers list. Validate the difference, and add them to the
  // verifiedPeers list if we can successfully connect to them.
  async validatePeers () {
    try {
      wlogger.silly(`entering p2p.js validatePeers().`)

      // Get the raw data from OrbitDB.
      let latest = await this.network.readDB()

      // Generate an array of unique peers listed in the DB.
      let peerArray = this.getUniquePeers(latest)
      peerArray = peerArray.filter(x => x !== null && x !== undefined)
      // console.log(`peerHashs: ${JSON.stringify(peerHashs, null, 2)}`)

      wlogger.debug(`peerArray: ${JSON.stringify(peerArray, null, 2)}`)

      // Remove this nodes hash from the peerArray hash.
      const myHash = this.id.hash
      let peers = peerArray.filter(x => x !== myHash)
      wlogger.debug(`peerArray with my hash removed: ${JSON.stringify(peers, null, 2)}`)

      // Remove any nodes from the bootstrap list.
      // https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array
      peers = peers.filter(el => !ccoinjoinBootstrap.bootstrapHashs.includes(el))
      wlogger.debug(`peers after removing bootstrap hashes: ${JSON.stringify(peers, null, 2)}`)

      // Remove any nodes from the list that are already verified.
      peers = peers.filter(el => !this.knownPeers.verifiedPeers.includes(el))
      wlogger.debug(`peers after removing verified peers: ${JSON.stringify(peers, null, 2)}`)

      // Loop through the leftover peers.
      for (var i = 0; i < peers.length; i++) {
        const thisPeer = peers[i]

        // Generate the circuit-relay mutliaddr
        const crAddr = `/p2p-circuit/ipfs/${thisPeer}`

        // Connect to the peer
        try {
          await this.network.ipfs.swarm.connect(crAddr)
          wlogger.debug(`Connected to peer ${thisPeer}.`)
        } catch (err) {
          wlogger.debug(`Could not connect to peer ${crAddr}`)
          continue
        }

        // If connection is successful, add that peer to the validatedPeers list.
        this.knownPeers.verifiedPeers.push(thisPeer)
      }

      // Save the list.
      await this.saveKnownPeers(this.knownPeers)
    } catch (err) {
      wlogger.debug(`Error in p2p.js/validatePeers()`, err)
      throw err
    }
  }

  // Process raw data from OrbitDB and return an array of unique peer hashs.
  getUniquePeers (dbRawData) {
    try {
      wlogger.silly(`entering p2p.js getUniquePeers().`)

      // Get only the payload data from the raw DB JSON.
      const payloads = dbRawData.map(entry => entry.payload.value)
      // console.log(`payloads: ${JSON.stringify(payloads, null, 2)}`)

      // Get only the peer hash field of each DB entry.
      const peers = payloads.map(entry => entry.peerHash)
      // console.log(`peers: ${JSON.stringify(peers, null, 2)}`)

      // Filter out duplicate entries.
      const uniquePeers = peers.filter(this.getUnique)

      // Return the unique peer hashes.
      return uniquePeers
    } catch (err) {
      wlogger.debug(`Error in p2p.js/getUniquePeers()`, err)
      throw err
    }
  }

  // A filter function for identifying unique entries.
  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  getUnique (value, index, self) {
    return self.indexOf(value) === index
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = P2P
