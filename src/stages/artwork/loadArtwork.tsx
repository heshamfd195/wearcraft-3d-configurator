import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeActions } from "../../store/customize-slice";
import { Button } from "../../ui-components/core/buttons/Button";

const UploadAndDisplayImage = () => {
    const dispatch =useDispatch()
  const [selectedImage, setSelectedImage] = useState(null);
  const artworkState = useSelector(
    (state: any) => state.customizeState._artworklogoState
  );

  return (
    <div>
      {selectedImage && (
        <div className="flex flex-col items-center">
        <img alt="not fount"  src={URL.createObjectURL(selectedImage)} id="artlogo" className="bg-gray-300 w-[50%] "/>
        <br />
        <Button onClick={()=>setSelectedImage(null)} name="Remove" size="sm" variant="outlined" className="text-red-400 border-red-500"/>
        </div>
      )}
      <br />
 
      <input
        className="text-md "
        type="file"
        name="myImage"
        accept="image/png"
        onChange={(event) => {
          setSelectedImage(null)
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