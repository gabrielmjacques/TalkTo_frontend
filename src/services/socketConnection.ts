import io from 'socket.io-client';

export const socket = io('http://localhost:3000', { autoConnect: false });

export async function connectSocket(): Promise<{ error: string; }> {
    let message = { error: "" };

    // Verify if socket is already connected
    if (socket.connected) return { error: "" };

    socket.connect();

    socket.on('connect_error', (error) => {
        message = { error: 'Error connecting to the server. Trying to restart in 3 seconds...' };
    });

    socket.on('connect', () => {
        message = { error: "" };
    });

    return message;
};

export const getStatus = () => {
    return socket.connected;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};