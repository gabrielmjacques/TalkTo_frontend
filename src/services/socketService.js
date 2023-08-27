import io from 'socket.io-client'

let socket

export const connectSocket = ( username ) => {
    if ( !socket ) {
        socket = io( 'http://localhost:3000', { transports: [ 'websocket' ] } )
        socket.emit( 'setUsername', username )
    }
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}