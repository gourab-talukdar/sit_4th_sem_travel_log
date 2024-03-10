import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/img/hero_bg.png';

import './Home.css';
import HomeNav from './HomeNav';


const Home = (props) => {
  
  localStorage.removeItem("admin_data_redsky");
  const [isLoadVisible, setIsLoadVisible] = useState('');
  

  useEffect(() => {
    props.setTitle("Travel Log | Travel in Sky");
    const onPageLoad = () => {
      setIsLoadVisible('d-none');
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [props]);

  return (
    <div>
      {/* <!-- ***** Preloader Start ***** --> */}
      <div  className={`preloader ${isLoadVisible}`}>
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* <!-- ***** Preloader End ***** --> */}

      {/* <!-- ***** Header Area Start ***** --> */}
      <HomeNav active={1} />
      {/* <!-- ***** Header Area End ***** --> */}

      <div className="main-banner wow fadeIn" id="top" style={{paddingTop:'160px'}} data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center hero-text-container">
                  <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <h6>Welcome to Let's Travel</h6>
                    <h2>Capture Your <em>Journey</em> &amp; <span>Create</span> Memories</h2>
                    <p>Let's Memories Your Journeys with Let's Travel!</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img src={heroBg} alt="team meeting" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="about" className="about-us section">
        <h2 className='section-heading white'>Course In Demand</h2>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <img src="./external/assets/images/about-left-image.png" alt="person graphic" />
              </div>
            </div>
            <div className="col-lg-8 align-self-center">
              <div className="services">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                      <div className="icon">
                        <img src="./external/assets/images/service-icon-01.png" alt="reporting" />
                      </div>
                      <div className="right-text">
                        <h4>Computer Application</h4>
                        <p>Enroll in a computer application course to boost your digital skills</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                      <div className="icon">
                        <img src="./external/assets/images/service-icon-02.png" alt="" />
                      </div>
                      <div className="right-text">
                        <h4>Financial Accounting</h4>
                        <p>Master the language of business finances with us</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                      <div className="icon">
                        <img src="./external/assets/images/service-icon-03.png" alt="" />
                      </div>
                      <div className="right-text">
                        <h4>Basic Computer Course for Kids</h4>
                        <p>A fun and educational course for kids</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                      <div className="icon">
                        <img src="./external/assets/images/service-icon-04.png" alt="" />
                      </div>
                      <div className="right-text">
                        <h4>Competitive Exams</h4>
                        <p>Comprehensive Competitive Exams Course for Success</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div id="services" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center  wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
              <div className="left-image">
                <img src="./external/assets/images/services-left-image.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
              <div className="section-heading">
                <h2>Grow your website with our <em>SEO</em> service &amp; <span>Project</span> Ideas</h2>
                <p>Space Dynamic HTML5 template is free to use for your website projects. However, you are not permitted to redistribute the template ZIP file on any CSS template collection websites. Please contact us for more information. Thank you for your kind cooperation.</p>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="first-bar progress-skill-bar">
                    <h4>Website Analysis</h4>
                    <span>84%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="second-bar progress-skill-bar">
                    <h4>SEO Reports</h4>
                    <span>88%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="third-bar progress-skill-bar">
                    <h4>Page Optimizations</h4>
                    <span>94%</span>
                    <div className="filled-bar"></div>
                    <div className="full-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading  wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <h2>See What Our Agency <em>Offers</em> &amp; What We <span>Provide</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <Link to=''>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                  <div className="hidden-content">
                    <h4>SEO Analysis</h4>
                    <p>Lorem ipsum dolor sit ameti ctetur aoi adipiscing eto.</p>
                  </div>
                  <div className="showed-content">
                    <img src="./external/assets/images/portfolio-image.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Link to=''>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.4s">
                  <div className="hidden-content">
                    <h4>Website Reporting</h4>
                    <p>Lorem ipsum dolor sit ameti ctetur aoi adipiscing eto.</p>
                  </div>
                  <div className="showed-content">
                    <img src="./external/assets/images/portfolio-image.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Link to=''>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
                  <div className="hidden-content">
                    <h4>Performance Tests</h4>
                    <p>Lorem ipsum dolor sit ameti ctetur aoi adipiscing eto.</p>
                  </div>
                  <div className="showed-content">
                    <img src="./external/assets/images/portfolio-image.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Link to=''>
                <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.6s">
                  <div className="hidden-content">
                    <h4>Data Analysis</h4>
                    <p>Lorem ipsum dolor sit ameti ctetur aoi adipiscing eto.</p>
                  </div>
                  <div className="showed-content">
                    <img src="./external/assets/images/portfolio-image.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div id="blog" className="our-blog section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="section-heading">
                <h2>Check Out What Is <em>Trending</em> In Our Latest <span>News</span></h2>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="top-dec">
                <img src="./external/assets/images/blog-dec.png" alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="left-image">
                <Link to=''><img src="./external/assets/images/big-blog-thumb.jpg" alt="Workspace Desktop" /></Link>
                <div className="info">
                  <div className="inner-content">
                    <ul>
                      <li><i className="fa fa-calendar"></i> 24 Mar 2021</li>
                      <li><i className="fa fa-users"></i> TemplateMo</li>
                      <li><i className="fa fa-folder"></i> Branding</li>
                    </ul>
                    <Link to=''><h4>SEO Agency &amp; Digital Marketing</h4></Link>
                    <p>Lorem ipsum dolor sit amet, consectetur and sed doer ket eismod tempor incididunt ut labore et dolore magna...</p>
                    <div className="main-blue-button">
                      <Link to=''>Discover More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.25s">
              <div className="right-list">
                <ul>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 18 Mar 2021</span>
                      <Link to=''><h4>New Websites &amp; Backlinks</h4></Link>
                      <p>Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...</p>
                    </div>
                    <div className="right-image">
                      <Link to=''><img src="./external/assets/images/blog-thumb-01.jpg" alt="" /></Link>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 14 Mar 2021</span>
                      <Link to=''><h4>SEO Analysis &amp; Content Ideas</h4></Link>
                      <p>Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...</p>
                    </div>
                    <div className="right-image">
                      <Link to=''><img src="./external/assets/images/blog-thumb-01.jpg" alt="" /></Link>
                    </div>
                  </li>
                  <li>
                    <div className="left-content align-self-center">
                      <span><i className="fa fa-calendar"></i> 06 Mar 2021</span>
                      <Link to=''><h4>SEO Tips &amp; Digital Marketing</h4></Link>
                      <p>Lorem ipsum dolor sit amsecteturii and sed doer ket eismod...</p>
                    </div>
                    <div className="right-image">
                      <Link to=''><img src="./external/assets/images/blog-thumb-01.jpg" alt="" /></Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <div className="section-heading">
                <h2>Feel Free To Send Us a Message About Your Concern</h2>
                <p>Please go ahead and share your concern or question. Our team will try best to assist you</p>
                <div className="phone-info">
                  <h4 className='d-flex align-items-center'>For any enquiry, Call Us: 
                    <span className='d-flex align-items-center'>
                      <span className='material-icons material-symbols-outlined call-icons'>call</span> 
                      <Link to='tel:+91 7001634925'>7001634925</Link>
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="name" name="name" id="name" placeholder="Name" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="surname" name="surname" id="surname" placeholder="Surname" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email" required="" />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" type="text" className="form-control" id="message" placeholder="Message" required=""></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button ">Send Message</button>
                    </fieldset>
                  </div>
                </div>
                <div className="contact-dec">
                  <img src="./external/assets/images/contact-decoration.png" alt="" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.25s">
              <p>© Copyright @ {new Date().getFullYear()} Let's Travel All Rights Reserved.

                <br />Design & Developed By <Link rel="nofollow noreferrer" target='_blank' to="https://www.gourab.online/">Gourab Talukdar</Link></p>
            </div>
          </div>
        </div>
      </footer>
      {/* <h2>Home</h2>
      <Link to='./faq'>FAQ</Link>
      <br />
      <Link to='./student_panel'>Student</Link>
      <br />
      <Link to='./admin_panel'>Admin</Link> */}
    </div>
  )
}

export default Home;
