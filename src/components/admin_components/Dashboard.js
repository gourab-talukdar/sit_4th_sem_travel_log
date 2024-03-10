import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChartTripCount from './ChartTripCount';
import Loader from './Loader';
import './Dashboard.css';

const Dashboard = (props) => {
    const [totalNoOfTrip, setTotalNoOfTrip] = useState(0);
    const [totalLatestTrip, setTotalLatestTrip] = useState(0);
    const [upcomingTrip, setUpcomingTrip] = useState(0);
    const [totalCancelledTrip, setTotalCancelledTrip] = useState(0);
    const [isLoadVisible, setIsLoadVisible] = useState(false);

    useEffect(()=> {props.setTitle("DashBoard | Admin Panel | RedSky Educations | Educations for future")}, [props]);

    useEffect(()=>{
        setIsLoadVisible(true);
        fetch(`${props.hostName}/getAllTripCount.php?token=${props.token}`)
        .then(resp => resp.json()).then(data => {
            if (data.code === 5) {
                setTotalNoOfTrip(data.data.total_travel_count);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    },[props.token,props.hostName]);

    useEffect(()=>{
        setIsLoadVisible(true);
        fetch(`${props.hostName}/getLetestTripCount.php?token=${props.token}`)
        .then(resp => resp.json()).then(data => {
            if (data.code === 5) {
                setTotalLatestTrip(data.data.total_travel_count);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    },[props.token,props.hostName]);

    useEffect(()=>{
        setIsLoadVisible(true);
        fetch(`${props.hostName}/getUpcomingTrip.php?token=${props.token}`)
        .then(resp => resp.json()).then(data => {
            
            if (data.code === 5) {
                setUpcomingTrip(data.data.total_travel_count);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    },[props.token,props.hostName]);

    useEffect(()=>{
        setIsLoadVisible(true);
        fetch(`${props.hostName}/getCancelledTrip.php?token=${props.token}`)
        .then(resp => resp.json()).then(data => {
            if (data.code === 5) {
                setTotalCancelledTrip(data.data.total_travel_count);
            }
            setIsLoadVisible(false);

        }).catch(err => console.log(err));
    },[props.token,props.hostName]);


    return (
        <>
    <section className="dashboard-container">
        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <span className="material-icons material-symbols-outlined">speed</span>
                    <span className="text">Overview</span>
                </div>

                <div className="boxes">
                    <Link className="box box1 text-decoration-none" to='../all-trips'>
                        <span className="material-icons material-symbols-outlined">flight</span>
                        <span className="text">All Trips</span>
                        <span className="number">{totalNoOfTrip}</span>
                        <span className="sub-text">Life Time</span>
                    </Link>
                    <div className="box box2">
                        <span className="material-icons material-symbols-outlined">luggage</span>
                        <span className="text">Latest Trip</span>
                        <span className="number">{totalLatestTrip}</span>
                        <span className="sub-text">This Month</span>
                    </div>
                    <Link className="box box3 text-decoration-none" to='../upcoming-trips'>
                        <span className="material-icons material-symbols-outlined">all_inclusive</span>
                        <span className="text">Upcoming</span>
                        <span className="number">{upcomingTrip}</span>
                        <span className="sub-text">Next Trips</span>
                    </Link>
                    <div className="box box4">
                        <span className="material-icons material-symbols-outlined">event_busy</span>
                        <span className="text">Cancelled</span>
                        <span className="number">{totalCancelledTrip}</span>
                        <span className="sub-text">All Time</span>
                    </div>
                </div>
            </div>

            <div className='chart-container'>
                <ChartTripCount className='charts'  hostName={props.hostName} token={props.token} />
            </div>
            
        </div>
    </section>
    <Loader isLoadVisible={isLoadVisible} />
    </>
    )
};

export default Dashboard;