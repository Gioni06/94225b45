import io from 'socket.io-client';

export const connectSocket = (location) => {
    return io(location);
}