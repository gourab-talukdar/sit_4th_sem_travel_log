import React from 'react';
import './TopNav.css';
import { Link } from 'react-router-dom';

const TopNav = (props) => {
  const toggleNavigation = () => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
  };
  return (
    <nav id="top-nav">
      <div className='sidebar-button-container'>
        <div className="sidebar-button">
          <span className="material-icons material-symbols-outlined" id="sidebar-menu-btn" onClick={toggleNavigation}>menu</span>
        </div>
      </div>

      <div className='profile-details-container'>
        <div className="profile-details">
          <span className="material-icons material-symbols-outlined">account_circle</span>
          <span className="admin_name">{props.adminFName}</span>
        </div>

        <abbr title="Log Out">
          <Link to='/user_panel/login' className="logout-btn">
            <span className="material-icons material-symbols-outlined">power_settings_new</span>
          </Link>
        </abbr>
      </div>

    </nav>
  )
}

export default TopNav;