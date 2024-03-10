import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import navLogo from '../../assets/img/travel_logo_nav.png';

const SideNav = (props) => {
    const sideBar = useRef('');
    const toggleLinks = (index) => {
        let allSideBarElem = document.querySelectorAll('.open-able-links');
        allSideBarElem.forEach((elem, indx)=>{

            let nextIcon = elem.querySelector('.next-icon');
            let groupBtn = elem.querySelector('.group');
            let nestedLinks = elem.querySelector('.nested-links');

            if(index === indx){
                elem.classList.toggle('show');
                nextIcon.classList.toggle('rotate');
                groupBtn.classList.toggle('active');
                nestedLinks.classList.toggle('active');
            }else{
                elem.classList.remove('show');
                nextIcon.classList.remove('rotate');
                groupBtn.classList.remove('active');
                nestedLinks.classList.remove('active');
            }
        });
    }
    const closeSideMenu = () => {
        sideBar.current.classList.add("active");
    }
    const sideNaveMenuItemClickhandler = () => {
        closeSideMenu();
    }

    return (
        <div className="sidebar active" ref={sideBar}>
            <div>
                <button className='close-menu-btn' onClick={closeSideMenu}><span className="material-icons material-symbols-outlined">close</span></button>
                <div className="logo-details d-flex align-items-center px-3">
                    {/* <span className="logo_name me-2">RedSky</span>
                    <span class="material-icons material-symbols-outlined fs-3 text-warning" style={{transform:'rotate(45deg)'}}>flight</span> */}
                    <img src={navLogo} style={{width:'68%'}} />
                </div>
                <ul className="nav-links-us">
                    <li>
                        <Link to="./dashboard" onClick={sideNaveMenuItemClickhandler} >
                            <span className="material-icons material-symbols-outlined">dashboard</span>
                            <span className="links_name">Dashboard</span>
                        </Link>
                    </li>
                    <li className='open-able-links'>
                        <span className='group' onClick={() => { toggleLinks(0) }}>
                            <span className="material-icons material-symbols-outlined">calendar_month</span>
                            <span className="links_name">Trip</span>
                            <span className="material-icons material-symbols-outlined next-icon">navigate_next</span>
                        </span>
                        <ul className='nested-links'>
                            <li>
                                <Link to="./add-new-trip" onClick={sideNaveMenuItemClickhandler}>
                                    <span className="material-icons material-symbols-outlined">post_add</span>
                                    <span className="links_name">Add Trip</span>
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="./all-trips" onClick={sideNaveMenuItemClickhandler}>
                                    <span className="material-icons material-symbols-outlined">event_note</span>
                                    <span className="links_name">All Trips</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="./upcoming-trips" onClick={sideNaveMenuItemClickhandler}>
                        <span className="material-icons material-symbols-outlined">upcoming</span>
                            <span className="links_name">Upcoming</span>
                        </Link>
                    </li>


                </ul>

                
            </div>
            <ul className="nav-links-us">
                <li className="log_out">
                    <Link to="/user_panel/login" onClick={sideNaveMenuItemClickhandler}>
                        <span className="material-icons material-symbols-outlined">logout</span>
                        <span className="links_name">Log out</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default SideNav;
