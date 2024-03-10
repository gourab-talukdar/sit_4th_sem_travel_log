import React, { useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import Loader from '../components/admin_components/Loader';
import './Discover.css';

const Discover = (props) => {
    const colors = ['primary', 'danger', 'warning', 'success', 'info'];
    const [isLoadVisible, setIsLoadVisible] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        setIsLoadVisible(true);
        fetch(`${props.hostName}/getDiscoverData.php`)
        .then(resp => resp.json()).then(data => {
    
            if (data.code === 5) {
                setRowData(data.data.discover_data);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    },[props.token,props.hostName]);

    const fetchSearchDiscover = (e) => {
        e.preventDefault();
        setIsLoadVisible(true);
        setRowData([]);
        fetch(`${props.hostName}/getDiscoverSearchData.php?q=${search}`)
        .then(resp => resp.json()).then(data => {
    
            if (data.code === 5) {
                setRowData(data.data.discover_data);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    }
  return (
    <>
    {/* <!-- ***** Header Area Start ***** --> */}
      <HomeNav active={2} />
      {/* <!-- ***** Header Area End ***** --> */}

      <div className='container-fluid px-4 py-4' style={{marginTop:'100px'}}>
        <div className='row mb-3'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
                <h4>Let's Discover</h4>
                <form className="d-flex" role="search" onSubmit={fetchSearchDiscover}>
                    <input className="form-control me-2 shadow-sm border-2 py-2" type="search" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </div>
        </div>
        {
        rowData.length ?
        
        <div className='row'>
            {
                rowData.map((item, i) => {
                    return(
                        <div className='col-md-6 mb-3' key={i}>
                            <div className="card">
                                <div className={`card-header d-flex align-items-center justify-content-between bg-${colors[i % colors.length]}-subtle`}>
                                    <span>Discover {i+1}</span>
                                    <div className='d-flex align-items-center me-2'>
                                        <span className="material-icons material-symbols-outlined text-secondary cursor-pointer me-1 ">favorite_border</span>
                                        <small>{100%(i+15)}</small>
                                    </div>
                                </div>
                                <div className="card-body h-100">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    
                                    <div className="d-flex gap-1 mt-3 justify-content-between align-items-center">
                                        <a className={`btn btn-outline-${colors[i % colors.length]}`} data-bs-toggle="collapse" href={`#multiCollapseExample${i}`} role="button" aria-expanded="false" aria-controls={`multiCollapseExample${i}`} style={{fontSize:'12px'}}>More</a>
                                        <div className='text-warning' style={{marginBottom:'-1rem'}}>
                                            <span className="material-icons material-icons-outlined">star</span>
                                            <span className="material-icons material-icons-outlined">star</span>
                                            <span className="material-icons material-icons-outlined">star</span>
                                            <span className="material-icons material-icons-outlined">star_half</span>
                                            <span className="material-icons material-icons-outlined">star_outline</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="collapse multi-collapse " id={`multiCollapseExample${i}`}>
                                            <div className="card card-body">
                                                <ul className='discover-all-track'>
                                                {
                                                    JSON.parse(item.plan_info).map((data, j) => {
                                                        return(
                                                            <li key={j} style={{'--brd-color':`var(--bs-${colors[j%colors.length]})`}}>
                                                                <div className='d-flex align-items-center'>
                                                                    <span className='track_dot'></span>
                                                                    <span className='text'><small className='text-secondary'>Day {j+1}</small> : <span className='fw-medium'>{data.place}</span></span>
                                                                </div>
                                                                <span><span className='fw-medium text-secondary'>₹{data.amount}.00</span> <small>Per Person</small></span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                    
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer text-body-secondary d-flex align-items-center">
                                    <span className="material-icons material-icons-outlined me-2">update</span>
                                    <span>{item.date_time} days ago</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
        :
        <p className='text-center'>No Post Found</p>
        }
      </div>
      <Loader isLoadVisible={isLoadVisible} />
    </>
  )
}

export default Discover