import './styles.scss';

import { Button } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMessageModel } from '../../Interfaces/IMessageModel';
import Message from "../../components/Message";
import { selectUser } from '../../redux/userSlice';
import { sendMessage, socket } from '../../services/socketService';

export default function Chat() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [messageToSend, setMessageToSend] = useState('');
    const [messages, setMessages] = useState<any>();

    function handleSendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (messageToSend.trim() != '') {
            const date = new Date();

            const messageObject: IMessageModel = {
                user: {
                    id: socket.id,
                    name: "Cleber"
                },
                message: messageToSend,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                milliseconds: date.getTime()
            };

            sendMessage(messageObject);

            setMessageToSend('');
        }
    }

    useEffect(() => {
        // If user is logged in, listen to messages
        socket.on('receiveMessage', (receive) => {
            console.log(receive);

            const messageId = `${receive.id}/${receive.milliseconds}`;

            setMessages((prevMessages: any) => [
                ...prevMessages,
                <Message key={ messageId } sender={ receive.user.name } message={ receive.message } />
            ]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

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

                    <form className="inputMessage" onSubmit={ e => handleSendMessage(e) }>
                        <input
                            onChange={ e => setMessageToSend(e.target.value) }
                            autoFocus={ true }
                            value={ messageToSend }
                            type="text"
                            placeholder='Write a Nice Message Here!'
                        />

                        <Button
                            type="primary"
                            htmlType='submit'
                            className='sendButton'

                        >Send
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
}