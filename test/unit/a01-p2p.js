/*
*/

'use strict'

const assert = require('chai').assert

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

      assert.hasAllKeys(data, ['seenServers', 'verifiedServers', 'seenPeers', 'verifiedPeers'])
    })
  })
})
