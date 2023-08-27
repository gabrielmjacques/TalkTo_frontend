import io from 'socket.io-client'
export const socket = io( 'http://localhost:3000', { autoConnect: false } )

export const setSocketUser = ( username ) => {
    if ( socket.connected ) return

    socket.emit( 'checkUsername', username, ( res ) => {
        if ( res ) {
            socket.emit( 'setUsername', username )
        } else {
            console.log( 'Username already in use' )
        }
    } )

    socket.connect()
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}