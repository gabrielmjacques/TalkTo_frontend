import io from 'socket.io-client'
import { messageError, messageSuccess } from '../utils/antMessage'

export const socket = io( 'http://localhost:3000', { autoConnect: false } )

export const connectSocker = async ( username ) => {
    if ( socket.connected ) return false

    socket.connect()

    socket.emit( 'hasUsername', username, ( has ) => {
        if ( !has ) {
            socket.emit( 'setUsername', username )
            messageSuccess( 'Logged' )

        } else {
            messageError( 'Name in Use' )
            socket.disconnect()
        }
    } )

    return socket
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}