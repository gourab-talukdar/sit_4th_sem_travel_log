import React from 'react';
import './Loader.css';

//loader-container
const Loader = (props) => {
  return (
    <div className={`loader-container ${props.isLoadVisible ? '' : 'd-none'} `}>
        <div className="box">
          <div className="circle-container">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
          <br/>
          <span>Loading</span>
        </div>
      </div>
  )
}

export default Loader;
