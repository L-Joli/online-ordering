import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFacebook, registerAccount } from './redux/auth/thunk';
import ReactFacebookLogin from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import './scss/Login.scss';
import { IoLogoFacebook } from 'react-icons/io';
import { Link } from 'react-router-dom';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if(username===""){
      alert("Please enter your username");
    }
    else if (password.length<8) {
       alert("Password should at least eight letter");
    } else if(password !== CPassword){
       alert("Passwords are not matched")
    }else{
      dispatch(registerAccount(username, CPassword))
    }
  }

  return <div className="login-content">

    <div className="logo">
      <div className="login-logo">The Nest</div>
      <div className="login-logo-sub">More Than A Cup</div>
    </div>

    <div className="login-description">Sign up and use more features </div>



    <form onSubmit={event => {
      event.preventDefault();
      handleSubmit();
    }}>

      <div className="login-area">
        <div className="login-username"><input type="text" className="input-login" placeholder="Username" onChange={event => setUsername(event.currentTarget.value)} value={username}></input></div>
        <div className="login-password"><input type="password" className="input-login" placeholder="Password" onChange={event => setPassword(event.currentTarget.value)} value={password}></input></div>
        <div className="login-password"><input type="password" className="input-login" placeholder="Confirm Password"
          onChange={event => setCPassword(event.currentTarget.value)} value={CPassword}></input></div>
        <Button type="submit" outline color="secondary" className="login-btn">Sign up</Button>
      </div>

    </form>


    <Link className="register" to="/login" >Already have an account? Sign in</Link>




    {/* line */}
    <div className="line">
      <div className="line-line"></div>
      <div className="line-or">or</div>
      <div className="line-line"></div>
    </div>

    <ReactFacebookLogin
      textButton="Sign up with Facebook"
      icon={<IoLogoFacebook className="fb-icon" />}
      cssClass="FB-Login-btn"
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      onClick={() => { }}
      // callback={userInfo => dispatch(loginFacebook(userInfo.accessToken))}
      callback={userInfo => dispatch(null)}
    />


  </div>
}




export default Register;