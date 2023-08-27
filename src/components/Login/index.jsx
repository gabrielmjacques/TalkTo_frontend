import './styles.css'
import { Button, Card, Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function Login() {
    return (
        <div className='login'>

            <Card size="default">
                <Space direction="vertical" size="middle">

                    <h1 style={ { textAlign: 'center' } }>Login</h1>

                    <hr />

                    <Input size="large" placeholder="Username" prefix={ <UserOutlined /> } />

                    <hr />

                    <Button type="primary" block>Enter</Button>

                </Space>
            </Card>

        </div>
    )
}