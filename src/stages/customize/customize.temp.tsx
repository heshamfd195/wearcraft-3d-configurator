import React, { FC, useState } from "react";
import { StageButton } from "../../ui-components/core/buttons/StageButton";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SliderTab from "../../ui-components/core/slider-tab/SliderTab";
import { ModelLoaderStory } from "../../bjs-components/manager/manager";

const CustomizeTemp: FC<any> = ({ device }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [stage, setStage] = useState(0);
  const { pointer, list, cur } = useSelector(
    (state: any) => state.appState._stages
  );
  const stages = useSelector((state: any) => state.appState._stages);
  const path = useSelector((state: any) => state.appState._path);
  return (
    <div>
      
      <div className=" bg-gray-100 w-screen h-screen z-10">
        <div className="relative  z-10 h-screen flex flex-col space-y-2 w-screen ">
          {/* Stage Header*/}
          <div className=" h-[10%] flex flex-row  pt-5 space-x-0">
            <div className=" w-1/3 mobile:w-mw1"></div>
            <div className="flex justify-center grow">
            <SliderTab tabs={list} n={pointer} />
            </div>
            <div className=" w-1/3 mobile:w-mw1 "></div>
          </div>

          {/* Container*/}
          <div className=" grow relative flex justify-between ">
            {/* Left*/}
            <div className="order-first w-1/4">
            <div className="bg-white mx-8 h-full rounded-md">Swap</div>
            </div>
              {/* <div className="grow h-full">{<ModelLoaderStory />}</div> */}
            {/* right*/}
            <div className="order-last  w-1/4">
              <div className="bg-white mx-8 h-full rounded-md">Swap</div>
            </div>
          </div>
          {/* Bottom*/}
          <div className=" h-1/5 flex flex-row space-x-0 ">
            {/* Back*/}
            <div className=" w-1/4 flex justify-center items-center">
             <StageButton name="Back" back size="lg" textSize="2xl"  />
            </div>

            {/* Slider*/}
            <div className="grow">Slider</div>

            {/* Next*/}
            <div className=" w-1/4 flex justify-center items-center">
              <StageButton name="Next"next color="contrast" size="lg" textSize="2xl"  />
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default CustomizeTemp;
