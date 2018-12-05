/*
  Unit tests for the p2p.js library.

  TODO:

*/

'use strict'

const assert = require('chai').assert

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

// Mocking libraries
const Network = require('./mocks/network-mock')
const mockOrbitData = require('./mocks/orbitdb-mock')

// File under test.
const P2P = require('../../src/utils/p2p')
let network, p2p

describe('p2p.js', () => {
  let savedPeerData = {}

  before(() => {
    network = new Network()
    p2p = new P2P(network)

    // Save existing peer data
    const filename = `${__dirname}/../../peers/known-peers.json`
    savedPeerData = p2p.openKnownPeers(filename)
  })

  after(async () => {
    network = new Network()
    p2p = new P2P(network)

    await p2p.saveKnownPeers(savedPeerData)
  })

  beforeEach(() => {
    network = new Network()
    p2p = new P2P(network)
  })

  describe('openKnownPeers', () => {
    it('should throw an error for a bad filename', () => {
      const filename = `${__dirname}/../../peers/bad-filename.json`

      try {
        p2p.openKnownPeers(filename)

        assert.equal(true, false, 'Unexpected result!')
      } catch (err) {
        assert.include(err.message, 'Could not open')
      }
    })

    it('should read the known-peers.json file', () => {
      const filename = `${__dirname}/../../peers/known-peers.json`

      const data = p2p.openKnownPeers(filename)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.hasAllKeys(data, [
        'seenServers',
        'verifiedServers',
        'seenPeers',
        'verifiedPeers'
      ])
    })
  })

  describe('saveKnownPeers', () => {
    it('should save a change to file', async () => {
      const filename = `${__dirname}/../../peers/known-peers.json`

      // Read in the file.
      const data = p2p.openKnownPeers(filename)
      // console.log(`data: ${util.inspect(data)}`)

      // Inject a piece of test data
      data.seenServers.push('test-server')

      // Save the file.
      await p2p.saveKnownPeers(data)

      // Re-open and read the file.
      const data2 = p2p.openKnownPeers(filename)

      // Assert that the data got saved to the file.
      const evalData = data.seenServers.indexOf('test-server') > -1
      assert.equal(evalData, true)

      // Remove the data from the file
      const cleanData = data2.seenServers.filter(x => x !== 'test-server')
      data2.seenServers = cleanData
      await p2p.saveKnownPeers(data2)
      // console.log(`data2: ${util.inspect(data2)}`)
    })
  })

  describe('getUniquePeers', () => {
    it('should get unique peer hash from redundent database entries', async () => {
      const peerArray = p2p.getUniquePeers(mockOrbitData.mockLatestData)
      // console.log(`peerArray: ${util.inspect(peerArray)}`)

      assert.isArray(peerArray)
      assert.equal(peerArray[0], 'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm')
    })
  })

  describe('getMultiaddr', () => {
    it('should return an empty string if no external multiaddr is generated.', () => {
      const multiaddr = p2p.getMultiaddr(mockOrbitData.mockIpfsInfoNoExternal)
      // console.log(`multiaddr: ${util.inspect(multiaddr)}`)

      assert.isString(multiaddr)
      assert.equal(multiaddr, '')
    })

    it('should return an external multiaddr', () => {
      const multiaddr = p2p.getMultiaddr(mockOrbitData.mockIpfsInfoWithExternal)
      // console.log(`multiaddr: ${util.inspect(multiaddr)}`)

      assert.isString(multiaddr)
      assert.equal(multiaddr, '/ip4/10.10.10.119/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67')
    })
  })

  describe('connectToBootstrapPeers', () => {
    it('should connecto bootstrap peers', async () => {
      try {
        await p2p.connectToBootstrapPeers()

        // Returning without throwing an error is a success.
        assert.equal(true, true, 'connectToBootstrapPeers succeeded.')
      } catch (err) {
        console.log(`connectToBootstrapPeers failed.`)
        assert.equal(true, false, 'connectToBootstrapPeers failed')
      }
    })
  })

  describe('connectToVerifiedPeers', () => {
    it('should connecto bootstrap peers', async () => {
      try {
        // Mock the verified peers.
        p2p.knownPeers.verifiedPeers = mockOrbitData.mockVerifiedPeers

        await p2p.connectToVerifiedPeers()

        // Returning without throwing an error is a success.
        assert.equal(true, true, 'connectToVerifiedPeers succeeded.')
      } catch (err) {
        console.log(`connectToVerifiedPeers failed.`)
        assert.equal(true, false, 'connectToVerifiedPeers failed')
      }
    })
  })

  describe('connectToPeers', () => {
    it('should save identification info before connecting to peers', async () => {
      try {
        await p2p.connectToPeers()
        // console.log(`p2p: ${util.inspect(p2p)}`)

        assert.equal(p2p.id.hash, mockOrbitData.mockIpfsInfoWithExternal.id)
        assert.equal(p2p.id.multiaddr, '/ip4/10.10.10.119/tcp/4002/ipfs/QmcGsP3yEMs4zTwxntZomhKyz5qEq6zCerkjrbiv95GJ67')
      } catch (err) {
        console.log(`connectToPeers failed.`)
        assert.equal(true, false, 'connectToPeers failed')
      }
    })
  })

  describe('validatePeers', () => {
    it('should validate peers.', async () => {
      // p2p.network.readDB =
      // mockOrbitData.mockLatestData
      await p2p.validatePeers()
    })
  })
})
