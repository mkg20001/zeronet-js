"use strict"

const ZeroNet = require("../../")

const multiaddr = require("multiaddr")

let node

describe("handshake", () => {
  before(done => {
    node = ZeroNet({
      id: global.id,
      swarm: {
        zero: {
          listen: [
            "/ip4/127.0.0.1/tcp/25335"
          ],
          crypto: false
        },
        libp2p: {
          listen: [
            "/ip4/127.0.0.1/tcp/25533"
          ]
        }
      }
    })
    node.start(done)
  })

  it("should handshake and ping", (cb) => {
    node.swarm.dial(node.swarm.lp2p.lp2p.peerInfo, "ping", {}, cb)
  })

  it("should upgrade, handshake and ping", (cb) => {
    node.swarm.dial(multiaddr("/ip4/127.0.0.1/tcp/25335"), "ping", {}, cb)
  })

  after(function (done) {
    this.timeout(5000)
    node.stop(done)
  })
})
