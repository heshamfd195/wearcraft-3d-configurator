import React from "react";
import { useScreenSize } from "../../hooks/get-screen-size";
import DropDownOptions from "../../ui-components/stateful/dropdown/drop-down-options";


let data1 = ["Sheep Skin", "Cowhide"];
let data2 = ["Full", "Torso","Sleeves"];
let data3 = ["Sheep Skin","Shearling"]
// let data3 = ["Full", "Torso","Sleeves"];

const Material = () => {
  const { isMobile } = useScreenSize();
  return (
    <div>
      {!isMobile && (
        <div>
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md py-5">
            <p className="text-3xl font-medium">Select Material</p>
            <SelectMat label={'Leather Type'} data={data1} initial={'Cowhide'} id="leatherDropDown"/>
            <SelectMat label={'Material Over'} data={data2} initial={'Full'} id="leatherPlaceDropDown"/>
            <SelectMat label={'Fur'} data={data3} initial={'Shearling'} id="furDropDown"/>
          </div>

          {/* Right*/}
          <div className="absolute z-10 right-0 mr-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
            <p className="text-3xl font-medium">Try it</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;

const SelectMat = (props:any) => {
  return <div className="flex flex-col space-y-2 mx-6 my-5">
    <p className="text-xl font-medium">{props.label}</p>
    <DropDownOptions data ={props.data} initial={props.initial} id={props.id}/>

  </div>;
};
