import './styles.scss';

import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { connectSocket, socket } from '../../services/socketConnection';
import { RoomModel } from '../../Models/RoomModel';
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
    const [messageApi, contextHolder] = message.useMessage();

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
                messageApi.error(response.error);
                setModalConfig({ ...modalConfig, okLoading: false });

            } else {
                setModalConfig({ ...modalConfig, okLoading: false });
                navigate(`/chat/`);
                dispatch(SET_USERNAME(username));
            }
        });
    }

    // Function to get all rooms
    const getRooms = () => {
        socket.emit("rooms", (rooms: RoomModel[]) => {
            setRooms(rooms);
        });
    };

    useEffect(() => {
        connectSocket().then((response: { error: string; }) => {
            if (response.error !== "") {
                messageApi.error(response!.error);

            }
        });

        getRooms();

        return () => {
            socket.off("rooms");
        };
    }, []);

    return (
        <>
            { contextHolder }

            <div className="roomsPage">
                <div className="roomsContainer">

                    <div className="roomsHeader">
                        <h2>Select Room</h2>
                        <button className="reloadButton" onClick={ getRooms }>Reload</button>
                    </div>

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
                onCancel={ () => setModalConfig({ ...modalConfig, open: false }) }
                footer={ false }
            >
                <Form
                    onFinish={ handleJoinRoomSubmit }
                    layout='vertical'
                >
                    <Form.Item label={ `Enter a username to join ${selectedRoom}` }>
                        <Input size='large' placeholder="Username" onChange={ (e) => setUsername(e.target.value) } />
                    </Form.Item>

                    <div className="formButtons">
                        <Form.Item>
                            <Button type="primary" block onClick={ handleJoinRoomSubmit } loading={ modalConfig.okLoading }>Join Room</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="text" block onClick={ () => setModalConfig({ ...modalConfig, open: false }) }>Cancel</Button>
                        </Form.Item>
                    </div>
                </Form>

            </Modal >
        </>
    );
}