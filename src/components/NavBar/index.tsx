import './styles.scss';

import { Button, Dropdown } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/userSlice';
import { disconnectSocket } from '../../services/socketService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [loginState, setLoginState] = useState(<small>Not Logged In</small>);

    const { username } = useSelector((state: { user: { username: string; }; }) => state.user);

    function handleLogout() {
        dispatch(LOGOUT());
        disconnectSocket();
        navigate('/');
    }

    const items = [
        {
            label: <Button onClick={ () => handleLogout() } type='text' block>Logout</Button>,
            key: '0',
        },
    ];

    useEffect(() => {
        if (username) {
            setLoginState(
                <Dropdown menu={ { items } } placement="bottomRight" trigger={ ['click'] } arrow>
                    <Button type='primary' style={ { backgroundColor: 'transparent' } }>{ username } <CaretDownFilled /></Button>
                </Dropdown>
            );

        } else {
            setLoginState(<small>Not Logged In</small>);
        }
    }, [username]);

    return (
        <nav>
            <div className="navLeft">
                <h1>TalkTo</h1>
            </div>

            <div className="navRight">
                <h4>
                    {
                        loginState
                    }
                </h4>
            </div>
        </nav>
    );
}