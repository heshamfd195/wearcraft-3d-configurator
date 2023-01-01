import React, { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screen, setScreen] = useState([window.innerHeight, window.innerWidth,"desktop"]);
  const [device, setDevice] = useState("desktop");
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const resizehandler=()=>{
        setScreen([window.innerHeight,window.innerWidth])
        if(window.innerWidth <1000){
            setDevice("mobile")
            setMobile(true)
        }
        else{
            setDevice("desktop")
            setMobile(false)
        }
    }
    window.addEventListener('resize',resizehandler)

 

  }, []);

  return {screen,device,isMobile};
};
