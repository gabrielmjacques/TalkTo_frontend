import io from 'socket.io-client';
import { messageError, messageSuccess } from '../utils/antMessage';

export const socket = io('http://localhost:3000', { autoConnect: false });

export const connectSocket = async () => {
    // Verify if socket is already connected
    if (socket.connected) return false;

    socket.connect();

    socket.on('connect_error', (error) => {
        messageError('Error connecting to the server. Trying to restart in 3 seconds...', 3);

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    });

    socket.on('connect', () => {
        messageSuccess('Welcome');
    });
};

export const getStatus = () => {
    return socket.connected;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};