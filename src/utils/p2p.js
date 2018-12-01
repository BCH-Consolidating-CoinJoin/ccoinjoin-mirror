/*
  This library contains functions used to communicate with the P2P network over
  IPFS.
*/

'use strict'

const fs = require('fs')
const ccoinjoinBootstrap = require('../../peers/ccoinjoin-bootstrap.json')
const config = require('../../config')

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

// Load the ccoinjoin-network library.
// const Network = require('../../ccoinjoin-network')
const Network = require('ccoinjoin-network')
const network = new Network()
const UPDATE_PERIOD = 1000 * 60 // 1 minute

class P2P {
  constructor (network) {
    this.ipfs = network.ipfs
    this.db = network.db
    this.id = {
      hash: '',
      multiaddr: ''
    }

    this.knownPeers = this.openKnownPeers()

    this.ipfsData = config.ipfsData
  }

  // Attempt to connect to all peers in the knownPeers.verifiedPeers list.
  async connectToPeers () {
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

    // Connect to all previously seen peers
    await this.connectToVerifiedPeers()

    // Connect to the OrbitDB.
    // await network.connectToOrbitDB(ccoinjoinBootstrap.dbAddress)

    // Add this nodes IPFS connection information to the OrbitDB.
    // await this.broadcastMyPeerInfo()
  }

  // Broadcasts the IPFS peer information for this peer to the network.
  async broadcastMyPeerInfo () {
    // Construct the server information DB entry
    const now = new Date()

    this.ipfsData.timestamp = now.toISOString()
    this.ipfsData.localTimestamp = now.toLocaleString()
  }

  // Connects to all peers listed in the knownPeers.verifiedPeers array.
  async connectToVerifiedPeers () {
    const verifiedPeers = this.knownPeers.verifiedPeers
    for (var i = 0; i < verifiedPeers.length; i++) {
      const thisPeer = verifiedPeers[i]

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
  }

  // Connect to the peers listed in the ccoinjoin-bootstrap.json file.
  async connectToBootstrapPeers () {
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
  }

  // This function should (hopefullreturn the correct mutliaddr for connecting to this peer.
  getMultiaddr (thisIpfsInfo) {
    let addresses = thisIpfsInfo.addresses
    addresses = addresses.filter(x => x.indexOf('p2p-circuit') === -1)
    addresses = addresses.filter(x => x.indexOf('127.0.0.1') === -1)
    const last = addresses.length - 1
    return addresses[last]
  }

  // Open and read known-peers.json
  openKnownPeers () {
    const filename = '../../peers/known-peers.json'

    try {
      // Delete the cached copy of the wallet. This allows testing of list-wallets.
      delete require.cache[require.resolve(filename)]

      const data = require(filename)
      return data
    } catch (err) {
      throw new Error(`Could not open ${filename}`)
    }
  }

  // Save data to known-peers.json
  saveKnownPeers (data) {
    const filename = '../../peers/known-peers.json'

    return new Promise((resolve, reject) => {
      fs.writeFile(filename, JSON.stringify(data, null, 2), function (err) {
        if (err) return reject(err)

        // console.log(`${name}.json written successfully.`)
        return resolve()
      })
    })
  }
}

module.exports = P2P
