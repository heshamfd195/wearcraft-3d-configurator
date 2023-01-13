import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import appSlice, { appStateActions } from "../../../store/app-slice";
import { useScreenSize } from "../../../hooks/get-screen-size";

const Card: FC<any> = ({ title,url,id }) => {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const {isMobile}=useScreenSize()
  const onCardClick=()=>{
    navigate("/scene")
    dispatch(appStateActions._setBase({id:id,isFetched:true}))
  }

  return (
    <div className=" container flex flex-col space-y-4 items-center rounded-md p-2 border hover:bg-gray-200 desktop:bg-primary-light  "
       onClick={onCardClick}>
      <div className="container mx-auto px-2 border w-[80%]">
        <img src={url} alt={id} height={400} width={400}></img>
      </div>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default Card;
