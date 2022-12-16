import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Card: FC<any> = ({ title }) => {
  const navigate =useNavigate()
  return (
    <div className=" container flex flex-col space-y-4 items-center rounded-md p-6 border hover:bg-primary-main desktop:bg-primary-light "
      onClick={()=>{navigate("/customize/style")}}>
      <div className="container mx-auto px-4 border">Image</div>
      <p className="text-lg">{title}</p>
    </div>
  );
};

export default Card;
