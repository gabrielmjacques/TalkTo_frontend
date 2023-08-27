import './styles.css'

import { Button, Dropdown } from 'antd'
import { CaretDownFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT } from '../../redux/userSlice'
import { disconnectSocket, isConnected } from '../../services/socketService'

export default function Login() {

    const dispatch = useDispatch()

    const [ loginState, setLoginState ] = useState( <small>Not Logged In</small> )

    const { username } = useSelector( state => state.user )

    function handleLogout() {
        dispatch( LOGOUT() )
        disconnectSocket()
    }

    const items = [
        {
            label: <Button onClick={ () => handleLogout() } type='text' block>Logout</Button>,
            key: '0',
        },
    ]

    useEffect( () => {
        if ( isConnected() ) {
            setLoginState(
                <Dropdown menu={ { items } } placement="bottomRight" trigger={ [ 'click' ] } arrow>
                    <Button type='primary' style={ { backgroundColor: 'transparent' } }>{ username } <CaretDownFilled /></Button>
                </Dropdown>
            )

        } else {
            setLoginState( <small>Not Logged In</small> )
        }
    }, [ isConnected() ] )

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
    )
}