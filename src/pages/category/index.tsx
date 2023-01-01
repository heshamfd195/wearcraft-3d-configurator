import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCategoryQuery } from "../../api/queries/get-assetstore";
import appSlice from "../../store/app-slice";
import Card from "../../ui-components/stateful/cards/card";


function Category() {
  
  const mobile = "flex-col";
  const desktop = "flex-row ";
  const catResponse = useCategoryQuery();
  const {gender} =useSelector((state :any)=> state.appState._appState)
  const navigate = useNavigate();
 

  return (
    <div className="items-center flex flex-col space-y-5 my-10">
      <BsChevronLeft onClick={() => navigate("/gender")} />
      <p className="text-3xl">Select CategoryTEST</p>
      <div className={`flex desktop:${desktop} mobile:${mobile} gap-2`}>

        {catResponse.isSuccess &&
          catResponse.data
            ?.filter((bases: any) => bases.bCat === gender)
            .map((bases: any,index:number) => {
              return <Card title={bases.bName} key={index} url={bases.bImg} id={bases.bId}/>;
            })}
      </div>
    </div>
  );
}

export default Category;
