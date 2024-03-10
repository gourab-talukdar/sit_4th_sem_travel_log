import React, { useState, useEffect } from 'react';
import ModifyTripForm from '../../components/admin_components/ModifyTripForm';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/admin_components/Loader';

const ModifyTrip = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isLoadVisible, setIsLoadVisible] = useState(false);
  const [travelData, setTravelData] = useState({name: "", description: "", str_time: "", end_date: "", status: "", plan_info:'[{"place":"","amount":""}]'});

  const getSearchData = () => {
    setIsLoadVisible(true);
    fetch(`${props.hostName}/getSingleTravelData.php?token=${props.token}`,
    {
      method: "POST",
      body: JSON.stringify({travel_id: param.id}),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(resp => resp.json()).then(data => {
        
        if(data.code === 5){
          setTravelData(data.data.travel_data);
        }else{
          alert(data.data);
          navigate('../all-trips');
        }
        setIsLoadVisible(false);
        
      }).catch(err => console.log(err));
    };

    useEffect(()=> {
      props.setTitle(`Modify Travel Data`);
      getSearchData();
    }, [props]);

  const getFormData = (formData) => {
    setIsLoadVisible(true);

    fetch(`${props.hostName}/modifyTravelData.php?token=${props.token}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(resp => resp.json()).then(data => {
        
        if(data.code === 5){
          navigate('../all-trips');
        }else{
          alert(data.data);
        }
        setIsLoadVisible(false);
      }).catch(err => console.log(err));
  };

  return (
    <>
      <ModifyTripForm travelData={travelData} getFormData={getFormData} />
      <Loader isLoadVisible={isLoadVisible} />
    </>
  )
}

export default ModifyTrip
