import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import Loader from './Loader';

const ChartTripName = (props) => {
  const [graphData, setGraphData] = useState('');
  const [feesCollectedPerDayCountData, setFeesCollectedPerDayCountData] = useState([]);
  const [isLoadVisible, setIsLoadVisible] = useState(false);

  useEffect(() => {

    setIsLoadVisible(true);

    fetch(`${props.hostName}/getPerDayTripName.php?token=${props.token}`)
      .then(resp => resp.json()).then(data => {
       
        if (data.code === 5) {
            // setFeesCollectedPerDayCountData(data.data.reverse());
            setFeesCollectedPerDayCountData(data.data);
            setIsLoadVisible(false);
        }

      }).catch(err => console.log(err));
      

  }, [props.token, props.hostName]);



  useEffect(() => {
    if (feesCollectedPerDayCountData.length !== 0) {
      let data = [];
      let feesCollectionPerDay, day;

    feesCollectedPerDayCountData.forEach((elem, index) => {
        day = parseInt(elem.day);
        feesCollectionPerDay = parseInt(elem.trip_name);

        data[index] = [day, feesCollectionPerDay];
      });


      setGraphData([
        ["Day", "Trip"], ...data
      ]);

    }
  }, [feesCollectedPerDayCountData]);


  return (
    <>
      <Chart className={props.className} chartType="Line" data={graphData}
        height="400px" width='1200px'
        options={{
            title: "Trip Name (per Day)",
            curveType: "function",
            legend: { position: "top" },
            colors: ['#1e88e5','#ff9900'],  
            responsive: true,
            chart: {
                title: 'Trip Name (per Day)',
                subtitle: 'Name of Trips',
                
              }, 
              vAxis: {                
                maxValue:31,
                minValue:1
                
            },      
        }} />

        <Loader isLoadVisible={isLoadVisible}/>
    </>
  )
}

export default ChartTripName;
