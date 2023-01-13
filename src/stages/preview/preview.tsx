import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useScreenSize } from "../../hooks/get-screen-size";
import { Button } from "../../ui-components/core/buttons/Button";


import { customizeActions } from "../../store/customize-slice";



const Preview = () => {

  const dispatch =useDispatch()
  const { isMobile } = useScreenSize();



  return (
    <div>
  {!isMobile && (
        <div>
      

        </div>
      )}
    </div>

  );
};

export default Preview;


