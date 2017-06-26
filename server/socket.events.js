import { v4 } from 'uuid';

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('test', (msg) => {
        const message = { ...msg, id: v4()}
        io.sockets.emit('msg_received', message)
    })
  });
}

export default socketEvents;