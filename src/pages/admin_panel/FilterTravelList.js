import React, { useState } from 'react';

const FilterTravelList = (props) => {
    const [tripName, setTripName] = useState('');
    const [tripStrDate, setTripStrDate] = useState('');
    const [tripEndDate, setTripEndDate] = useState('');
    const [tripStatus, setTripStatus] = useState('');
    const filterBoxHandler = (e) => {
        e.preventDefault();
        const filterData = {
            trip_name: tripName,
            trip_str_date: tripStrDate,
            trip_end_date: tripEndDate,
            trip_status: tripStatus
        }
        props.getFilteredData(filterData);
    }
  return (
    <form className={`filter-box ${props.isVisible ? '' : 'd-none'}`} onSubmit={filterBoxHandler} >
        <h5 className='mb-3 mt-3'>Filter</h5>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="trip-name" placeholder="eg. Sikim" value={tripName} onChange={(e)=>setTripName(e.target.value)}/>
          <label htmlFor="trip-name" className='fs-6'>Trip Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="date" className="form-control" id="trip-str-date" placeholder="eg. 03-06-2024" value={tripStrDate} onChange={(e)=>setTripStrDate(e.target.value)}/>
          <label htmlFor="trip-str-date" className='fs-6'>Trip Start Date</label>
        </div>
        <div className="form-floating mb-3">
          <input type="date" className="form-control" id="trip-end-date" placeholder="eg. 03-06-2024" value={tripEndDate} onChange={(e)=>setTripEndDate(e.target.value)}/>
          <label htmlFor="trip-end-date" className='fs-6'>Trip End Date</label>
        </div>
        
        <div className="form-floating">
          <select className="form-select fs-6" defaultValue={tripStatus} id="floatingSelect" onChange={(e)=>setTripStatus(e.target.value)} >
            <option value={'All'}>All</option>
            <option value={'Ongoing'}>Ongoing</option>
            <option value={'Completed'}>Completed</option>
            <option value={'Cancelled'}>Cancelled</option>
          </select>
          <label htmlFor="floatingSelect">Travel Status</label>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
    </form>
  )
}

export default FilterTravelList