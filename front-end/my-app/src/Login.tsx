import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginFacebook } from './redux/auth/thunk';
import ReactFacebookLogin from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import './scss/Login.scss';
import { IoLogoFacebook } from 'react-icons/io';
import { Link } from 'react-router-dom';




const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // const ResetPlaceholder = () => {
  //   setUsername('');
  //   setPassword('');
  // }

  return <div className="login-content">

    <div className="logo">
      <div className="login-logo">The Nest</div>
      <div className="login-logo-sub">More Than A Cup</div>
    </div>

    <div className="login-description">Sign in and use more features </div>

    

    <form onSubmit={event => {
      event.preventDefault();
      dispatch(login(username, password));
      // ResetPlaceholder();
    }}>

      <div className="login-area">
        <div className="login-username"><input type="text" className="input-login" placeholder="Username" onChange={event => setUsername(event.currentTarget.value)} value={username}></input></div>
        <div className="login-password"><input type="password" className="input-login" placeholder="Password" onChange={event => setPassword(event.currentTarget.value)} value={password}></input></div>
        <Button type="submit" outline color="secondary" className="login-btn">Sign In</Button>
      </div>

    </form>

      <Link className="register" to="/register" >Don't have an account? Sign up</Link>


    {/* line */}
    <div className="line">
      <div className="line-line"></div>
      <div className="line-or">or</div>
      <div className="line-line"></div>
    </div>

    <ReactFacebookLogin
      textButton="Log in with Facebook"
      icon={<IoLogoFacebook className="fb-icon" />}
      cssClass="FB-Login-btn"
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      onClick={() => { }}
      // callback={userInfo => dispatch(loginFacebook(userInfo.accessToken))}
      callback={userInfo => dispatch(null)}
      disableMobileRedirect={true}
    />


  </div>
}



export default (Login);