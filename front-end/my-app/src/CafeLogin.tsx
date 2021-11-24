import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cafeLogin } from './redux/auth/thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import'./scss/Cafe.scss'

const CafeLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return <div>

        <div className="formContent">
        <form onSubmit={event => {
            event.preventDefault();
            dispatch(cafeLogin(username, password))
        }}>

            <p><input type="text" placeholder="Username" onChange={event => setUsername(event.currentTarget.value)} value={username}></input></p>
            <p><input type="password" placeholder="Password" onChange={event => setPassword(event.currentTarget.value)} value={password}></input></p>
            <Button type="submit" className="adminLogin">Sign In</Button>

        </form>
        </div>
    </div>
}




export default CafeLogin;