import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCategoryQuery } from "../../api/queries/get-assetstore";
import appSlice from "../../store/app-slice";
import Card from "../../ui-components/stateful/cards/card";
import {Audio,Circles, ThreeDots} from "react-loader-spinner"


function Category() {


  const catResponse = useCategoryQuery();
  const { gender } = useSelector((state: any) => state.appState._appState)
  const navigate = useNavigate();
  



  return (
    <div className="items-center flex flex-col space-y-5 my-10">
          <div className='flex flex-row' onClick={()=>navigate("/gender")}>
          <BsChevronLeft  className='h-7 w-7'/>
          <p className='text-xl font-medium'>Back</p>
          </div>
      <p className="text-3xl">Select Jacket Style</p>
      <div className={`flex desktop:flex-row mobile:flex-col gap-3`}>

        {catResponse.isSuccess &&
          catResponse.data
            ?.filter((bases: any) => bases.bCat === gender)
            .map((bases: any, index: number) => {
              return <Card title={bases.bName} key={index} url={bases.bImg} id={bases.bId} />;
            })}
        {catResponse.isLoading && 
          <ThreeDots width={100} height={100} color="black"/>
        }
      </div>
    </div>
  );
}

export default Category;
