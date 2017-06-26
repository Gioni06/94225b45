import { v4 } from 'uuid';

const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id)
    socket.emit('id_received', socket.id);
    socket.on('msg_send', (msg) => {
        const message = { screenName: msg.screenName || 'anonymous', msg: msg.msg, id: v4(), user: socket.id}
        io.sockets.emit('msg_received', message)
    })
  });
}

export default socketEvents;