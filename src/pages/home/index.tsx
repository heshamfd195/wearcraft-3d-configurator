import React from "react";
import { Button } from "../../ui-components/core/buttons/Button";
import {useNavigate} from "react-router-dom"
import { persistor } from "../../store";
import { PURGE } from "redux-persist";


function Home() {
  const navigate =useNavigate()
  const onNavigate=()=>{
    persistor.purge()
    navigate("/gender")

  }

  return (
    <div className="items-center flex flex-col space-y-5 my-10">
      <p className="text-2xl ">How to customize</p>
      <Button
        name="Customize"
        className="text-2xl font-semibold bg-primary-main"
        color="contrast"
        onClick={ onNavigate}
      />
      

    </div>
  );
}

export default Home;
