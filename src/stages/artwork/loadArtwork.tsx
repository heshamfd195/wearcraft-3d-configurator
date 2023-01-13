import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { customizeActions } from "../../store/customize-slice";

const UploadAndDisplayImage = () => {
    const dispatch =useDispatch()
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} id="artlogo"/>
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        accept="image/png"
        onChange={(event) => {
          let img1=event.target.files![0]
          console.log(event.target.files![0]);
          setSelectedImage(event.target.files![0] as any);
          console.log(URL.createObjectURL(img1),".png")
          dispatch(customizeActions._loadArtwork({imgFile:URL.createObjectURL(img1)}))

        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;