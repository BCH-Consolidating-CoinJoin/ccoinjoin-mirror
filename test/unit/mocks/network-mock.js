/*
  A mocking library for the ccoinjoin-network library.
*/

'use strict'

class CCNet {
  constructor () {
    this.bootstrap = { 'ccoinjoinBootstrap': [] }
    this.ipfs = {}
    this.db = {}
    this.ipfsIsReady = false
    this.dbHasSynced = false
  }

  async connectToIPFS () {
    return new Promise((resolve, reject) => { return resolve(true) })
  }

  async connectToOrbitDB (orbitAddr) {
    return this.db
  }

  async readDB () {
    return {
      payload: {
        value: {
          'peerHash': 'Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm',
          'multiaddr': '/ip4/10.0.2.15/tcp/4002/ipfs/Qmc8uaP9yegYmfxazB2YD7i6G4c2tnQRJvxYyWbM6w6pAm',
          'behindFirewall': true
        }
      }
    }
  }

  async writeDB (data) {
    return true
  }
}

module.exports = CCNet
