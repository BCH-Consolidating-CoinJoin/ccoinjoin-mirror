/*
  This library contains functions used to communicate with the P2P network over
  IPFS.
*/

'use strict'

const fs = require('fs')
const ccoinjoinBootstrap = require('../../peers/ccoinjoin-bootstrap.json')
const config = require('../../config')
const wlogger = require('../../src/utils/logging')

const util = require('util')
util.inspect.defaultOptions = { depth: 3 }

// Load the ccoinjoin-network library.
// const Network = require('../../ccoinjoin-network')
const Network = require('ccoinjoin-network')
const network = new Network()
const UPDATE_PERIOD = 1000 * 60 // 1 minute

class P2P {
  constructor (network) {
    try {
      wlogger.silly(`entering P2P constructor.`)

      this.ipfs = network.ipfs
      this.db = network.db
      this.network = network
      this.id = {
        hash: '',
        multiaddr: ''
      }

      this.knownPeers = this.openKnownPeers()

      this.ipfsData = config.ipfsData
    } catch (err) {
      wlogger.debug(`Error in p2p.js/constructor()`, err)
      throw err
    }
  }

  // Attempt to connect to all peers in the knownPeers.verifiedPeers list.
  async connectToPeers () {
    try {
      wlogger.silly(`entering p2p.js connectToPeers().`)

      // Determine the IPFS ID for use with the /ipfsid endpoint.
      const thisIpfsInfo = await this.ipfs.id()
      // console.log(`thisIpfsInfo: ${util.inspect(thisIpfsInfo)}`)

      this.id.hash = thisIpfsInfo.id
      this.id.multiaddr = this.getMultiaddr(thisIpfsInfo)

      // Not sure which redundunt objects I'll use in the future.
      this.ipfsData.peerHash = this.id.hash
      this.ipfsData.multiaddr = this.id.multiaddr

      console.log(`IPFS ID: ${this.id.hash}`)
      console.log(`multiaddr: ${this.id.multiaddr}`)

      // Connect to all bootstrap peers
      await this.connectToBootstrapPeers()

      await sleep(10000)

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

            console.log(`Connecting to IPFS peer: ${crAddr}`)
            // Connect to the bootstrap peers
            await this.ipfs.swarm.connect(crAddr)
          } catch (err) {
          // console.log(`Error connecting to peer: `, err)
            console.log(`Error connecting to peer ${thisPeer}`)
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
      // Add all bootstrap peers to the IPFS swarm.
      for (var i = 0; i < ccoinjoinBootstrap.bootstrapPeers.length; i++) {
        const thisPeer = ccoinjoinBootstrap.bootstrapPeers[i]

        // Prevent the node from trying to connect to itself.
        if (thisPeer.indexOf(this.id.hash) === -1) {
          try {
            console.log(`Connecting to IPFS peer: ${thisPeer}`)
            // Connect to the bootstrap peers
            await this.ipfs.swarm.connect(thisPeer)
          } catch (err) {
            console.log(`Error connecting to peer.`)
          }
        }
      }
    } catch (err) {
      wlogger.debug(`Error in p2p.js/connectToBootstrapPeers()`, err)
      throw err
    }
  }

  // This function should (hopefullreturn the correct mutliaddr for connecting to this peer.
  getMultiaddr (thisIpfsInfo) {
    try {
      wlogger.silly(`entering p2p.js getMultiaddr().`)

      let addresses = thisIpfsInfo.addresses
      addresses = addresses.filter(x => x.indexOf('p2p-circuit') === -1)
      addresses = addresses.filter(x => x.indexOf('127.0.0.1') === -1)
      const last = addresses.length - 1

      return addresses[last]
    } catch (err) {
      wlogger.debug(`Error in p2p.js/getMultiaddr()`, err)
      throw err
    }
  }

  // Open and read known-peers.json
  openKnownPeers () {
    const filename = '../../peers/known-peers.json'

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
          if (err) return reject(err)

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
  // verifiedPeers list.
  async validatePeers () {
    try {
      wlogger.silly(`entering p2p.js validatePeers().`)

      // Generate an array of all peers on the network.
      let latest = await this.network.readDB()
      let peerArray = this.getUniquePeers(latest)
      peerArray = peerArray.filter(x => x !== null && x !== undefined)
      // console.log(`peerHashs: ${JSON.stringify(peerHashs, null, 2)}`)

      console.log(`peerArray: ${JSON.stringify(peerArray, null, 2)}`)

      // Remove this nodes hash from the peerArray hash.
      const myHash = this.id.hash
      let peers = peerArray.filter(x => x !== myHash)
      console.log(`peerArray with my hash removed: ${JSON.stringify(peers, null, 2)}`)

      // Remove any nodes from the bootstrap list.
      // https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array
      peers = peers.filter(el => !ccoinjoinBootstrap.bootstrapHashs.includes(el))
      console.log(`peers after removing bootstrap hashes: ${JSON.stringify(peers, null, 2)}`)

      // Remove any nodes from the list that are already verified.
      peers = peers.filter(el => !this.knownPeers.verifiedPeers.includes(el))
      console.log(`peers after removing verified peers: ${JSON.stringify(peers, null, 2)}`)

      // Loop through the leftover peers.
      for (var i = 0; i < peers.length; i++) {
        const thisPeer = peers[i]

        // Generate the circuit-relay mutliaddr
        const crAddr = `/p2p-circuit/ipfs/${thisPeer}`

        // Connect to the peer
        try {
          await this.ipfs.swarm.connect(crAddr)
          console.log(`Connected to peer ${thisPeer}.`)
        } catch (err) {
          console.log(`Could not connect to peer ${crAddr}`)
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

  // Gets the mutliaddr for unique peers
  getUniquePeers (dbRawData) {
    const payloads = dbRawData.map(entry => entry.payload.value)
    // console.log(`payloads: ${JSON.stringify(payloads, null, 2)}`)

    const peers = payloads.map(entry => entry.peerHash)
    // console.log(`peers: ${JSON.stringify(peers, null, 2)}`)

    const uniquePeers = peers.filter(this.getUnique)
    return uniquePeers
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
