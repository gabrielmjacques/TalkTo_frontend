import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space } from 'antd';
import './styles.css';

import { useState } from 'react';
import { connectSocker, getStatus } from '../../services/socketService';

import { messageWarning } from '../../utils/antMessage';
import { useDispatch } from 'react-redux';
import { SET_USERNAME } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState( false );
    const [ username, setUsername ] = useState( '' );

    function dispatchUsername() {
        let trys = 0;

        function verifySocket() {
            if ( trys < 5 ) {
                if ( getStatus() ) {
                    dispatch( SET_USERNAME( username ) );

                } else {
                    trys++;
                    setTimeout( verifySocket, trys * 500 );
                }

            } else {
                messageWarning( 'Error to connect' );
            }
        }

        verifySocket();
        setLoading( false );
    }

    async function handleLogin( e ) {
        e.preventDefault();

        const usernameRegex = /^(?![0-9]{5,20}$)[0-9a-zA-Z]{5,20}$/;

        setLoading( true );
        const isValidUsername = usernameRegex.test( username );

        if ( !isValidUsername ) {
            messageWarning( 'Invalid Username' );
            setLoading( false );
            return;
        }

        const connect = await connectSocker( username );

        if ( !connect.error ) {
            dispatchUsername();
            navigate( '/chat' );

        } else {
            setTimeout( () => {
                setLoading( false );
            }, 1000 );
        }
    }

    return (
        <form className='login' onSubmit={ e => handleLogin( e ) }>
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

                    <Button type="primary" htmlType='submit' block loading={ loading }>Enter</Button>

                </Space>
            </Card>

        </form>
    );
}