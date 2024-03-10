import React, { useRef } from 'react';
import Logo from '../assets/img/travel_logo.png';
import { Link } from 'react-router-dom';

const HomeNav = (props) => {
    const menuBtn = useRef('');
  const navBar = useRef('');

  const menuBtnClickhandler = () => {
    menuBtn.current.classList.toggle('active');
    navBar.current.classList.toggle('d-block');
  };
  return (
    <header className="header-area header-sticky wow slideInDown border-bottom px-3" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* <!-- ***** Logo Start ***** --> */}
                <Link to="./" className="logo">
                  {/* <h4>Red<span>Sky</span> </h4> */}
                  <img src={Logo} style={{width: '180px'}} />
                </Link>
                {/* <!-- ***** Logo End ***** --> */}
                {/* <!-- ***** Menu Start ***** --> */}
                <ul className='nav' ref={navBar} >
                  <li className="scroll-to-section"><Link to="/" className={props.active === 1 ? 'active' : ''}>Home</Link></li>
                  <li className="scroll-to-section"><Link to="/discover" className={props.active === 2 ? 'active' : ''}>Discover</Link></li>
                  <li className="scroll-to-section"><Link to='/user_panel/login'>Login</Link></li>
                  
                  <li className="scroll-to-section">
                    <Link to={'/user_panel/sign-up'} type="button" className="btn btn-danger" >Sign Up</Link>
                  </li>
                </ul>
                <button className='menu-trigger' onClick={menuBtnClickhandler} ref={menuBtn}>
                  <span>Menu</span>
                </button>
                {/* <!-- ***** Menu End ***** --> */}
              </nav>
            </div>
          </div>
        </div>
      </header>
  )
}

export default HomeNav