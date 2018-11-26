# Consolidating CoinJoin Mirror
This is a [koa api server](https://github.com/christroutner/babel-free-koa2-api-boilerplate), similar to [Consolidating CoinJoin Server](https://github.com/BCH-Consolidating-CoinJoin/ccoinjoin-server), but much more slimmed down. Unlike the server, this app does not engage in any CoinJoin activities. Instead, it only mirrors the peer-to-peer database. It's purpose is to help support the network by rebroadcasting the list of network servers. Unlike the server, there should be no (potential) legal repercussions to running it.


[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

[![Build Status](https://travis-ci.org/BCH-Consolidating-CoinJoin/consolidating-coinjoin.svg?branch=master)](https://travis-ci.org/BCH-Consolidating-CoinJoin/consolidating-coinjoin)


[![Coverage Status](https://coveralls.io/repos/github/BCH-Consolidating-CoinJoin/consolidating-coinjoin/badge.svg?branch=master)](https://coveralls.io/github/BCH-Consolidating-CoinJoin/consolidating-coinjoin?branch=master)


[![Greenkeeper badge](https://badges.greenkeeper.io/BCH-Consolidating-CoinJoin/consolidating-coinjoin.svg)](https://greenkeeper.io/)


## Requirements
* node __^8.9.4__
* npm __^5.7.1__

## Installation
Installation is different depending on if you want to create a *development* server for developing the code, or a *production* server running as a Docker container.

### Development
- `npm install` to install npm dependencies.
- `./install-mongo` to install and setup mongodb.
- `npm test` to run tests and ensure everything is working correctly.
- `npm start` to run a development server.

### Production
This server requires a Mongo database, and runs over tor by default, so it uses Docker Compose to run in production.
[This tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
shows how to setup Docker.
[This tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04)
shows how to setup Docker Compose. Here are some commands to build and run this
application with Docker Compose:

- `./rebuild-image` will build the Docker container from scratch

- `docker-compose up -d` will run the server in the background (daemon mode).
  The server attaches to port 5000 on the host by default.

By default, the server connects to the tor network and broadcasts its .onion address on the IPFS network.

It is assumed that a production server will have nginx sitting in front of the docker containers when running the server on the regular internet. Nginx will serve static content, handle SSL, and proxy API calls to the docker container on port 5000.


## Structure
```
├── bin
│   └── server.js            # Bootstrapping and entry point
├── config                   # Server configuration settings
│   ├── env                  # Environment specific config
│   │   ├── common.js
│   │   ├── development.js
│   │   ├── production.js    # Customize YOUR server settings here.
│   │   └── test.js
│   ├── index.js             # Config entrypoint - exports config according to envionrment and commons
│   └── passport.js          # Passportjs config of strategies
├── src                      # Source code
│   ├── modules
│   │   ├── controller.js    # Module-specific controllers
│   │   └── router.js        # Router definitions for module
│   ├── models               # Mongoose models
│   └── middleware           # Custom middleware
│       └── validators       # Validation middleware
└── test                     # Unit tests
```

## Usage
* `npm start` Start server in development mode
* `npm test` Run mocha tests
* `docker-compose up` Run server in production mode

## License
MIT
