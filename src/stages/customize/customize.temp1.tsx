import React, { FC, useState } from "react";
import { StageButton } from "../../ui-components/core/buttons/StageButton";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import SliderTab from "../../ui-components/core/slider-tab/SliderTab";
import { ModelLoaderStory } from "../../bjs-components/manager/manager";
import { appStateActions } from "../../store/app-slice";
import { AssetSlider } from "../sliders/asset-slider";
import { useScreenSize } from "../../hooks/get-screen-size";
import { BsArrowCounterclockwise, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const stageName = ["style", "material", "color", "artwork"];

const CustomizeTemp: FC<any> = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const { pointer, list, cur } = useSelector(
    (state: any) => state.appState._stages
  );
  const stages = useSelector((state: any) => state.appState._stages);
  const path = useSelector((state: any) => state.appState._path);
  const { screen, device } = useScreenSize();

  const onNext = () => {
    if (pointer < 3) {
      let stagePointer = pointer + 1;
      dispatch(appStateActions._updateStagePointer(stagePointer));
      navigate(stageName[stagePointer]);
    }
    if (pointer === 3) {
      navigate("/preview");
    }
  };

  const onBack = () => {
    if (pointer > 0) {
      let stagePointer = pointer - 1;
      dispatch(appStateActions._updateStagePointer(stagePointer));
      navigate(stageName[stagePointer]);
    } else if (pointer === 0) {
      dispatch(appStateActions._resetStages());
      navigate("/category");
    }
  };

  return (
    <div className=" relative w-screen h-screen">
      {/* Stages*/}
      <div className="absolute h-[10%] flex flex-row   space-x-0 z-10 w-full">
        <div className=" w-1/3 mobile:w-mw1"></div>
        <div className="flex justify-center grow pt-5">
          {/* <SliderTab tabs={list} n={pointer} /> */}
        </div>
        <div className=" w-1/3 mobile:w-mw1 "></div>
      </div>
      <Outlet />

      {device === "desktop" && (
        <div className="absolute h-1/4 flex flex-row space-x-0 z-20 w-full bottom-0">
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
          <div className="w-1/2">
            <AssetSlider />
          </div>
          {/* Next*/}
          <div className=" w-1/4 flex justify-center items-center">
            <StageButton
              name="Next"
              next
              color="contrast"
              size="lg"
              textSize="2xl"
              onClick={onNext}
            />
          </div>
        </div>
      )}

      {device === "mobile" && (
        <div className="absolute  bottom-0 flex flex-col  z-20 space-y-2 w-screen">
          <h1>Selector</h1>
          <h1>Options</h1>
          <div className="px-10">
            <AssetSlider />
          </div>

          <div className="bg-white py-2 flex justify-between space-x-2 w-full px-6 ">
            <div className="order-first">
            <BsChevronLeft className="w-6 h-6 " />
            </div>
            <div className="order-4">
            <BsArrowCounterclockwise className="w-6 h-6 " />
            </div>
            <div className="order-last">
            <BsChevronRight className="w-6 h-6"/>
            </div>
         

          </div>
        </div>
      )}

      <div>{<ModelLoaderStory />}</div>
    </div>
  );
};

export default CustomizeTemp;
