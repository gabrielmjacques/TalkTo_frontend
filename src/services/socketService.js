import io from 'socket.io-client'
import { messageError, messageSuccess } from '../utils/antMessage'

export const socket = io( 'http://localhost:3000', { autoConnect: false } )

export const connectSocker = async ( username ) => {
    if ( socket.connected ) return false

    socket.connect()

    const response = new Promise( ( resolve, reject ) => {
        socket.emit( 'hasUsername', username, ( has ) => {
            if ( has ) {
                socket.disconnect()
                messageError( 'Username already in use' )
                resolve( { error: true } )

            } else {
                socket.emit( 'setUsername', username )
                messageSuccess( 'Connected' )
                resolve( { error: false } )
            }
        } )
    } )

    return response
}

export const getStatus = () => {
    return socket.connected
}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}