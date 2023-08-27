import io from 'socket.io-client'

let socket

export const connectSocket = ( username ) => {
    if ( !socket ) {
        socket = io( 'http://localhost:3000', { transports: [ 'websocket' ] } )
        socket.on( 'connect', () => {
            console.log( 'Connected' )
        } )
        socket.emit( 'setUsername', username )
    }
}

export const isConnected = () => {
    return socket.connected
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}