import React, { useState } from "react";

// let data = ["Sheep Skin", "Cowhide", "Item 3"];

const  DropDownOptions=({data,initial,id})=> {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(initial);

  const onDropDown=(e:any)=>{
    setOpen(!open)

   let btn= document.getElementById(id)
   btn!.onpointerleave=function(){
    setOpen(false)
   } 

  }

  const onSelect=(e:any)=>{
    let val =e.target.value;
    console.log("val ",val)
    setSelect(val)

  }
 
  return (
    <div id={id} className="flex flex-col  ">
      <button
        
        className="text-gray-700 bg-white
         hover:bg-gray-400  
         border
         border-gray-600
         font-medium rounded-lg 
         text-md px-4 py-2.5 text-center 
         inline-flex justify-center
         focus:bg-black focus:text-white
         
         "
         
        onClick={onDropDown}
        

      >
        <p className="text-lg">{select}</p>
        <svg
          className="w-4 h-4 ml-5 "
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
    
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div className="z-10  bg-white  rounded shadow ">
        <div className="text-lg text-gray-700 divide-y divide-gray-200 flex flex-col ">
          {open &&
            data.map((item: any,index:number) => {
              return <button className="py-1 hover:bg-gray-200 " onClick={onSelect} key={index} value={item}>{item}</button>;
            })}
        </div>
      </div>
    </div>
  );
}

export default DropDownOptions;