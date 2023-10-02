import './styles.scss';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { IMessageModel } from '../../Interfaces/IMessageModel';

export default function Message(props: IMessageModel) {

    const user = useSelector(selectUser);

    function isMyMessage() {
        return props.user.name === user.username;
    }

    return (
        <div
            className="messageContainer"
            style={ {
                justifyContent: isMyMessage() ? 'end' : 'start',
                flexDirection: isMyMessage() ? 'row-reverse' : 'row',
            } }>

            <div className="avatar">
                <Avatar size={ 40 } icon={ <UserOutlined /> } />
            </div>

            <div
                className={ `message ${isMyMessage() ? 'myMessage' : 'otherMessage'}` }>
                <div
                    style={ { display: isMyMessage() ? 'none' : 'block' } }
                    className="messageHeader">

                    <p>{ isMyMessage() ? 'Me' : props.user.name }</p>
                </div>

                <div className="messageBody">
                    <p>{ props.message }</p>
                </div>

                <div className="messageFooter">
                    <span>{ props.time.slice(0, 5) }</span>
                </div>
            </div>
        </div >
    );
}