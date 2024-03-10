import React, { useState } from 'react';
import './Loader.css';
import './AddTravelTable.css';
// import UploadStudentImage from './UploadStudentImage';
import AddTripTable from './AddTripTable';
let tableData = [];

const AddNewTripForm = (props) => {
  const [tripName, setTripName] = useState('');
  const [tripDesc, setTripDesc] = useState('');
  const [tripStrDate, setTripStrDate] = useState('');
  const [tripEndDate, setTripEndDate] = useState('');
  const colors = ['success', 'danger', 'primary', 'warning', 'info'];
 
  const resetTableData = () => {
    tableData = [];
  }
  const formValidate = (e) => {
    e.preventDefault();
    if (tripName.trim() === '' ||  tripStrDate.trim() === '' || tripEndDate.trim() === '' ) {
      alert("Please Enter All Data");
      return;
    }
    let formData = {
      trip_name: tripName,
      trip_desc: tripDesc,
      trip_start_date: tripStrDate,
      trip_end_date: tripEndDate,
      trip_plan_info: tableData
    };
    props.getFormData(formData);
  }

  return (
      <section className='bg-white p-4'>
        <form action='#' onSubmit={formValidate}>
          <header>
            <h4 className='text-center mt-3'>Add New Trip</h4>
          </header>
          <div className="form-floating mb-3 mt-4">
            <input type="text" className="form-control" id="trip-name" placeholder="My First Darjeeling Tour" value={tripName} onChange={(e)=>setTripName(e.target.value)} required autoFocus/>
            <label htmlFor="trip-name">Enter Trip Name<span className='text-danger'>*</span></label>
          </div>
          <div className="form-floating mb-3">
            <textarea className="form-control" placeholder="Leave a description here" id="trip-desc" style={{height: "100px"}} value={tripDesc} onChange={(e)=>setTripDesc(e.target.value)}></textarea>
            <label htmlFor="trip-desc">Enter Trip Description</label>
          </div>
          <div className='row'>
            <div className="mb-3 col-md-6">
              <label htmlFor="trip-str-date" className="form-label">Start Date<span className='text-danger'>*</span></label>
              <input type="date" className="form-control py-2" id="trip-str-date" aria-describedby="trip-str-date" value={tripStrDate} onChange={(e)=>{setTripStrDate(e.target.value); resetTableData()}} max={tripEndDate} required/>
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="trip-end-date" className="form-label">End Date<span className='text-danger'>*</span></label>
              <input type="date" className="form-control py-2" id="trip-end-date" aria-describedby="trip-end-date" value={tripEndDate} onChange={(e)=>{setTripEndDate(e.target.value); resetTableData()}} min={tripStrDate} required/>
            </div>
          </div>
          
          {
            (tripEndDate && tripStrDate && tripStrDate <= tripEndDate)
            ?
          <>          
          <label className='mb-2'>Per Day Plan</label>
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
                  [...Array(Math.ceil( (new Date(tripEndDate) - new Date(tripStrDate)) / (1000 * 60 * 60 * 24) )+1)].map((item, i)=>{
                    let date = new Date(new Date(tripStrDate).setDate(new Date(tripStrDate).getDate() + i));
                    if(i+1 > tableData.length)
                        tableData = [...tableData, {place : '', amount : ''}];
                      
                    return(
                      <AddTripTable date={date} colors={colors} i={i} key={i} tableData={tableData} />
                    )
                  })
                }
                  
              </tbody>
          </table>
          </>
          :
          ''
          }
    
          {/* <UploadStudentImage stu_id={props.nextStuId} isModifyForm={undefined} setLoaderClasses={props.setLoaderClasses} hostName={props.hostName} token={props.token} /> */}
          <button type="submit" className="btn btn-primary mt-3">Add New</button>
        </form>
      </section>
  )
}

export default AddNewTripForm;
