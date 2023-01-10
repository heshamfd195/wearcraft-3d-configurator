import React from "react";
import { useScreenSize } from "../../hooks/get-screen-size";
import { ModelLoaderStory } from "../../bjs-components/manager/manager";
import CustomizeDesk from "./customize.desk";
import CustomizeMob from "./customize.mob";
import SceneAPI from "../../bjs-components/scene/scene-api";
import { ConfiguratorScene } from "../../bjs-components/scene/configurator-scene";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const CustomizeContainer = () => {
  // const { device, isMobile } = useScreenSize();
  return (
    <div className=" relative w-screen h-screen">
      
      {isMobile ? <CustomizeMob/> : <CustomizeDesk/>}
      <div>{<ConfiguratorScene/>}</div>
    </div>
  );
};

export default CustomizeContainer;
