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
                            <h3>Test Room</h3>
                            <p>Room 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequunea inventore.</p>
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