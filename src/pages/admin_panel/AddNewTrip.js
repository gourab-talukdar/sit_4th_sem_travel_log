import React, { useState, useEffect } from 'react';
import AddNewTripForm from '../../components/admin_components/AddNewTripForm';
import Loader from '../../components/admin_components/Loader';
import { useNavigate } from 'react-router-dom';


const AddNewTrip = (props) => {
  const [isLoadVisible, setIsLoadVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=> {props.setTitle(`Add New Trip | Travel Log App`)}, [props]);

  const getFormData = (formData) => {

    setIsLoadVisible(true);
    fetch(`${props.hostName}/add_travel_data.php?token=${props.token}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(resp => resp.json()).then(data => {
  
        if(data.code === 5){
          alert(data.data);
          navigate('../all-trips');
        }else{
          alert(data.data);
        }
        setIsLoadVisible(false);
      }).catch(err => console.log(err));
  };


  return (
    <>
      <AddNewTripForm getFormData={getFormData} />
      <Loader isLoadVisible={isLoadVisible} />
    </>
  );
};

export default AddNewTrip;
