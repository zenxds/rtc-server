const debug = require('debug')('rtc-server')

// const connections = {}

module.exports = function(io) {
  io
  .of('rtc')
  .on('connection', function(socket) {
    debug('a user connected')

    const id = socket.id
    // connections[id] = {
    //   socket
    // }

    // tell other clients a user add
    socket.broadcast.emit('userAdd', id)
    
    socket.on('offer', function({ id: targetId, offer }) {
      socket.broadcast.to(targetId).emit('offer', {
        id,
        offer
      })
    })

    socket.on('candidate', function({ id: targetId, candidate }) {
      socket.broadcast.to(targetId).emit('candidate', {
        id,
        candidate
      })
    })

    socket.on('answer', function({ id: targetId, answer }) {
      socket.broadcast.to(targetId).emit('answer', {
        id,
        answer
      })
    })

    socket.on('message', function() {

    })
    
    socket.on('disconnect', function() {
      debug('a user disconnected')

      socket.broadcast.emit('userRemove', id)
      // delete connections[id]
    })
  })
}