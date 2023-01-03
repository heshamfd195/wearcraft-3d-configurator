import React from "react";
import { useSelector } from "react-redux";
import { useScreenSize } from "../../hooks/get-screen-size";
import { StyleList } from "./list/StyleList";


const Style = () => {
  const { isMobile } = useScreenSize();
  const {style} =useSelector((state :any)=> state.appState._customize)
  return (
    <div>
      { !isMobile &&
        <div >
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md py-5">
            <p className="text-3xl font-medium">Select Part</p>
            <StyleList />
          </div>

          {/* Right*/}
          <div className="absolute z-10 right-0 mr-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
            Try it
          </div>
        </div>
      }
    </div>
  );
};

export default Style;
