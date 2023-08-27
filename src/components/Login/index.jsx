import './styles.css'
import { Button, Card, Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { connectSocket, isConnected } from '../../services/socketService'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_USERNAME } from '../../redux/userSlice'

export default function Login() {

    const dispatch = useDispatch()

    const [ username, setUsername ] = useState()

    function handleLogin() {
        if ( !username ) return

        connectSocket( username )
        if ( isConnected() ) dispatch( SET_USERNAME( username ) )
    }

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