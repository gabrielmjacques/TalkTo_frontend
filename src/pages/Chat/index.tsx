import './styles.scss';

import { Button, message } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRoomData } from '../../Interfaces/IRoomData';
import MessageModel from '../../Models/MessageModel';
import Message from "../../components/Message";
import { selectUser } from '../../redux/userSlice';
import { socket } from '../../services/socketConnection';
import { IMessageModel } from '../../Interfaces/IMessageModel';

export default function Chat() {
    // States
    const [messageToSend, setMessageToSend] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const [roomData, setRoomData] = useState<IRoomData>({ roomName: '', users: [], roomDescription: '' });

    // Hooks
    const navigate = useNavigate();
    const user: { username: string; } = useSelector(selectUser);
    const [messageApi, contextHolder] = message.useMessage();

    function scrollToBottom() {
        const chatMessages = document.querySelector('.chatMessages');
        chatMessages?.scroll({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    }

    // Handle to send message
    function handleSendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (messageToSend.trim() != '') {
            const date = new Date();

            const message = new MessageModel(
                { id: socket.id, name: user.username },
                messageToSend,
                date.toLocaleDateString(),
                date.toLocaleTimeString(),
                date.getTime()
            );

            socket.emit('sendMessage', message);

            setMessageToSend('');
            scrollToBottom();
        }
    }

    useEffect(() => {
        // If user is not logged in, redirect to login page
        if (user.username == null) {
            navigate('/');
            return;
        }

        socket.emit('getRoomData', (roomData: IRoomData, error: string) => {
            if (roomData) {
                setRoomData(roomData);
                messageApi.success(`Joined on ${roomData.roomName}`);

            } else {
                messageApi.error(error);
            }
        });

        // If user is logged in, listen to messages
        socket.on('receiveMessage', (receive: IMessageModel) => {
            const messageId = `${receive.message}/${receive.milliseconds}`;

            setMessages((prevMessages: any) => [
                ...prevMessages,
                <Message
                    key={ messageId }
                    user={ receive.user }
                    message={ receive.message }
                    date={ receive.date }
                    time={ receive.time }
                    milliseconds={ receive.milliseconds }
                />
            ]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    return (
        <>
            { contextHolder }

            <div className="chatContainer">
                <div className="chat">

                    <div className="chatHeader">
                        <h2>{ roomData.roomName }</h2>
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
        </>
    );
}