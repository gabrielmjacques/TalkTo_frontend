import { Button, Input, Space } from 'antd'
import './styles.css'

export default function Chat() {
    return (
        <div className="chatContainer">
            <div className="chat">

                <div className="chatHeader">
                    <h2>Chat</h2>
                </div>

                <div className="chatBody">
                    <div className="chatMessages"></div>

                    <form className="inputMessage">
                        <input type="text" placeholder='Write a Nice Message Here!' />
                        <Button type="primary" style={ { backgroundColor: 'var(--primary', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>Send</Button>
                    </form>
                </div>

            </div>
        </div>
    )
}