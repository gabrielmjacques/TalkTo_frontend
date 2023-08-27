import './styles.css'
import { Button, Card, Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { setSocketUser } from '../../services/socketService'
import { useEffect, useState } from 'react'

import { socket } from '../../services/socketService'

export default function Login() {

    const [ username, setUsername ] = useState()

    async function handleLogin() {
        if ( !username.trim() ) return

        setSocketUser( username )
    }

    useEffect( () => {


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