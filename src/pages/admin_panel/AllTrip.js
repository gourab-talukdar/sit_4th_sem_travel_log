import React, { useEffect, useState } from 'react';
import './AllStudents.css';
import Loader from '../../components/admin_components/Loader';
import { useNavigate } from 'react-router-dom';
import FilterTravelList from './FilterTravelList';

const AllTrip = (props) => {
    const [rowsData, setRowsData] = useState([]);
    const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
    const [isLoadVisible, setIsLoadVisible] = useState(false);
    const navigate = useNavigate();
   
    const fetchAllTravelLog = () => {
      setRowsData([]);
      setIsLoadVisible(true);
      
      fetch(`${props.hostName}/get_all_travel_log.php?token=${props.token}`)
          .then(resp => resp.json()).then(data => {
            if(data.code === 5){
              setRowsData(data.data.travel_data);
            }
            setIsLoadVisible(false);
              
          }).catch(err => console.log(err));
  };

  useEffect(()=> {
    props.setTitle(`All Trip List`); 
    fetchAllTravelLog();
  },[props]);
    
    
  const getFilteredData = (filterObj) => {
    setIsLoadVisible(true);
    setRowsData([]);
    fetch(`${props.hostName}/getFilteredTravelData.php?token=${props.token}`,
    {
        method: "POST",
        body: JSON.stringify(filterObj),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
    .then(resp => resp.json()).then(data => {
          
      if(data.code === 5){
        setRowsData(data.data.travel_data);
      }
      else{
        alert(data.data);
      }
      setIsFilterBoxVisible(false);
      setIsLoadVisible(false);     
    }).catch(err => console.log(err));
  };

      
  const deleteDataHandler = (id) => {
    if(!window.confirm("Want to delete record?"))
      return;
    setIsLoadVisible(true);
        
    //deletion code will go here
    fetch(`${props.hostName}/deleteTravelData.php?token=${props.token}`,
    {
      method: "POST",
      body: JSON.stringify({trip_id: id}),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(resp => resp.json()).then(data => {
      if(data.code === 5){
        fetchAllTravelLog();
      }else{
        alert(data.data);
      }
      setIsLoadVisible(false);
            
    }).catch(err => console.log(err));
  };

  const changeVisibility = (id, flag) => {
    // setIsLoadVisible(true);
    setRowsData([]);
    fetch(`${props.hostName}/changeVisibility.php?token=${props.token}`,
    {
        method: "POST",
        body: JSON.stringify({travel_id: id, flag: flag}),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
    .then(resp => resp.json()).then(data => {
          
      if(data.code === 5){
        
        fetchAllTravelLog();
      }
      else{
        alert(data.data);
      }
      // setIsFilterBoxVisible(false);
      // setIsLoadVisible(false);     
    }).catch(err => console.log(err));
  }
    
    return (
        <>
          <div>
            <div className='d-flex align-items-center justify-content-between mb-3'>
              <h4>Travel Log</h4>
              <span className="material-icons material-symbols-outlined me-4 cursor-pointer no-user-select" onClick={()=>setIsFilterBoxVisible(!isFilterBoxVisible)}>tune</span>
            </div>
            <div style={{position:'relative'}}>
              <FilterTravelList isVisible={isFilterBoxVisible} getFilteredData={getFilteredData} />
            </div>
          </div>
          
          {
            rowsData.length > 0 
            ?
            <div className="table-responsive-md text-center text-nowrap">
              <table className="table table-striped table-bordered">
                <thead className='bg-secondary text-white'>
                  <tr>
                    <th scope="col" className='px-4'>No</th>
                    <th scope="col" className='px-4'>Trip Name</th>
                    <th scope="col" className='px-4'>Start Date</th>
                    <th scope="col" className='px-4'>End Date</th>
                    <th scope="col" className='px-4'>Status</th>
                    <th scope="col" className='px-4'>Action</th>
                  </tr>
                </thead>
                <tbody>
             {
              rowsData.map((item, i) => {
                return(
                    <tr key={i} className='cursor-pointer'>
                      <th scope="row" onClick={()=>navigate(`../full-screen/${item.id}`)} >{i+1}</th>
                      <td onClick={()=>navigate(`../full-screen/${item.id}`)} >{item.name}</td>
                      <td onClick={()=>navigate(`../full-screen/${item.id}`)} >{item.str_time}</td>
                      <td onClick={()=>navigate(`../full-screen/${item.id}`)} >{item.end_date}</td>
                      <td onClick={()=>navigate(`../full-screen/${item.id}`)} ><span className={`travel_status ${item.status}`}>{item.status}</span></td>
                      <td>
                        <div>
                          <span className="material-icons material-symbols-outlined cursor-pointer" title='Edit' onClick={()=>navigate(`../update/${item.id}`)}>edit_calendar</span>
                          <span className="material-icons material-symbols-outlined cursor-pointer mx-2" title='Delete' onClick={()=>deleteDataHandler(item.id)}>delete</span>
                          
                          {
                            parseInt(item.is_public)
                            ?
                            <span className="material-icons material-symbols-outlined cursor-pointer " title='Set as Private' onClick={()=>changeVisibility(item.id, false)}>public</span>
                            :
                            <span className="material-icons material-symbols-outlined cursor-pointer " title='Set as Public' onClick={()=>changeVisibility(item.id, true)}>public_off</span>
                          }
                        </div>
                      </td>
                    </tr>
                );
              })
             } 
                </tbody>
              </table>
            </div>  
            :
            <p className='text-center'>No Travel Log Found</p>
          }
            
          <Loader isLoadVisible={isLoadVisible}/>
        </>
    );
};

export default AllTrip;
