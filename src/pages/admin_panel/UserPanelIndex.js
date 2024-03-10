import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../../components/admin_components/Dashboard';
import AddNewTrip from './AddNewTrip';
import ModifyTrip from './ModifyTrip';
import AllTrip from './AllTrip';
import RightSection from '../../components/admin_components/RightSection';
import SideNav from '../../components/admin_components/SideNav';
import PageNotFound from './PageNotFound';
import UpcomingTrips from './UpcomingTrips';
import TravelDataFullScreen from './TravelDataFullScreen';


const UserPanelIndex = (props) => {

  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [fname, setFname] = useState('');
  
  useEffect(()=>{
    const isLoggedIn = JSON.parse(localStorage.getItem("user_data_travel"));
    if(isLoggedIn === null){
      navigate('/user_panel/login');
      return;
    }
    setToken(isLoggedIn.user_token);
    setFname(isLoggedIn.first_name);
  },[navigate, token]);

  return (
    <>
    {
      token ?
      
      <div className='admin'>
        <SideNav/>
        <RightSection adminFName={fname}>
         <Routes>
            <Route path='/' element={<Dashboard setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/>
            <Route path='dashboard' element={<Dashboard setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/>

            <Route path='add-new-trip' element={<AddNewTrip setTitle={props.setTitle} hostName={props.hostName} token={token}/>}/>              
            <Route path='update/:id' element={<ModifyTrip setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/>              
            <Route path='all-trips' element={<AllTrip setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/>           
            <Route path='upcoming-trips' element={<UpcomingTrips setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/> 
            <Route path='full-screen/:id' element={<TravelDataFullScreen setTitle={props.setTitle} hostName={props.hostName} token={token}  />}/>        
  
            <Route path='*' element={<PageNotFound setTitle={props.setTitle} />}/>    
          </Routes> 
        </RightSection>
    </div>
    :
    ""
    }
    </>
  )
}

export default UserPanelIndex;