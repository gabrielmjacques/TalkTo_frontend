import { UserOutlined } from '@ant-design/icons'
import { Button, Card, Input, Space } from 'antd'
import './styles.css'

import { useEffect, useState } from 'react'
import { setSocketUser } from '../../services/socketService'

import { socket } from '../../services/socketService'

export default function Login() {

    const [ username, setUsername ] = useState()

    async function handleLogin() {
        if ( !username.trim() ) return

        setSocketUser( username )
    }

    useEffect( () => {
        // Sockets events

        return () => {
            socket.disconnect()
        }
    }, [] )

    return (
        <div className='login'>
            <Card size="default">
                <Space direction="vertical" size="middle">

                    <h1 style={ { textAlign: 'center' } }>Login</h1>

                    <hr />

                    <Input
                        size="large"
                        placeholder="Username"
                        prefix={ <UserOutlined /> }
                        onChange={ e => setUsername( e.target.value ) }
                    />

                    <hr />

                    <Button onClick={ () => handleLogin() } type="primary" block>Enter</Button>

                </Space>
            </Card>

        </div>
    )
}