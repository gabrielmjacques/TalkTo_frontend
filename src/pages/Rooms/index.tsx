import './styles.scss';

import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function Rooms() {

    return (
        <div className="roomsPage">
            <div className="roomsContainer">
                <h2>Select Room</h2>

                <hr />

                <div className="rooms">

                    <div className="roomCard">

                        <span className='texts'>
                            <h3>General 1</h3>
                            <p>TalkTo Official</p>
                        </span>

                        <span className='usersCount'>12 <UserOutlined /></span>

                    </div>

                </div>

                <div className="createRoom">
                    <Button type="primary">Create New Room</Button>
                </div>
            </div>
        </div>
    );
}