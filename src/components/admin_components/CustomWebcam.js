import { useRef, React, useState, useCallback } from "react";
import Webcam from "react-webcam";
import './CustomWebcam.css';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const videoConstraints = {
  facingMode: FACING_MODE_USER
};

const CustomWebcam  = (props) => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const switchCamera = useCallback(() => {
      setFacingMode(
        prevState =>
          prevState === FACING_MODE_USER
            ? FACING_MODE_ENVIRONMENT
            : FACING_MODE_USER
      );
    }, []);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      }, [webcamRef]);

      const retake = () => {
        setImgSrc(null);
      };

      const saveHandler = ()=>{
        props.setBaseImage(imgSrc);
        props.setIsCapturedImage(true);
        props.setIsCameraShow(false);
      }
    
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <>
        {/*  <Webcam height={600} width={600} ref={webcamRef}  videoConstraints={videoConstraints}  /> */}
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{
          ...videoConstraints,
          facingMode
        }}  id="webcam"  />
        </>
      )}
      <div className="btn-container d-oflex justify-between align-center">
        {imgSrc ? (
          <>
          {/* <input type="file" onChange={(e)=>setPfile(e.target.files[0])} /> */}
            <button className="upload-btn bg-danger" onClick={retake}>Retake</button>
            <button className="upload-btn bg-success" onClick={saveHandler} >Save</button>
            {/* <p onClick={handleSubmit}>Save</p> */}
          </>
        ) : (
          <>
            <span className="material-icons material-symbols-outlined camera-btn prevent-select" onClick={()=>props.setIsCameraShow(false)}>close</span>
            <span className="camera-btn capture-img-btn" onClick={capture}></span>
            <span className="material-icons material-symbols-outlined camera-btn camera-swap-btn prevent-select" onClick={switchCamera}>cameraswitch</span>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomWebcam;