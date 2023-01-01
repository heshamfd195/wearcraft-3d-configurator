import React from "react";
import { useScreenSize } from "../../hooks/get-screen-size";

const Style = () => {
  const { isMobile } = useScreenSize();
  return (
    <div>
      { !isMobile &&
        <div>
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
            Select Part
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
