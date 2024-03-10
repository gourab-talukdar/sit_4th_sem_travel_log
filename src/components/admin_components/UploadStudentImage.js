import React, { useEffect, useRef, useState } from 'react';
import './UploadStudentImage.css';
import axios from "axios";
import Camera from './Camera';

const UploadStudentImage = (props) => {
  const [isCamerashow, setIsCameraShow] = useState(false);
  const[profileImage, setProfileImage]= useState('');
  const [isModifyForm, setIsModifyForm ] = useState(props.isModifyForm);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [isCapturedImage, setIsCapturedImage] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const fileInput = useRef();

  useEffect(()=>{
    if(isModifyForm){
      //fetching image
      setBaseImage('');
      props.setLoaderClasses('loader-container');
      fetch(`${props.hostName}/redsky_api/upload/get_student_image.php?token=${props.token}`,
        {
          method: "POST",
          body: JSON.stringify({stu_id: props.stu_id}),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
      })
        .then(resp => resp.json()).then(data => {
          if(data.code === 5){
            setBaseImage(data.data.file_name);
          }
          props.setLoaderClasses('loader-container d-none');
        }).catch(err => console.log(err));
    }
  },[isModifyForm, props.setLoaderClasses, props.hostName, props.token, props.stu_id]);

  const chooseImage = async (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };
    
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // for choose image upload  
  const uploadImage = async(formData)=>{
    props.setLoaderClasses('loader-container');
    const responce= await axios.post(`${props.hostName}/redsky_api/upload/upload_image.php?token=${props.token}`, formData, {
      headers:{'Content-Type':"multipart/form-data"},
    });
        
    if(responce.data.status){
      if(responce.data.code === 5){
        setIsImgUploaded(true);
        props.setLoaderClasses('loader-container d-none');
      }else{
        alert(responce.data.msg);
      }
    }
  }

  // for captured image upload 
  const uploadCapturedImage = ()=>{
    props.setLoaderClasses('loader-container');
    fetch(`${props.hostName}/redsky_api/upload/upload_captured_image.php?token=${props.token}`,
    {
      method: "POST",
      body: JSON.stringify({img_data: baseImage, stu_id: props.stu_id}),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(resp => resp.json()).then(data => {
      if(data.code === 5){
        setIsImgUploaded(true);
      }
      props.setLoaderClasses('loader-container d-none');
    }).catch(err => console.log(err));
  };

  const uploadBtnHandler = async(e)=>{
    e.preventDefault();
    if(isCapturedImage){
      uploadCapturedImage();
    }else{
      const formData= new FormData();
      formData.append('stu_id', props.stu_id);
      formData.append('profile_image', profileImage);
      await uploadImage(formData);
    }
  }

  const uploadImageFormHandler = () => {
    setIsCapturedImage(false);
    setIsModifyForm(isModifyForm === true ? false : (isModifyForm === false) ? false : undefined);
    fileInput.current.click();
  }
  const captureImageFormHandler = () => {
    setIsModifyForm(isModifyForm === true ? false : (isModifyForm === false) ? false : undefined);
    setIsCameraShow(true);
  }
  const cancleBtnHandler = () =>{
    setBaseImage('');
    setIsModifyForm(isModifyForm === true ? true : (isModifyForm === false ? false : undefined)); 
  }

  return (
    <div className="input-box" style={{position:"relative"}}>
        <label>Upload Image</label>
        <div className='image-upload-container'>                
        {
          baseImage 
          ?
            <div className='d-oflex align-center flex-col'>
              <img src={baseImage} alt='img' height={120} width="auto" />
              <p style={{marginTop:"0.4rem", marginBottom:0}}>{profileImage ? "File: "+profileImage.name : ""}</p>
              {
                isImgUploaded 
                ? 
                  <p style={{color:"#00d26a"}}>Uploaded &#9989;</p> 
                : 
                  <div>
                    <button className='upload-btn bg-danger' style={{marginRight: "0.5rem"}} onClick={cancleBtnHandler} >Cancel</button>

                    {

                      isModifyForm === true ? //for true
                        ''
                      :
                        isModifyForm === false ?
                          <button className='upload-btn bg-success' onClick={uploadBtnHandler} >Update</button> //for false
                        :
                          <button className='upload-btn bg-success' onClick={uploadBtnHandler} >Upload</button> //for undefined
                    }
                  </div>
                }
            </div>
          :
            <div className='d-flex' id='input-upload-container'>
              <div id="image_upload" onClick={uploadImageFormHandler}>
                {/* <input  type="file" name="file"  /> */}
                <input type='file' ref={fileInput} style={{border:'none', width:"auto"}} onChange={(e)=>{chooseImage(e)}} accept=".jpeg, .jpg, .png" hidden />
                <span className="material-icons material-symbols-outlined">cloud_upload</span>
                <p>Browse File</p>
              </div>
              
              <div action="#" id="image_upload" onClick={captureImageFormHandler}>
                {/* <input  type="file" name="file"  /> */}
                {/* <input type='file' ref={fileInput} style={{border:'none', width:"auto"}} onChange={(e)=>{uploadImage(e)}} accept=".jpeg, .jpg, .png" hidden /> */}
                <span className="material-icons material-symbols-outlined">photo_camera</span>
                <p>Capture Image</p>
              </div>
            </div>
        }
      </div>
      <Camera isCamerashow={isCamerashow} setIsCameraShow={setIsCameraShow} setBaseImage={setBaseImage} setIsCapturedImage={setIsCapturedImage} />
    </div>
  )
}

export default UploadStudentImage
