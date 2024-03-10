import React from 'react';
import TopNav from './TopNav';
import './RightSection.css';

const RightSection = (props) => {
  return (
    <section className="right-section">
        <TopNav adminFName={props.adminFName}/>
        <div className="right-section-content">
            {props.children}
        </div>
    </section>
  )
}

export default RightSection
