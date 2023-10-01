import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

export default function Rooms() {

    return (
        <div className="roomsContainer">
            <div className="rooms">
                <h1>Rooms</h1>

                <div className="roomCard">
                    <div className="info">
                        <h2>Room 1</h2>
                        <p>Room 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iste veritatis, ullam natus eos ratione tenetur adipisci iure eveniet aut officiis dignissimos pariatur, quasi repellendus et rem ea inventore.</p>

                        <span>12 <UserOutlined /></span>
                    </div>

                    <div className="options">
                        <button>Join</button>
                    </div>
                </div>

                <div className="roomCard">
                    <div className="info">
                        <h2>Room 2</h2>
                        <p>Room 2 Lorem ipsum  amet consectetur Consequuntur iste veritatis, ullam natus eos ratione tenetur iciis dignissimos pariatur, quasi repellendus et rem ea inventore.</p>

                        <span>2 <UserOutlined /></span>
                    </div>

                    <div className="options">
                        <button>Join</button>
                    </div>
                </div>

            </div>
        </div>
    );
}