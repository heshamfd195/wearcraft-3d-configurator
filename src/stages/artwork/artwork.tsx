import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useScreenSize } from "../../hooks/get-screen-size";
import { Button } from "../../ui-components/core/buttons/Button";
import DropDownOptions from "../../ui-components/stateful/dropdown/drop-down-options";
import UploadAndDisplayImage from "./loadArtwork";

const list= [
  { name: "Request",value:"request"},
  { name: "Logo",value:"logo"},



]



let data2 = ["left Chest", "Back"];

const Artwork = () => {

  const dispatch =useDispatch()
  const { isMobile } = useScreenSize();



  return (
    <div>
  {!isMobile && (
        <div>
          {/* Left */}
          <div className="absolute z-10 left-0 ml-8 w-[22%] h-[70%] bg-white top-[10%] rounded-md py-5">
            <p className="text-3xl font-medium">Select Artwork</p>
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
};

export default Artwork;



export const StyleList: React.FC<any> = () => {

  const [isLogo,setLogo]=useState(false)
  const dispatch = useDispatch()
  const onSelected=(val:any)=>{
    console.log("value ",val)

   //  dispatch(customizeActions._updateMatOver(val))
   }

  //   const [l, ls] = useState(list);
  const onClickHandler = (e: any) => {
   
    let value = e.target.value;
    console.log(value)
    if(value==='logo'){
      setLogo(true)
    }

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

{isLogo && < SelectMat label={'Artwork Position'} data={data2} initial={'left Chest'} id="leatherPlaceDropDown" onValue={onSelected}/>}
      
      {/* {dList?.map((button: any, index: number) => {
        return <Select key={index} options={button.options} defaultInputValue={button.name} />
      })} */}
      <UploadAndDisplayImage/>






    </div>
  );
};


const SelectMat = (props:any) => {
  return <div className="flex flex-col space-y-2  my-5">
    <p className="text-xl font-medium">{props.label}</p>
    <DropDownOptions data ={props.data} initial={props.initial} id={props.id} onValue={props.onValue}/>

  </div>;
};