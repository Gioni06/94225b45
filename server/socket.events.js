const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('test', (msg) => {
        console.log(msg)
        io.sockets.emit('msg_received', msg)
    })
  });
}

export default socketEvents;