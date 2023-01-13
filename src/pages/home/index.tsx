import React, { useEffect, useState } from "react";
import { Button } from "../../ui-components/core/buttons/Button";
import {useNavigate} from "react-router-dom"
import { persistor } from "../../store";
import { PURGE } from "redux-persist";

import { BsTypeH1 } from "react-icons/bs";
import { useScreenSize } from "../../hooks/get-screen-size";
import { Select ,Option} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { customizeActions } from "../../store/customize-slice";


function Home() {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const onNavigate=()=>{
    persistor.purge()
    navigate("/gender")

  }

const {screen,device}=useScreenSize()
const [height,width,]=screen



dispatch(customizeActions.reset())



  return (
    <div className="items-center flex flex-col space-y-5 my-10">
      <p className="text-2xl ">Begin Your Customization</p>
      <Button
        name="Customize"
        className="text-2xl font-semibold bg-primary-main"
        color="contrast"
        onClick={ onNavigate}
        size="lg"
      />
      {/* <h1>{`Device: ${device}`}</h1> */}
 

    </div>
  );
}

export default Home;
