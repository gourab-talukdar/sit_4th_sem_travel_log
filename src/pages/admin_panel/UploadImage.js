import React, { useState } from 'react';

const UploadImage = (props) => {
   const [myFile, setMyFile] = useState(null);

    const setFile = (e) => {
        setMyFile(e.target.files[0]);
    }

    const uploadImageHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', myFile);

        console.log(formData);
    }
    return (
        <div>
            <form onSubmit={uploadImageHandler}>
                <input type='file' name='file' onChange={setFile} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default UploadImage;
