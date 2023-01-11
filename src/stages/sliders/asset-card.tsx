import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customizeActions } from "../../store/customize-slice";

export enum assetSwitchState{
  DISABLED_MODE_NEW='new',
  DISABLED_MODE_OLD='old'
}

const AssetCard: FC<any> = ({ name, id, url ,partData,partName}) => {
  const dispatch = useDispatch()
  const {curPartsId,disableList} =useSelector((state: any) => state.customizeState._switchMeshStates)
  const prevPartId=curPartsId[partName]?.jpId;
  const secPartId=partData?.jpId
  const pData ={...partData}
  const {jpId,jpName,jpImg,jpMeshTask} =pData;

  

 /**
  * Switch Part Handler
  * Function: 
    * Update => meshtask
    * Update => curr part id
    * Control disable & enable parts
    * Update => appStateSlice
    
  * Conditionl
    * No action on same selection
    * Check => previous and selected part ID
      * Check => selected part not disable List
      * Check => selected part in disable List


  */
  const onSwitchPart=()=>{
    if(prevPartId !== secPartId){


      /** Not in Disable List*/
      if(!disableList.includes(secPartId) ){
         let curPartDisable={name:prevPartId,flag:true,mode:assetSwitchState.DISABLED_MODE_NEW}
         dispatch(customizeActions._updatePartMeshTask({name:partName,meshTask:jpMeshTask}))
         dispatch(customizeActions._updateCurPartId({name:partName,jpId:secPartId}))
         dispatch(customizeActions._addToDisableList(prevPartId))
         dispatch(customizeActions._updatePartDisable(curPartDisable))
      }
       /** In Disable List*/
      if(disableList.includes(secPartId) ){
        let curPartDisable={name:prevPartId,flag:true,mode:assetSwitchState.DISABLED_MODE_OLD}
        dispatch(customizeActions._removeFromDisableList(secPartId))
        dispatch(customizeActions._addToDisableList(prevPartId))
        dispatch(customizeActions._updatePartDisable(curPartDisable))

      }
      dispatch(customizeActions._updateCurPartId({name:partName,jpId:secPartId}))

    
      
    }
  }
  
  return (
    <img
      src={url}
      alt={name}
      className="mobile:w-[90%] w-[50%] bg-white"
      onClick={onSwitchPart}
    ></img>
  );
};

export default AssetCard;
