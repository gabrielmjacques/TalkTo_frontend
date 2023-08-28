import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import Message from '../Message'
import './styles.css'
import { sendMessage } from '../../services/socketService'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import { socket } from '../../services/socketService'

export default function Chat() {

    const user = useSelector( selectUser )

    const [ messageToSend, setMessageToSend ] = useState( '' )
    const [ messages, setMessages ] = useState( [] )

    function handleSendMessage( e ) {
        e.preventDefault()

        const date = new Date()

        const messageObject = {
            username: user.username,
            message: messageToSend,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        }

        sendMessage( messageObject )

        setMessageToSend( '' )
    }

    useEffect( () => {
        socket.on( 'receiveMessage', ( receive ) => {
            const messageObj = receive.messageObj
            const messageId = `${ receive.userId }/${ messageObj.date }/${ messageObj.time }`

            setMessages( ( prevMessages ) => [
                ...prevMessages,
                <Message key={ messageId } sender={ messageObj.username } message={ messageObj.message } />
            ] )
        } );

        return () => {
            socket.off( 'receiveMessage' );
        };
    }, [] );

    return (
        <div className="chatContainer">
            <div className="chat">

                <div className="chatHeader">
                    <h2>Chat</h2>
                </div>

                <div className="chatBody">
                    <div className="chatMessages">
                        { messages }
                    </div>

                    <form className="inputMessage" onSubmit={ e => handleSendMessage( e ) }>
                        <input
                            onChange={ e => setMessageToSend( e.target.value ) }
                            value={ messageToSend }
                            type="text"
                            placeholder='Write a Nice Message Here!'
                        />

                        <Button
                            type="primary"
                            htmlType='submit'
                            style={ { backgroundColor: 'var(--primary', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }

                        >Send
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    )
}