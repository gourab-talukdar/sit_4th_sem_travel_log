import React from 'react';
import './FileUpload.css';

const FileUpload = () => {
    
    const formClicked = () => {
        const form = document.querySelector("form");
        const fileInput = form.querySelector(".file-input");
        
        fileInput.click();
    }
  
// let [fileName, setFileName] = useState('');
let fileName = '';

  const inputChangeHandler = ({ target }) => {
    let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
    fileName =file.name; //getting file name
    let fileSize =file.size; //getting file name
  
    if (fileName.length >= 12) { //if file name length is greater than 12 then split it and add ...
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }

    if(fileSize>0){
      fileSize = Math.floor(fileSize/1024);
      if(fileSize<1024){
        fileSize = fileSize +' KB';
      }else{
        fileSize = parseFloat(fileSize/1024).toFixed(2);
        fileSize = fileSize +' MB';
      }
    }
    console.log(fileSize);
    const selectedFilesArea = document.querySelector(".selected-files-area");
    const selectedFileName = document.querySelector(".selected-files-area .name");
    const selectedFileSize = document.querySelector(".selected-files-area .size");
    selectedFilesArea.classList.remove('d-none');
    selectedFileName.innerHTML = fileName;
    selectedFileSize.innerHTML = fileSize;

  }
// file upload function
function uploadFile(name){
    const selectedFilesArea = document.querySelector(".selected-files-area");
    selectedFilesArea.classList.add('d-none');
    console.log(name);
    const form = document.querySelector("form");
    const progressArea = document.querySelector(".progress-area");
    const uploadedArea = document.querySelector(".uploaded-area");
  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{ //file uploading progress event
    let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;
//     // if file size is less than 1024 then add only KB else convert this KB into MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <span class="material-icons material-symbols-outlined">description</span>
                          <div class="content">
                              <div class="details">
                                  <span class="name">${name} • Uploading</span>
                                  <span class="percent">${fileLoaded}%</span>
                              </div>
                              <div class="progress-bar">
                                  <div class="progress" style="width: ${fileLoaded}%"></div>
                              </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded === total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                                <span class="material-icons material-symbols-outlined">description</span>
                                <div class="details">
                                    <span class="name">${name} • Uploaded</span>
                                    <span class="size">${fileSize}kb</span>
                                </div>
                            </div>
                            <span class="material-icons material-symbols-outlined">done</span>
                        </li>`;
      uploadedArea.classList.remove("onprogress");
      // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
    }
  });
  let data = new FormData(form); //FormData is an object to easily send form data
  xhr.send(data); //sending form data
}

    return (
      
        <div className="wrapper">
            <header>File Uploader JavaScript</header>
            <form action="#" onClick={formClicked}>
                <input className="file-input" type="file" name="file" onChange={inputChangeHandler} hidden/>
                <span className="material-icons material-symbols-outlined">cloud_upload</span>
                    <p>Browse File to Upload</p>
            </form>
            <section className="selected-files-area d-none">
              <li className="row">
                <div className="content">
                  <span className="material-icons material-symbols-outlined">description</span>
                  <div className="details">
                    <span className="name"></span>
                    <span className="size">2.5kb</span>
                  </div>
                </div>
                <button className='upload-btn' onClick={()=>{uploadFile(fileName)}}>
                  Upload
                  <span className="material-icons material-symbols-outlined">cloud_upload</span>
                </button>
              </li>
            </section>

            <section className="progress-area">
                
            </section>
            <section className="uploaded-area">
                
            </section>
        </div>
    )
}

export default FileUpload;
