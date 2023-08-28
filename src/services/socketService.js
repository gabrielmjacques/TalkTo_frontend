import io from 'socket.io-client'
import { messageError, messageSuccess } from '../utils/antMessage'

export const socket = io( 'http://localhost:3000', { autoConnect: false } )

export const connectSocker = async ( username ) => {
    if ( socket.connected ) return false

    socket.connect()

    socket.emit( 'hasUsername', username, ( has ) => {
        if ( has ) {
            messageError( 'Name in Use' )
            socket.disconnect()

        } else {
            socket.emit( 'setUsername', username )
            messageSuccess( 'Logged' )
        }
    } )

    return socket
}

export const getStatus = () => {
    return socket.connected
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}