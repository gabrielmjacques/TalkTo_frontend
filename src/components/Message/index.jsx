import './styles.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

const messageProps = {
    message: '',
    sender: '',
}

export default function Message( messageProps ) {
    function isMyMessage() {
        return messageProps.sender === 'John Doe'
    }

    return (
        <div
            className="messageContainer"
            style={ {
                justifyContent: isMyMessage() ? 'start' : 'end',
                flexDirection: isMyMessage() ? 'row' : 'row-reverse',
            } }
        >
            <div className="avatar">
                <Avatar size={ 40 } icon={ <UserOutlined /> } />
            </div>

            <div
                className="message"
                style={ { backgroundColor: isMyMessage() ? 'var(--primary)' : 'var(--secondary)' } }
            >
                <div className="messageHeader">
                    <h3>{ messageProps.sender }</h3>
                </div>

                <hr />

                <div className="messageBody">
                    <p>{ messageProps.message }</p>
                </div>
            </div>
        </div >
    )
}