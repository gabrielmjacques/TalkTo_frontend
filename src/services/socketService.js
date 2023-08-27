import { messageSuccess, messageError } from '../utils/antMessage'

import io from 'socket.io-client'
export const socket = io( 'http://localhost:3000', { autoConnect: false } )

export const setSocketUser = ( username ) => {
    if ( socket.connected ) { return }
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

}

export const disconnectSocket = () => {
    if ( socket ) socket.disconnect()
}