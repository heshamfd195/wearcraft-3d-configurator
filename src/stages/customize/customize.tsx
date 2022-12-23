import React, { useState } from "react";
import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { CustomScene3D } from "../../bjs-components/scene/CustomScene3D";
import { ModelLoaderStory } from "../../bjs-components/manager/manager";
import { Button } from "../../ui-components/core/buttons/Button";
import SliderTab from "../../ui-components/core/slider-tab/SliderTab";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../store/app-slice";

const stageName = ["style", "material", "color", "artwork"];

const Customize = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [stage, setStage] = useState(0);
  const { pointer, list, cur } = useSelector(
    (state: any) => state.appState._stages
  );
  const stages = useSelector((state: any) => state.appState._stages);
  const path = useSelector((state: any) => state.appState._path);

  // if(!path.allowed.includes(cur.toLowerCase())){
  //   console.log("true")
  //   dispatch(appStateActions._updateStagePointer(0))
  // }

  const onNext = () => {
    if (pointer < 3) {
      // setStage(stage + 1);
      let stagePointer = pointer + 1;
      dispatch(appStateActions._updateStagePointer(stagePointer));
      navigate(stageName[stage]);
    }
  };

  const onBack = () => {
    if (pointer > 0) {
      // setStage(stage - 1);
      let stagePointer = pointer - 1;
      dispatch(appStateActions._updateStagePointer(stagePointer));
      navigate(stageName[stage]);
    }
  };

  const navigate = useNavigate();
  
  return (
    <div>
      <div className="absolute  z-20 flex flex-col space-y-5 my-10 ">
        <BsChevronLeft onClick={() => navigate(-1)} />
        <p className="text-2xl mx-auto">Customize</p>
        <SliderTab tabs={list} n={pointer} />
        <p className="text-xl">{stageName[pointer]}</p>
        <Outlet />

        <h1>Asset Slider</h1>
        <div className="flex flex-wrap space-x-2 mobile:bg-primary-main desktop:bg-primary-dark  ">
          <Button name="Back" onClick={onBack} />
          <Button name="Next" color="contrast" onClick={onNext} />
        </div>
      </div>
      <div>{<ModelLoaderStory />}</div>
    </div>
  );
};

export default Customize;
