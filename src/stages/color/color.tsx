import React from "react";
import { useDispatch } from "react-redux";
import { useScreenSize } from "../../hooks/get-screen-size";
import DropDownOptions from "../../ui-components/stateful/dropdown/drop-down-options";
import { customizeActions } from "../../store/customize-slice";
import { Button } from "../../ui-components/core/buttons/Button";


let data1 = ["Sheep Skin", "Cowhide"];
let data2 = ["Full Jacket", "Torso","Sleeves"];
let data3 = ["Sheep Skin","Shearling"]


const list= [
  { name: "Metal",value:"metal"},
  { name: "Zipper",value:"zipper"},
  { name: "Button",value:"button"},


]

function Color() {
  const dispatch =useDispatch()
  const { isMobile } = useScreenSize();


  const onSelected=(val:any)=>{
    //  console.log("value ",val)
     dispatch(customizeActions._updateMatOver(val))
    }
  
  return (
    <div>
   {!isMobile && (
        <div>
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md py-5">
            <p className="text-3xl font-medium">Select Color</p>
            <StyleList/>
 
          </div>

          {/* Right*/}
          <div className="absolute z-10 right-0 mr-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md">
            <p className="text-3xl font-medium">Try it</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Color;



export const StyleList: React.FC<any> = () => {

  const dispatch = useDispatch()

  //   const [l, ls] = useState(list);
  const onClickHandler = (e: any) => {
   
    let value = e.target.value;
    console.log(value)
    // dispatch(customizeActions._updateAssetSlider(value))
    // let newlist = [...list];
    // let selectedData = {
    //   prev: selection.curr,
    //   curr: value
    // }
    // dispatch(appStateActions._updateStyleList(selectedData))
  }

  return (
    <div className="flex flex-col space-y-2 px-4 py-10 mx-5">

  
      {list?.map((button: any, index: number) => {
        return (

          <Button
            value={button.value}
            key={index}
            name={button.name}
            size="md"
            variant="outlined"
            // selected={button.selected}
            onClick={onClickHandler}
          />

        );

      })}
      {/* {dList?.map((button: any, index: number) => {
        return <Select key={index} options={button.options} defaultInputValue={button.name} />
      })} */}

      





    </div>
  );
};




