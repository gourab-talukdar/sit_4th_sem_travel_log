import React, { useEffect } from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = (props) => {
    useEffect(()=> {props.setTitle(`Error 404 | Page Not Found | RedSky Educations | Educations for future`)}, [props]);
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-12 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Oops! Look like you're lost
                                </h3>

                                <p>The page you are looking for is not avaible!</p>

                                {/* <a href="" className="link_404">Go to Home</a> */}
                                <Link to='/admin_panel/login' className="link_404">Go to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound
