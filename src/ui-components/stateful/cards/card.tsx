import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import appSlice, { appStateActions } from "../../../store/app-slice";

const Card: FC<any> = ({ title,url,id }) => {
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const onCardClick=()=>{
    navigate("/scene")
    dispatch(appStateActions._setBase({id:id,isFetched:true}))
  }

  return (
    <div className=" container flex flex-col space-y-4 items-center rounded-md p-6 border hover:bg-primary-main desktop:bg-primary-light "
       onClick={onCardClick}>
      <div className="container mx-auto px-4 border w-[80%]">
        <img src={url} alt={id} className=""></img>
      </div>
      <p className="text-lg">{title}</p>
    </div>
  );
};

export default Card;
