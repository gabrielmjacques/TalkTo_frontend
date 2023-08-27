import './styles.css'

import { Button } from 'antd'
import { useSelector } from 'react-redux'

export default function Login() {

    const { username } = useSelector( state => state.user )

    return (
        <nav>
            <div className="navLeft">
                <h1>TalkTo</h1>
            </div>

            <div className="navRight">
                <h4>
                    { username ? `Welcome, ${ username }` : 'Not Logged :(' }
                </h4>
            </div>
        </nav>
    )
}