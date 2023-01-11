import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeActions } from "../../store/customize-slice";



const MaterialCard: FC<any> = ({ textData}) => {
  let textureData={...textData}

  const dispatch = useDispatch();
  const {id,img,maps,type}=textureData;

  


  const onMaterialSelect=()=>{
   
  }
  
  return (
    <img
      src={img}
      alt={id}
      className="mobile:w-[90%] w-[50%] bg-white"
      onClick={onMaterialSelect}
    ></img>
  );
};

export default MaterialCard;
