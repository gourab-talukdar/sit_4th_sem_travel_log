import React, { useEffect, useState } from 'react';
import './UpcomingTrips.css';
import Loader from '../../components/admin_components/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const TravelDataFullScreen = (props) => {
    const colors = ['primary', 'warning', 'success', 'danger', 'info'];
    const [upcomingData, setUpcomingData] = useState([]);
    const [isLoadVisible, setIsLoadVisible] = useState(false);
    const navigate = useNavigate();
    const param = useParams();

    const fetchFullScreenData = () => {
        setUpcomingData([]);
        setIsLoadVisible(true);
        
        fetch(`${props.hostName}/getSingleTravelData.php?token=${props.token}`,
        {
            method: "POST",
            body: JSON.stringify({travel_id: param.id}),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
            .then(resp => resp.json()).then(data => {
              if(data.code === 5){
                setUpcomingData([data.data.travel_data]);
              }
              else{
                alert(data.data);
              }
              setIsLoadVisible(false);
                
            }).catch(err => console.log(err));
    };
    useEffect(()=> {
        fetchFullScreenData();
    },[]);
  return (
    <>
    <div className='container-fluid'>
        {
            upcomingData.map((item, i)=>{
                return(
                    <div className='row mb-3' key={i}>
                        <div className='col-12'>
                            <div className="card">
                                <div className={`card-header px-4 py-3 bg-${colors[i % colors.length]}-subtle d-flex align-items-center`}>
                                <span className="material-icons material-symbols-outlined">flight</span>
                                <span className='fw-medium ms-1'>Trip {i+1}</span>
                                </div>
                                <div className="card-body p-4">
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5 className="card-title">{item.name}</h5>
                                        <div className='d-flex align-items-center'>
                                            <span className={`me-4 travel_status  ${item.status}`}>{item.status}</span>
                                            <span className="material-icons material-symbols-outlined cursor-pointer" title='Edit' onClick={()=>navigate(`../update/${item.id}`)}>edit_calendar</span>
                                        </div>
                                    </div>
                                    <p className="card-text">{item.description}</p>
                                    <div className='upcoming-box'>
                                        <p className='path-circle start'>{item.str_date}<small>{item.str_month}</small></p>
                                        <p className='path-circle end'>{item.end_date}<small>{item.end_month}</small></p>
                                        
                                    </div>
                                    
                                    <label className='mb-2 fw-medium'>Per Day Plan:</label>
                                    <table className="table table-bordered track_tbl text-center">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Day</th>
                                                <th>Date</th>
                                                <th>Place Name</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                JSON.parse(item.plan_info).map((elem, j)=>{
                                                    let date = new Date(new Date(item.str_time).setDate(new Date(item.str_time).getDate() + j));
                                                    return(
                                                        <tr style={{'--brd-color':`var(--bs-${colors[j%colors.length]})`}} key={j}>
                                                            <td className="track_dot" >
                                                                <span className="track_line"></span>
                                                            </td>
                                                            <td>{j+1}</td>
                                                            <td>{`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`}</td>
                                                            <td>
                                                                {elem.place}
                                                            </td>
                                                            <td>
                                                                ₹{elem.amount} / person
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
    <Loader isLoadVisible={isLoadVisible} />
    </>
  )
}

export default TravelDataFullScreen