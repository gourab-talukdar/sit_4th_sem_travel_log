import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserLogin.css';
import Loader from '../../components/admin_components/Loader';

const UserLogin = (props) => {
  const navigate = useNavigate();
  localStorage.removeItem("user_data_travel");

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [isLoadVisible, setIsLoadVisible] = useState(false);

  useEffect(()=> {props.setTitle("Login | Travel Log ")}, [props]);

  const resetFormField = () => {
    setUserEmail('');
    setUserPassword('');
    setIsShowPassword(true);
  };

  const validateUserHandler = (e) => {
    e.preventDefault();
    if (userEmail === '' && userPassword === '') {
      alert('Please Fill All Fields!');
      return;
    }
    setIsLoadVisible(true);
    fetch(`${props.hostName}/validateUser.php`,
      {
        method: "POST",
        body: JSON.stringify({
          user_email: userEmail,
          user_password: userPassword
        }),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(resp => resp.json()).then(data => {
        if (data.code === 5) {

          const localStorageData = { user_token: data.data.user_token, first_name: data.data.first_name};
          localStorage.setItem('user_data_travel', JSON.stringify(localStorageData));
          navigate('/user_panel/verify/dashboard');
        } else{
          setStatusMsg(data.data);
        }
        setIsLoadVisible(false);
        resetFormField();
      }).catch(err => console.log(err));
  };

  return (
    <>
      <div className="admin-login-form-container">
        <div className="admin-login-form">
          <span className="title">Login</span>

          <form onSubmit={validateUserHandler} >
            <div className="input-field">
              <input type="email" placeholder="Enter email id" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} autoFocus required />
              <span className="material-icons material-symbols-outlined no-user-select">person</span>
            </div>
            <div className="input-field">
              <input type={isShowPassword ? 'password' : 'text'} className="password" placeholder="Enter password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
              <span className="material-icons material-symbols-outlined no-user-select">lock</span>
              {
                (isShowPassword) ?
                  <span className="material-icons material-symbols-outlined showHidePw no-user-select" onClick={() => setIsShowPassword(false)}>visibility</span>
                  :
                  <span className="material-icons material-symbols-outlined showHidePw no-user-select" onClick={() => setIsShowPassword(true)}>visibility_off</span>
              }
            </div>
            {/* <CaptchaBox captchaText={captchaText} enteredCatpcha={[enteredCatpcha, setEnteredCatpcha]} reloadCaptcha={reloadCaptcha} /> */}
            <div className="input-field button">
              <input type="submit" value="Login" id="admin-login-btn"/>
            </div>
            <div className='status-box'>
              <p>{statusMsg}</p>
            </div>
          </form>
          <p className='text-center'>New User? <Link to='../user_panel/sign-up' className='text-primary text-decoration-none'>Create an account</Link></p>
        </div>
      </div>

      <Loader isLoadVisible={isLoadVisible} />
    </>

  )
}

export default UserLogin;
