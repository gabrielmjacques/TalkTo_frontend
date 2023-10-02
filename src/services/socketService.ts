import io from 'socket.io-client';
import { messageError, messageSuccess } from '../utils/antMessage';
import { IMessageModel } from '../Interfaces/IMessageModel.js';

export const socket = io('http://localhost:3000', { autoConnect: false });

export const connectSocket = async (username: string) => {
    // Verify if socket is already connected
    if (socket.connected) return false;

    socket.connect();

    socket.on('connect_error', (error) => {
        messageError('Error connecting to the server. Trying to restart in 3 seconds...', 3);

        setTimeout(() => {
            window.location.reload();
        }, 3000);
    });

    // Verify if username is already in use
    const response = new Promise((resolve, reject) => {
        socket.emit('hasUsername', username, (has: boolean) => {
            if (has) {
                // If username is already in use, disconnect socket
                socket.disconnect();
                messageError('Username already in use');
                resolve({ error: true });

            } else {
                // If username is not in use, set username and connect socket
                socket.emit('setUsername', username);
                messageSuccess('Connected');
                resolve({ error: false });
            }
        });
    });

    return response;
};

export const sendMessage = (message: IMessageModel) => {
    socket.emit('sendMessage', message);
};

export const getStatus = () => {
    return socket.connected;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};