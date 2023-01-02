import React from "react";
import { useScreenSize } from "../../hooks/get-screen-size";
import { ModelLoaderStory } from "../../bjs-components/manager/manager";
import CustomizeDesk from "./customize.desk";
import CustomizeMob from "./customize.mob";

const CustomizeContainer = () => {
  const { device, isMobile } = useScreenSize();
  return (
    <div className=" relative w-screen h-screen">
      
      {isMobile ? <CustomizeMob/> : <CustomizeDesk/>}
      <div>{<ModelLoaderStory />}</div>
    </div>
  );
};

export default CustomizeContainer;
