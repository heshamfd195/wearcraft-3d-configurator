import React, { useEffect, useState } from "react";

/**
 * Add the resolution factor in future
 * @returns 
 */
export const useScreenSize = () => {
  const [screen, setScreen] = useState([window.innerHeight, window.innerWidth]);
  const [device, setDevice] = useState("");
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const resizehandler=()=>{
        setScreen([window.innerHeight,window.innerWidth])
        if(window.innerWidth <window.innerHeight || window.innerWidth <1000){
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
