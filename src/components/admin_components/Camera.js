import React from 'react';
import './Camera.css';
import CustomWebcam from './CustomWebcam';

const Camera = (props) => {
  
  return (
    <div id="camera-container" className={`${props.isCamerashow ? '' : 'd-none'}`}>
      {
        props.isCamerashow 
        ?
          <CustomWebcam setIsCameraShow={props.setIsCameraShow} setBaseImage={props.setBaseImage} setIsCapturedImage={props.setIsCapturedImage} />
        :
        ''
      }
    </div>
  )
}

export default Camera;
