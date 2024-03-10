import React, { useState } from 'react';
import './OtpVerify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/admin_components/Loader';

const OtpVerify = (props) => {
  const param = useParams();
  const [enteredOTP, setEnteredOTP] = useState('');
  const [isLoadVisible, setIsLoadVisible] = useState(false);
  const navigate = useNavigate();
  const resendOTP = () => {

  }
  const validateOTP = (e) => {
    e.preventDefault();

    if(enteredOTP.trim() === ''){
      alert("Please Enter OTP");
      return;
    }else if(enteredOTP.length !== 6){
      alert("OTP length must be 6 digits");
      return;
    }

    setIsLoadVisible(true);
    fetch(`${props.hostName}/validateOTP.php`,
    {
      method: "POST",
      body: JSON.stringify({otp: enteredOTP, email: param.email}),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(resp => resp.json()).then(data => {
    
      alert(data.data);
      if(data.code === 5 || data.code === 6){
        navigate(`../user_panel/login`);
      }
      setIsLoadVisible(false);
    }).catch(err => console.log(err));
  }
  return (
    <>
    <div className="container-fluid p-4 min-vh-100" id='OTP-Verify' style={{backgroundImage: 'linear-gradient(to right, #00b4db, #0083b0)'}}>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className="col-12 col-md-6 col-lg-4" style={{maxWidth: '500px'}}>
          <div className="card bg-white mb-5 mt-5 border-0 border" style={{boxShadow: '0 0px 15px rgba(0, 0, 0, 0.2)'}}>
            <form className="card-body p-5 text-center" onSubmit={validateOTP}>
              <h4 className='mb-3'>Email Verify</h4>
              <small className='text-secondary'>Your code was sent to you via email</small>
              <br/>
              <small className='text-secondary'>{param.email}</small>

              <div className="otp-field mb-4 mt-4">
                <input type="number" value={enteredOTP} onChange={(e)=>setEnteredOTP(e.target.value)} autoFocus required />
              </div>

              <button className="btn btn-primary mb-3 px-4" type='submit'>
                Verify
              </button>

              <p className="resend text-muted mb-0">
                Didn't receive code? <span onClick={resendOTP} className='text-primary cursor-pointer'>Request again</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Loader isLoadVisible={isLoadVisible} />
    </>
  )
}

export default OtpVerify