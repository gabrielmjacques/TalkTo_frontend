import './styles.scss';

import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { connectSocket, socket } from '../../services/socketConnection';
import { RoomModel } from '../../Models/RoomModel';
import { messageError, messageSuccess } from '../../utils/antMessage';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { SET_USERNAME } from '../../redux/userSlice';

export default function Rooms() {
    // States
    const [username, setUsername] = useState<string>("");
    const [rooms, setRooms] = useState<RoomModel[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [modalConfig, setModalConfig] = useState({ open: false, okLoading: false });

    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle the join room button
    function handleJoinRoom(room: string) {
        setSelectedRoom(room);
        setModalConfig({ ...modalConfig, open: true });
    }

    // Function to enter the room
    function handleJoinRoomSubmit() {
        setModalConfig({ ...modalConfig, okLoading: true });

        socket.emit("checkRoom", {
            username,
            room: selectedRoom
        }, (response: { error: string; }) => {
            if (response.error) {
                messageError(response.error);
                setModalConfig({ ...modalConfig, okLoading: false });

            } else {
                messageSuccess("You have joined the room successfully!");
                setModalConfig({ ...modalConfig, okLoading: false });
                navigate(`/chat/`);
                dispatch(SET_USERNAME(username));
            }
        });
    }

    useEffect(() => {
        connectSocket();
    });

    useEffect(() => {
        socket.on("rooms", (rooms: RoomModel[]) => {
            setRooms(rooms);
        });

        return () => {
            socket.off("rooms");
        };
    }, []);

    return (
        <>
            <div className="roomsPage">
                <div className="roomsContainer">
                    <h2>Select Room</h2>

                    <hr />

                    <div className="rooms">

                        {
                            rooms.map((room: RoomModel) => (
                                <div key={ room.roomName } className="roomCard" onClick={ () => handleJoinRoom(room.roomName) }>

                                    <span className='texts'>
                                        <h3>{ room.roomName }</h3>
                                        <p>{ room.roomDescription }</p>
                                    </span>

                                    <span className='usersCount'>{ room.users.length } <UserOutlined /></span>

                                </div>
                            ))
                        }

                    </div>

                    <div className="createRoom">
                        <Button disabled style={ { color: "white" } } type="primary">Coming Soon</Button>
                    </div>
                </div>
            </div>

            <Modal
                className='loginModal'
                title={ selectedRoom }
                open={ modalConfig.open }
                footer={ false }
            >
                <h4>
                    Enter a username to join { selectedRoom }
                </h4>

                <Form
                    onFinish={ handleJoinRoomSubmit }
                >
                    <Form.Item>
                        <Input placeholder="Username" onChange={ (e) => setUsername(e.target.value) } />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block onClick={ handleJoinRoomSubmit } loading={ modalConfig.okLoading }>Join Room</Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="text" block onClick={ () => setModalConfig({ ...modalConfig, open: false }) }>Cancel</Button>
                    </Form.Item>
                </Form>

            </Modal >
        </>
    );
}