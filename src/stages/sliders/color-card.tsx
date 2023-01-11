import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeActions } from "../../store/customize-slice";



const ColorCard: FC<any> = ({ textData}) => {

  const matDefualtCurData =useSelector((state: any) => state.customizeState._matDefualtData )
  const matState  =useSelector((state: any) => state.customizeState._matState )
  let textureData={...textData}

  const dispatch = useDispatch();
  const {mId,mImg,mMaps,mType}=textureData;
  // console.log("img",img)

  



  const onMaterialID=()=>{
    console.log("material Id",mId)
    
  // if(currMaterial.matJacket.jtId !== jtId){
  //  dispatch(textureTaskActions._updatetextureMaps(jtMaps))
  // }
   let matData={...matState}
       matData.selectedMat=mId
       matData.state=true
       matData.matType=mType
       matData.matMaps=mMaps
    
   dispatch(customizeActions._updateMatState(matData))


   let loadedMatData={...matDefualtCurData};

    //  console.log(textureData,type)
        loadedMatData[mType]=textureData
      dispatch(customizeActions._updateMatData(loadedMatData))
      console.log("Updated mat :",loadedMatData)
     
    
  
  }
  
  return (
    <img
      src={mImg}
      alt={mId}
      className="mobile:w-[90%] w-[50%] bg-white"
      onClick={onMaterialID}
    ></img>
  );
};

export default ColorCard;
