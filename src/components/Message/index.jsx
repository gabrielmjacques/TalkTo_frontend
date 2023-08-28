import './styles.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'

export default function Message( { sender, message } ) {

    const user = useSelector( selectUser )

    function isMyMessage() {
        return sender === user.username
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
                className="message"
                style={ { backgroundColor: isMyMessage() ? 'var(--primary)' : 'var(--secondary)' } }
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
    )
}