import React from "react";

const Material = () => {
  return (
    <div>
      {/* Left */}
      <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
        Select Material
      </div>

      {/* Right*/}
      <div className="absolute z-10 right-0 mr-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
        Try it
      </div>
    </div>
  );
};

export default Material;
