import React from "react";
import { Button } from "../../ui-components/core/buttons/Button";
import {useNavigate} from "react-router-dom"

function Home() {
  const navigate =useNavigate()
  return (
    <div className="items-center flex flex-col space-y-5 my-10">
      <p className="text-2xl">How to customize</p>
      <Button
        name="Customize"
        className="text-2xl font-semibold bg-primary-main"
        color="contrast"
        onClick={()=>navigate("/gender")}
      />

    </div>
  );
}

export default Home;
