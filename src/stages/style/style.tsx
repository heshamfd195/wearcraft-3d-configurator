import React from "react";
import { useSelector } from "react-redux";
import { useScreenSize } from "../../hooks/get-screen-size";
import { StyleList } from "./list/StyleList";
import { StyleSwap } from "./recommendation/style-swap";


const data = [
  {
    name: "front",
    id: "crm-fr-L1D4",
    url: "/assets/fronts/crm-fr-L1D4.png",
  },
  {
    name: "front",
    id: "crm-fr-L1D5",
    url: "/assets/fronts/crm-fr-L1D5.png",
  },
  {
    name: "front",
    id: "crm-fr-L1D6",
    url: "/assets/fronts/crm-fr-L1D6.png",
  },
  {
    name: "front",
    id: "crm-fr-L2D1",
    url: "/assets/fronts/crm-fr-L2D1.png",
  },
  {
    name: "front",
    id: "crm-fr-L5D1",
    url: "/assets/fronts/crm-fr-L5D1.png",
  },
  {
    name: "front",
    id: "crm-fr-L4D1",
    url: "/assets/fronts/crm-fr-L4D1.png",
  },
];








const Style = () => {
  const { isMobile } = useScreenSize();
  const { style } = useSelector((state: any) => state.appState._customize)
  return (
    <div>
      {!isMobile &&
        <div >
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md py-5">
            <p className="text-3xl font-medium">Select Part</p>
            <StyleList />
          </div>

          {/* Right*/}
          <div className="absolute z-10 right-0 mr-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
            <p className="text-3xl font-medium">Try it</p>
            {/* <StyleSwap list={data}/> */}
          </div>
        </div>
      }
    </div>
  );
};

export default Style;
