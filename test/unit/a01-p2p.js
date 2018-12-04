/*
*/

'use strict'

const assert = require('chai').assert

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

// Mocking libraries
const Network = require('./mocks/network-mock')

// File under test.
const P2P = require('../../src/utils/p2p')
let network, p2p

describe('p2p.js', () => {
  before(() => {
    console.log(` `)
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
})