import './styles.scss';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';

type MessageProps = {
    sender: string;
    message: string;
};

export default function Message({ sender, message }: MessageProps) {

    const user = useSelector(selectUser);

    function isMyMessage() {
        return sender === user.username;
    }

    return (
        <div
            className="messageContainer"
            style={ {
                justifyContent: isMyMessage() ? 'end' : 'start',
                flexDirection: isMyMessage() ? 'row-reverse' : 'row',
            } }
        >
            <div className="avatar">
                <Avatar size={ 40 } icon={ <UserOutlined /> } />
            </div>

            <div
                className={ `message ${isMyMessage() ? 'myMessage' : 'otherMessage'}` }
            >
                <div
                    style={ { display: isMyMessage() ? 'none' : 'block' } }
                    className="messageHeader"
                >
                    <p>{ isMyMessage() ? 'Me' : sender }</p>
                </div>

                <div className="messageBody">
                    <p>{ message }</p>
                </div>
            </div>
        </div >
    );
}