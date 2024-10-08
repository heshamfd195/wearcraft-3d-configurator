import React, { FC, useState } from "react";
import { StageButton } from "../../ui-components/core/buttons/StageButton";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import SliderTab from "../../ui-components/core/slider-tab/SliderTab";
import { appStateActions } from "../../store/app-slice";
import { AssetSlider } from "../sliders/asset-slider";
import { customizeActions } from "../../store/customize-slice";
import SliderHub from "../sliders/slider-hub";

const stageName = ["style", "material", "color", "artwork"];

const CustomizeDesk: FC<any> = () => {
  const [isPreview ,setPreview]=useState(false)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { pointer, list, cur } = useSelector(
    (state: any) => state.appState._stages
  );

  const onNext = () => {
    if (pointer < 3) {
      let stagePointer = pointer + 1;
      dispatch(customizeActions._updateUniMeshTask())
      dispatch(appStateActions._updateStagePointer(stagePointer));
      dispatch(customizeActions._updateStageStates(`is_${stageName[stagePointer]}`))
      dispatch(customizeActions._setCurMeshList())
      dispatch(customizeActions._resetPartSwitch())
      
     
      
      if(stageName[stagePointer]==='material'){
       navigate(0)
      
      }
      navigate(stageName[stagePointer]);
      console.log(stagePointer)
   
   
    }
    if (pointer === 3) {
      setPreview(true)
      navigate("preview");
      

    }

    
  };

  const onBack = () => {
    if (pointer > 0) {
      let stagePointer = pointer - 1;
      dispatch(appStateActions._updateStagePointer(stagePointer));
      dispatch(customizeActions._updateStageStates(`is_${stageName[stagePointer]}`))
      navigate(stageName[stagePointer]);
    } else if (pointer === 0) {
      dispatch(appStateActions._resetStages());
      dispatch(appStateActions._updateStyleList({prev:0,curr:0}))
      dispatch(customizeActions._resetMeshTask())
      dispatch(customizeActions._updadeMeshLoadedState(false))
      
      dispatch(customizeActions.reset())
      setPreview(false)
      navigate("/category");
    }
  };

  return (
    <div >
      {/* Stages*/}
      <div className="absolute h-[10%] flex flex-row   space-x-0 z-10 w-full">
        <div className=" w-1/3 mobile:w-mw1"></div>
        <div className="flex justify-center grow pt-5">
          {!isPreview && <SliderTab tabs={list} n={pointer} />}
        </div>
        <div className=" w-1/3 mobile:w-mw1 "></div>
      </div>
      <Outlet />

      <div className="absolute h-1/5 flex flex-row space-x-0 z-20 w-full bottom-0">
        {/* Back*/}
        <div className=" w-1/4 flex justify-center items-center">
          <StageButton
            name="Back"
            back
            size="lg"
            textSize="2xl"
            onClick={onBack}
          />
        </div>
        {/* Slider*/}
        <div className="w-1/2 my-auto">
        <SliderHub/>
        </div>
        {/* Next*/}
        <div className=" w-1/4 flex justify-center items-center">
     { !isPreview &&    <StageButton
            name={"Next"}
            next
            color="contrast"
            size="lg"
            textSize="2xl"
            onClick={onNext}
          />}
          {isPreview &&
            <StageButton
            name={"Submit"}
            next
            color="contrast"
            size="lg"
            textSize="2xl"
            onClick={()=>{navigate("/submit")}}
          />
          }
        </div>
      </div>
    </div>
  );
};

export default CustomizeDesk
;
