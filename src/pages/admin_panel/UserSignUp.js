import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/admin_components/Loader';

const UserSignUp = (props) => {
  const [newEmail, setNewEmail] = useState('');
  const [newFName, setNewFName] = useState('');
  const [newLName, setNewLName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [isLoadVisible, setIsLoadVisible] = useState(false);
  const navigate = useNavigate();

  const signUpFormHandler = (e) => {
    e.preventDefault();
    if(newEmail.trim() === '' || newFName.trim() === '' || newLName.trim() === '' || newPassword.trim() === '' || newConfirmPassword.trim() === '' ){
      alert("Please Fill out all the fields");
      return;
    }

    if(newPassword !== newConfirmPassword){
      alert("Confirm Password Must be Same");
      return;
    }
    
    console.log(JSON.stringify({u_email: newEmail, u_fname: newFName, u_lname: newFName, u_pass: newPassword, u_cpass: newConfirmPassword}));
    setIsLoadVisible(true);
    fetch(`${props.hostName}/signup.php`,
    {
      method: "POST",
      body: JSON.stringify({u_email: newEmail, u_fname: newFName, u_lname: newFName, u_pass: newPassword, u_cpass: newConfirmPassword}),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(resp => resp.json()).then(data => {
    
      if(data.code === 5){
        navigate(`../user_panel/otp-validate/${newEmail}`);
      }else if(data.code === 6){
        alert(data.data);
        navigate('../user_panel/login');
      }else{
        alert(data.data);
      }
      setIsLoadVisible(false);
    }).catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 container-fluid' style={{backgroundImage: 'linear-gradient(to right, #00b4db, #0083b0)'}}>
      <form className='bg-white border border-2 rounded p-4 px-5 w-100' style={{maxWidth: '800px'}} onSubmit={signUpFormHandler}>
        <h4 className='mb-4 mt-3 text-center'>Sign Up</h4>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" placeholder="name@example.com" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} required/>
          <label htmlFor="email">Email address</label>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="fname" placeholder="Gourab"  value={newFName} onChange={(e)=>setNewFName(e.target.value)} required/>
              <label htmlFor="fname">First Name</label>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="lname" placeholder="Saha"  value={newLName} onChange={(e)=>setNewLName(e.target.value)} required/>
              <label htmlFor="lname">Last Name</label>
            </div>
          </div>

        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="npass" placeholder="Password"  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
              <label htmlFor="npass">New Password</label>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="cnpass" placeholder="Password"  value={newConfirmPassword} onChange={(e)=>setNewConfirmPassword(e.target.value)} required/>
              <label htmlFor="cnpass">Confirm Password</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn my-primary-btn mt-4 mb-3 px-4 py-2 w-100">Sign Up</button>

        <p className='text-center'>Already have an Account? <Link to='../user_panel/login' className='text-primary text-decoration-none'>Log In</Link></p>
      </form>

      <Loader isLoadVisible={isLoadVisible}/>
    </div>
  )
}

export default UserSignUp