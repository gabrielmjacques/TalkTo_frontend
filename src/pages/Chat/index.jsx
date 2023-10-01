import './styles.css';

import Message from "../../components/Message";
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { sendMessage } from '../../services/socketService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { socket } from '../../services/socketService';
import { useNavigate } from 'react-router-dom';
import { messageError } from "../../utils/antMessage";

export default function Chat() {
    const navigate = useNavigate();
    const user = useSelector( selectUser );

    const [ messageToSend, setMessageToSend ] = useState( '' );
    const [ messages, setMessages ] = useState( [] );

    function handleSendMessage( e ) {
        e.preventDefault();

        if ( messageToSend.trim() != '' ) {
            const date = new Date();

            const messageObject = {
                username: user.username,
                message: messageToSend,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                milliseconds: date.getTime()
            };

            sendMessage( messageObject );

            setMessageToSend( '' );
        }
    }

    useEffect( () => {
        if ( user.username ) {
            // If user is logged in, listen to messages
            socket.on( 'receiveMessage', ( receive ) => {
                const messageObj = receive.messageObj;
                const messageId = `${ receive.userId }/${ messageObj.milliseconds }`;

                setMessages( ( prevMessages ) => [
                    ...prevMessages,
                    <Message key={ messageId } sender={ messageObj.username } message={ messageObj.message } />
                ] );
            } );

            return () => {
                socket.off( 'receiveMessage' );
            };

        } else {
            // If user is not logged in, redirect to login page
            navigate( '/' );
            messageError( 'You are not logged in! Please log in to access the chat!' );
        }
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
                            autoFocus={ true }
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
    );
}